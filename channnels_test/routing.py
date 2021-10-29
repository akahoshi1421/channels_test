from django.urls import path
from . import consumers

websocket_urlpatterns = [
    path("ws/chat/<slug:room_name>/", consumers.ChatConsumer.as_asgi()),
    path("ws/clear/<slug:clear_number>/", consumers.ClearConsumer.as_asgi()),
]