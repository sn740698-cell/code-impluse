import json
import requests

from django.conf import settings
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt


@csrf_exempt
def chat(request):

    if request.method != "POST":
        return JsonResponse(
            {"error": "Only POST requests are allowed"},
            status=405
        )

    try:
        data = json.loads(request.body)

        user_message = data.get("message", "").strip()

        if not user_message:
            return JsonResponse(
                {"error": "Message is required"},
                status=400
            )

        ollama_response = requests.post(
            settings.OLLAMA_URL,
            json={
                "model": settings.OLLAMA_MODEL,
                "messages": [
                    {
                        "role": "user",
                        "content": user_message
                    }
                ],
                "stream": False
            },
            timeout=120
        )

        ollama_response.raise_for_status()

        result = ollama_response.json()

        return JsonResponse({
            "response": result["message"]["content"]
        })

    except requests.exceptions.ConnectionError:
        return JsonResponse(
            {"error": "Could not connect to Ollama"},
            status=503
        )

    except requests.exceptions.Timeout:
        return JsonResponse(
            {"error": "Ollama took too long to respond"},
            status=504
        )

    except Exception as e:
        return JsonResponse(
            {"error": str(e)},
            status=500
        )
