"""Safe AI boundary with Ollama-first and OpenRouter fallback generation."""
import json
import requests
from django.conf import settings


class AIUnavailable(Exception):
    """Neither configured AI provider returned a valid response."""


def _openrouter_configs():
    return (
        (settings.OPENROUTER_NVIDIA_API_KEY, settings.OPENROUTER_NVIDIA_MODEL),
        (settings.OPENROUTER_GEMMA_API_KEY, settings.OPENROUTER_GEMMA_MODEL),
        (settings.OPENROUTER_CHATGPT_API_KEY, settings.OPENROUTER_CHATGPT_MODEL),
    )


def generate(messages, *, json_mode=False):
    """Return ``(content, provider)``. Provider failures never expose secrets."""
    try:
        payload = {"model": settings.OLLAMA_MODEL, "messages": messages, "stream": False}
        if json_mode:
            payload["format"] = "json"
        response = requests.post(settings.OLLAMA_URL, json=payload, timeout=settings.OLLAMA_TIMEOUT)
        response.raise_for_status()
        content = response.json()["message"]["content"].strip()
        if content:
            return content, "ollama"
    except (requests.RequestException, KeyError, TypeError, ValueError):
        pass

    for api_key, model in _openrouter_configs():
        if not api_key:
            continue
        try:
            payload = {"model": model, "messages": messages}
            if json_mode:
                payload["response_format"] = {"type": "json_object"}
            response = requests.post(
                settings.OPENROUTER_URL,
                json=payload,
                headers={"Authorization": f"Bearer {api_key}", "HTTP-Referer": "http://localhost:8000", "X-Title": "AI Career Compass"},
                timeout=settings.OPENROUTER_TIMEOUT,
            )
            response.raise_for_status()
            content = response.json()["choices"][0]["message"]["content"].strip()
            if content:
                return content, "openrouter"
        except (requests.RequestException, KeyError, TypeError, ValueError):
            continue
    raise AIUnavailable("No configured AI provider is available.")


def ollama_explanation(context):
    prompt = ("Return JSON only with recommendation_reason, career_relevance, schedule_warning, "
              "recommended_action. Use only this context; do not invent facts: " + json.dumps(context))
    try:
        content, _ = generate([{"role": "system", "content": "You are a careful academic career advisor."},
                               {"role": "user", "content": prompt}], json_mode=True)
        result = json.loads(content)
        allowed = {key: str(result.get(key, ""))[:1000] for key in
                   ("recommendation_reason", "career_relevance", "schedule_warning", "recommended_action")}
        return allowed
    except (AIUnavailable, ValueError, KeyError, TypeError):
        return {"recommendation_reason": "This opportunity addresses your current learning priorities.",
                "career_relevance": "Calculated from your career goal and skill gaps.",
                "schedule_warning": "", "recommended_action": "Review details and register if it fits your schedule."}
