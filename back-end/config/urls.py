from django.contrib import admin
from django.urls import include, path

from .views import hello
from chatbot.views import chat

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/hello/", hello, name="hello"),
    path("api/chat/", chat, name="chat"),
    path("api/", include("goals.urls")),
    path("api/", include("opportunities.urls")),
]
