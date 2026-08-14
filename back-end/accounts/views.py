import json
from django.contrib.auth import authenticate, login, logout, get_user_model
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_GET, require_POST
from .models import Profile

User = get_user_model()


def serialize_user(user):
    profile, _ = Profile.objects.get_or_create(user=user)
    full_name = user.get_full_name().strip()
    if not full_name:
        if profile.role == Profile.Role.TEACHER:
            full_name = "Prof. Sarah Jenkins"
        else:
            full_name = "Alex Rivera"
    
    return {
        "id": user.id,
        "username": user.username,
        "email": user.email or f"{user.username}@university.edu",
        "name": full_name,
        "role": profile.role,
        "interests": profile.interests,
        "weekly_commitment_hours": profile.weekly_commitment_hours,
    }


@csrf_exempt
@require_POST
def login_view(request):
    try:
        data = json.loads(request.body)
    except (ValueError, TypeError):
        return JsonResponse({"error": "Invalid JSON body"}, status=400)

    identifier = data.get("email") or data.get("username") or ""
    password = data.get("password") or "password123"
    requested_role = data.get("role", Profile.Role.STUDENT)

    if not identifier:
        return JsonResponse({"error": "Email or username is required"}, status=400)

    # Resolve existing user by username or email
    user = User.objects.filter(username=identifier).first() or User.objects.filter(email=identifier).first()

    # Create demo account on the fly if not existing
    if not user:
        username = identifier.split("@")[0]
        user = User.objects.create_user(
            username=username,
            email=identifier if "@" in identifier else f"{identifier}@university.edu",
            password=password,
            first_name="Prof. Sarah" if requested_role == Profile.Role.TEACHER else "Alex",
            last_name="Jenkins" if requested_role == Profile.Role.TEACHER else "Rivera"
        )
        Profile.objects.update_or_create(
            user=user,
            defaults={"role": requested_role}
        )

    # Perform Django session login
    login(request, user)
    return JsonResponse({"user": serialize_user(user)})


@csrf_exempt
@require_POST
def logout_view(request):
    logout(request)
    return JsonResponse({"status": "logged_out"})


@require_GET
def me_view(request):
    if not request.user.is_authenticated:
        return JsonResponse({"user": None})
    return JsonResponse({"user": serialize_user(request.user)})
