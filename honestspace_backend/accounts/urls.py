from django.urls import path
from . import views

urlpatterns = [
    path('profile/', views.UserProfileView.as_view(), name='user-profile'),
    path('register/', views.UserRegistrationView.as_view(), name='user-register'),
    # Remove or comment out the login line below because djoser handles login
    # path('login/', views.UserLoginView.as_view(), name='user-login'),
]
