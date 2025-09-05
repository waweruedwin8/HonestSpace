# honestspace/urls.py
from django.contrib import admin
from django.urls import path, include
from accounts.views import UserRegistrationView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenBlacklistView
)
#from accounts.views import LogoutView

urlpatterns = [
    path('admin/', admin.site.urls),

    # Custom registration endpoint
    path('api/accounts/register/', UserRegistrationView.as_view(), name='user-register'),

    # Accounts app URLs (profile, update, etc.)
    path('api/accounts/', include('accounts.urls')),

    # Djoser core user endpoints (me, set_password, etc.)
    path('api/auth/', include('djoser.urls')),

    # Token-based auth (old) - kept temporarily
    #path('api/auth/', include('djoser.urls.authtoken')),

    # JWT-based auth (new) - added for JWT support
    path('api/auth/', include('djoser.urls.jwt')),
    path('api/auth/jwt/create/', TokenObtainPairView.as_view(), name='jwt-create'),
    path('api/auth/jwt/refresh/', TokenRefreshView.as_view(), name='jwt-refresh'),
    path('api/auth/jwt/blacklist/', TokenBlacklistView.as_view(), name='jwt-blacklist'),
    #path('auth/logout/', LogoutView.as_view(), name='logout'), #served by blacklist endpoint
    # Other apps
    path('api/core/', include('core.urls')),
    path('api/properties/', include('properties.urls')),
]
