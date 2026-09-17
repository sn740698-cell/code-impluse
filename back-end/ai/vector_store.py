"""Vector Database module for persistent document indexing and top-K cosine similarity retrieval."""
import math
import os
import json
import re
from pathlib import Path
from django.conf import settings

VECTOR_STORE_FILE = getattr(settings, "BASE_DIR", Path(__file__).resolve().parent.parent) / "vector_store.json"
EMBEDDING_DIM = 256


def _clean_tokens(text):
    """Extract normalized word and n-gram tokens from text."""
    text = text.lower()
    words = re.findall(r"\w+", text)
    tokens = list(words)
    # Add character n-grams for short/technical terms (e.g. gpa, dbms, cxx)
    for word in words:
        if len(word) >= 3:
            for i in range(len(word) - 2):
                tokens.append(word[i:i + 3])
    return tokens


def generate_dense_embedding(text, dim=EMBEDDING_DIM):
    """Generate a unit-normalized dense float embedding vector using feature hashing."""
    tokens = _clean_tokens(text)
    if not tokens:
        return [0.0] * dim

    vector = [0.0] * dim
    for token in tokens:
        # Hash token into dimension index
        h = 0
        for char in token:
            h = (h * 31 + ord(char)) & 0xFFFFFFFF
        idx = h % dim
        sign = 1.0 if ((h >> 8) & 1) == 0 else -1.0
        vector[idx] += sign

    # Calculate L2 norm
    sq_sum = sum(val * val for val in vector)
    norm = math.sqrt(sq_sum)
    if norm > 1e-9:
        vector = [round(val / norm, 6) for val in vector]
    else:
        vector = [0.0] * dim

    return vector


def cosine_similarity(v1, v2):
    """Compute cosine similarity between two unit vectors (dot product)."""
    if len(v1) != len(v2):
        return 0.0
    dot = sum(a * b for a, b in zip(v1, v2))
    return float(dot)


class VectorDatabase:
    """Persistent in-memory & file-backed Vector Database."""

    def __init__(self, storage_filepath=VECTOR_STORE_FILE):
        self.storage_filepath = Path(storage_filepath)
        self.documents = {}
        self.load()

    def load(self):
        """Load stored documents and embeddings from disk if file exists."""
        if self.storage_filepath.exists():
            try:
                with open(self.storage_filepath, "r", encoding="utf-8") as f:
                    self.documents = json.load(f)
            except Exception:
                self.documents = {}

    def save(self):
        """Persist documents and embeddings to disk."""
        try:
            with open(self.storage_filepath, "w", encoding="utf-8") as f:
                json.dump(self.documents, f, indent=2)
        except Exception:
            pass

    def add_document(self, doc_id, student_id, category, content, metadata=None):
        """Add or update a document in the vector database."""
        embedding = generate_dense_embedding(content)
        self.documents[doc_id] = {
            "doc_id": doc_id,
            "student_id": str(student_id),
            "category": category,
            "content": content,
            "metadata": metadata or {},
            "embedding": embedding
        }
        self.save()
        return doc_id

    def clear_student_documents(self, student_id):
        """Remove all indexed documents for a given student_id."""
        sid = str(student_id)
        to_delete = [k for k, v in self.documents.items() if v.get("student_id") == sid]
        for k in to_delete:
            del self.documents[k]
        if to_delete:
            self.save()

    def search_similar(self, query_text, student_id=None, category=None, top_k=5):
        """Retrieve top-K most relevant documents matching query using cosine similarity."""
        query_vec = generate_dense_embedding(query_text)
        results = []

        target_sid = str(student_id) if student_id is not None else None

        for doc_id, doc in self.documents.items():
            if target_sid and doc.get("student_id") != target_sid:
                continue
            if category and doc.get("category") != category:
                continue

            doc_vec = doc.get("embedding", [])
            sim = cosine_similarity(query_vec, doc_vec)
            results.append({
                "doc_id": doc.get("doc_id"),
                "category": doc.get("category"),
                "content": doc.get("content"),
                "metadata": doc.get("metadata"),
                "similarity": round(sim, 4)
            })

        # Sort descending by similarity score
        results.sort(key=lambda x: x["similarity"], reverse=True)
        return results[:top_k]


# Global Vector DB instance
db = VectorDatabase()
