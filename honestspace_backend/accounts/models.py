from django.contrib.auth.models import AbstractUser
from django.db import models
from django.core.validators import RegexValidator
from phonenumber_field.modelfields import PhoneNumberField


class UserType(models.Model):
    """User types: tenant, landlord, scout, admin"""
    USER_TYPE_CHOICES = [
        ('tenant', 'Tenant'),
        ('landlord', 'Landlord'),
        ('scout', 'Scout'),
        ('admin', 'Admin'),
    ]
    
    type_name = models.CharField(max_length=20, choices=USER_TYPE_CHOICES, unique=True)
    description = models.TextField(blank=True)
    permissions = models.JSONField(default=dict)
    
    class Meta:
        db_table = 'user_types'
        
    def __str__(self):
        return self.get_type_name_display()


class User(AbstractUser):
    """Extended user model for HonestSpace"""
    
    # Basic Information
    email = models.EmailField(unique=True)
    phone = PhoneNumberField(unique=True, blank=True, null=True)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    
    # User Type and Verification
    user_type = models.ForeignKey(
        UserType, 
        on_delete=models.PROTECT,
        related_name='users'
    )
    is_verified = models.BooleanField(default=False)
    email_verified = models.BooleanField(default=False)
    phone_verified = models.BooleanField(default=False)
    
    # Profile Information
    profile_image = models.ImageField(
        upload_to='profile_images/',
        blank=True,
        null=True
    )
    bio = models.TextField(max_length=500, blank=True)
    date_of_birth = models.DateField(blank=True, null=True)
    
    # Social Authentication
    google_id = models.CharField(max_length=100, blank=True, null=True, unique=True)
    
    # Location Information
    address = models.TextField(blank=True)
    city = models.CharField(max_length=100, blank=True)
    country = models.CharField(max_length=100, default='Kenya')
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    last_login = models.DateTimeField(blank=True, null=True)
    
    # Account Status
    is_active = models.BooleanField(default=True)
    is_suspended = models.BooleanField(default=False)
    suspension_reason = models.TextField(blank=True)
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'first_name', 'last_name', 'user_type_id']
    
    class Meta:
        db_table = 'users'
        indexes = [
            models.Index(fields=['email']),
            models.Index(fields=['phone']),
            models.Index(fields=['user_type']),
            models.Index(fields=['is_verified']),
            models.Index(fields=['created_at']),
        ]
    
    def __str__(self):
        return f"{self.first_name} {self.last_name} ({self.email})"
    
    @property
    def full_name(self):
        return f"{self.first_name} {self.last_name}"
    
    @property
    def is_landlord(self):
        return self.user_type.type_name == 'landlord'
    
    @property
    def is_tenant(self):
        return self.user_type.type_name == 'tenant'
    
    @property
    def is_scout(self):
        return self.user_type.type_name == 'scout'
    
    @property
    def is_admin_user(self):
        return self.user_type.type_name == 'admin'


class UserProfile(models.Model):
    """Extended profile information for users"""
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    
    # Contact Information
    alternate_email = models.EmailField(blank=True)
    alternate_phone = PhoneNumberField(blank=True, null=True)
    emergency_contact_name = models.CharField(max_length=100, blank=True)
    emergency_contact_phone = PhoneNumberField(blank=True, null=True)
    
    # Verification Documents
    id_number = models.CharField(max_length=20, blank=True)
    id_document = models.FileField(upload_to='documents/ids/', blank=True, null=True)
    
    # Preferences
    preferred_language = models.CharField(max_length=10, default='en')
    currency_preference = models.CharField(max_length=3, default='KES')
    timezone = models.CharField(max_length=50, default='Africa/Nairobi')
    
    # Privacy Settings
    profile_visibility = models.CharField(
        max_length=10,
        choices=[
            ('public', 'Public'),
            ('private', 'Private'),
            ('limited', 'Limited'),
        ],
        default='limited'
    )
    show_phone = models.BooleanField(default=False)
    show_email = models.BooleanField(default=True)
    
    # Notifications Settings
    email_notifications = models.BooleanField(default=True)
    sms_notifications = models.BooleanField(default=False)
    push_notifications = models.BooleanField(default=True)
    marketing_emails = models.BooleanField(default=False)
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'user_profiles'
    
    def __str__(self):
        return f"Profile for {self.user.full_name}"


class EmailVerificationToken(models.Model):
    """Email verification tokens"""
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    token = models.CharField(max_length=100, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    expires_at = models.DateTimeField()
    is_used = models.BooleanField(default=False)
    
    class Meta:
        db_table = 'email_verification_tokens'
    
    def __str__(self):
        return f"Email verification for {self.user.email}"


class PasswordResetToken(models.Model):
    """Password reset tokens"""
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    token = models.CharField(max_length=100, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    expires_at = models.DateTimeField()
    is_used = models.BooleanField(default=False)
    
    class Meta:
        db_table = 'password_reset_tokens'
    
    def __str__(self):
        return f"Password reset for {self.user.email}"


class UserActivity(models.Model):
    """Track user activity for analytics"""
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='activities')
    activity_type = models.CharField(max_length=50)
    description = models.TextField()
    ip_address = models.GenericIPAddressField(blank=True, null=True)
    user_agent = models.TextField(blank=True)
    metadata = models.JSONField(default=dict)
    timestamp = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'user_activities'
        indexes = [
            models.Index(fields=['user', 'activity_type']),
            models.Index(fields=['timestamp']),
        ]
    
    def __str__(self):
        return f"{self.user.email} - {self.activity_type} at {self.timestamp}"