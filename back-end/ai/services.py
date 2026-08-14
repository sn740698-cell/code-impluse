"""Safe AI boundary: deterministic scores are calculated locally; Ollama only explains them."""
import json
import requests
from django.conf import settings


def ollama_explanation(context):
    prompt = ("Return JSON only with recommendation_reason, career_relevance, schedule_warning, "
              "recommended_action. Use only this context; do not invent facts: " + json.dumps(context))
    try:
        response = requests.post(settings.OLLAMA_URL, json={"model": settings.OLLAMA_MODEL,
            "messages": [{"role": "system", "content": "You are a careful academic career advisor."},
                         {"role": "user", "content": prompt}], "stream": False, "format": "json"}, timeout=30)
        response.raise_for_status()
        result = json.loads(response.json()["message"]["content"])
        allowed = {key: str(result.get(key, ""))[:1000] for key in
                   ("recommendation_reason", "career_relevance", "schedule_warning", "recommended_action")}
        return allowed
    except (requests.RequestException, ValueError, KeyError, TypeError):
        return {"recommendation_reason": "This opportunity addresses your current learning priorities.",
                "career_relevance": "Calculated from your career goal and skill gaps.",
                "schedule_warning": "", "recommended_action": "Review details and register if it fits your schedule."}
