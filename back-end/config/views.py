from django.http import JsonResponse


def hello(request):
    return JsonResponse({
        "message": "Hello from Django!"
    })


def health(request):
    """Simple landing/health endpoint for local development and deployment probes."""
    return JsonResponse({
        "status": "ok",
        "service": "AI Career Compass API",
        "api": "/api/hello/",
        "admin": "/admin/",
    })
