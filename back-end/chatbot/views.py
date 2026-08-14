import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from ai.services import AIUnavailable, generate


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

        result, provider = generate([{"role": "user", "content": user_message}])

        return JsonResponse({
            "response": result,
            "provider": provider,
        })

    except AIUnavailable:
        return JsonResponse(
            {"error": "Neither Ollama nor the configured fallback AI provider is available."},
            status=503
        )

    except Exception as e:
        return JsonResponse(
            {"error": str(e)},
            status=500
        )
