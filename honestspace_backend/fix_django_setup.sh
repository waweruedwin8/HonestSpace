#!/bin/bash

echo "🔧 Fixing Django setup issues..."

# Fix the immediate Path import error
echo "📝 Fixing settings.py Path import..."
cat > honestspace/settings.py << 'EOF'
"""
Django settings for honestspace project.
"""
from pathlib import Path
import os
from datetime import timedelta

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-temp-key-change-in-production-12345'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ['localhost', '127.0.0.1', '0.0.0.0', '*']

# Application definition
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    
    # Third party apps
    'rest_framework',
    'corsheaders',
    
    # Local apps
    'accounts',
    'core',
    'properties',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'honestspace.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'honestspace.wsgi.application'

# Database - Using SQLite for now
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

# Custom user model
AUTH_USER_MODEL = 'accounts.User'

# Password validation
AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# Internationalization
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'Africa/Nairobi'
USE_I18N = True
USE_TZ = True

# Static files (CSS, JavaScript, Images)
STATIC_URL = '/static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'

# Media files
MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'

# Default primary key field type
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# REST Framework
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework.authentication.SessionAuthentication',
    ),
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticated',
    ],
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 20,
}

# CORS settings
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

CORS_ALLOW_CREDENTIALS = True
EOF

# Create basic app structure
echo "📁 Creating app directories and files..."

# Create app __init__.py files if missing
touch accounts/__init__.py
touch core/__init__.py
touch properties/__init__.py

# Create basic models for accounts app if it doesn't exist
if [ ! -f "accounts/models.py" ]; then
    cat > accounts/models.py << 'EOF'
from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=20, blank=True)
    user_type = models.CharField(
        max_length=20,
        choices=[
            ('tenant', 'Tenant'),
            ('landlord', 'Landlord'),
            ('scout', 'Scout'),
            ('admin', 'Admin'),
        ],
        default='tenant'
    )
    is_verified = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']
    
    def __str__(self):
        return self.email
EOF
fi

# Create basic models for core app
if [ ! -f "core/models.py" ]; then
    cat > core/models.py << 'EOF'
from django.db import models

class Country(models.Model):
    name = models.CharField(max_length=100)
    code = models.CharField(max_length=3)
    
    def __str__(self):
        return self.name

class Amenity(models.Model):
    name = models.CharField(max_length=100)
    category = models.CharField(max_length=50)
    
    def __str__(self):
        return self.name
EOF
fi

# Create basic models for properties app
if [ ! -f "properties/models.py" ]; then
    cat > properties/models.py << 'EOF'
from django.db import models
from django.conf import settings

class Property(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    landlord = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    rent_amount = models.DecimalField(max_digits=10, decimal_places=2)
    is_verified = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.title
EOF
fi

# Create admin.py files
cat > accounts/admin.py << 'EOF'
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User

@admin.register(User)
class CustomUserAdmin(UserAdmin):
    list_display = ('email', 'first_name', 'last_name', 'user_type', 'is_verified', 'created_at')
    list_filter = ('user_type', 'is_verified', 'is_active')
    search_fields = ('email', 'first_name', 'last_name')
    ordering = ('-created_at',)
    
    fieldsets = UserAdmin.fieldsets + (
        ('Custom Fields', {
            'fields': ('phone', 'user_type', 'is_verified')
        }),
    )
EOF

cat > core/admin.py << 'EOF'
from django.contrib import admin
from .models import *

@admin.register(Country)
class CountryAdmin(admin.ModelAdmin):
    list_display = ('name', 'code')

@admin.register(Amenity)
class AmenityAdmin(admin.ModelAdmin):
    list_display = ('name', 'category')
    list_filter = ('category',)
EOF

cat > properties/admin.py << 'EOF'
from django.contrib import admin
from .models import Property

@admin.register(Property)
class PropertyAdmin(admin.ModelAdmin):
    list_display = ('title', 'landlord', 'rent_amount', 'is_verified', 'created_at')
    list_filter = ('is_verified', 'created_at')
    search_fields = ('title', 'description')
EOF

# Create apps.py files
cat > accounts/apps.py << 'EOF'
from django.apps import AppConfig

class AccountsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'accounts'
EOF

cat > core/apps.py << 'EOF'
from django.apps import AppConfig

class CoreConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'core'
EOF

cat > properties/apps.py << 'EOF'
from django.apps import AppConfig

class PropertiesConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'properties'
EOF

# Create simple views.py files
cat > accounts/views.py << 'EOF'
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response

class UserProfileView(APIView):
    def get(self, request):
        return Response({"message": "User profile endpoint"})
EOF

cat > core/views.py << 'EOF'
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response

class AmenitiesView(APIView):
    def get(self, request):
        return Response({"message": "Amenities endpoint"})
EOF

cat > properties/views.py << 'EOF'
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response

class PropertyListView(APIView):
    def get(self, request):
        return Response({"message": "Properties list endpoint"})
EOF

# Create basic URL files
cat > accounts/urls.py << 'EOF'
from django.urls import path
from . import views

urlpatterns = [
    path('profile/', views.UserProfileView.as_view(), name='user-profile'),
]
EOF

cat > core/urls.py << 'EOF'
from django.urls import path
from . import views

urlpatterns = [
    path('amenities/', views.AmenitiesView.as_view(), name='amenities'),
]
EOF

cat > properties/urls.py << 'EOF'
from django.urls import path
from . import views

urlpatterns = [
    path('', views.PropertyListView.as_view(), name='property-list'),
]
EOF

# Create simple main URLs file
cat > honestspace/urls.py << 'EOF'
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/accounts/', include('accounts.urls')),
    path('api/core/', include('core.urls')),
    path('api/properties/', include('properties.urls')),
]
EOF

echo "✅ Django setup fixed!"
echo ""
echo "🚀 Now run these commands:"
echo "1. python manage.py makemigrations"
echo "2. python manage.py migrate"
echo "3. python manage.py createsuperuser"
echo "4. python manage.py runserver"
echo ""
echo "📖 Your Django project is now ready for development!"