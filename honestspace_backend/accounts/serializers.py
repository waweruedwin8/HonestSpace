# accounts/serializers.py

from rest_framework import serializers
from djoser.serializers import UserCreateSerializer as BaseUserCreateSerializer
from djoser.serializers import UserSerializer as BaseUserSerializer
from django.contrib.auth.password_validation import validate_password
from .models import User, UserType


class UserTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserType
        fields = ['id', 'type_name', 'description']  # Adjusted to your model fields


class UserCreateSerializer(BaseUserCreateSerializer):
    user_type_name = serializers.CharField(write_only=True, required=False, default='tenant')
    password = serializers.CharField(write_only=True, validators=[validate_password])
    password_confirm = serializers.CharField(write_only=True)
    phone = serializers.CharField(required=False, allow_blank=True)

    class Meta(BaseUserCreateSerializer.Meta):
        model = User
        fields = [
            'id', 'email', 'username', 'first_name', 'last_name',
            'phone', 'user_type_name', 'password', 'password_confirm'
        ]

    def validate(self, attrs):
        if attrs.get('password') != attrs.get('password_confirm'):
            raise serializers.ValidationError("Passwords don't match")
        attrs.pop('password_confirm')
        return attrs

    def create(self, validated_data):
        user_type_name = validated_data.pop('user_type_name', 'tenant')

        try:
            user_type = UserType.objects.get(type_name=user_type_name)
        except UserType.DoesNotExist:
            raise serializers.ValidationError({"user_type_name": f"User type '{user_type_name}' does not exist."})

        password = validated_data.pop('password')
        user = User.objects.create_user(
            **validated_data,
            password=password,
            user_type=user_type
        )
        return user


class UserSerializer(BaseUserSerializer):
    user_type = UserTypeSerializer(read_only=True)
    full_name = serializers.SerializerMethodField()

    class Meta(BaseUserSerializer.Meta):
        model = User
        fields = [
            'id', 'email', 'username', 'first_name', 'last_name', 'full_name',
            'phone', 'user_type', 'is_verified', 'profile_image',
            'date_joined', 'last_login'
        ]
        read_only_fields = ['id', 'email', 'date_joined', 'last_login', 'is_verified']

    def get_full_name(self, obj):
        return obj.get_full_name()


class UserProfileUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'phone', 'profile_image']

    def validate_phone(self, value):
        user = self.instance
        if value and User.objects.filter(phone=value).exclude(id=user.id).exists():
            raise serializers.ValidationError("Phone number already exists")
        return value


class GoogleAuthSerializer(serializers.Serializer):
    """Serializer for Google OAuth authentication"""
    access_token = serializers.CharField(required=True)
    user_type_name = serializers.ChoiceField(
        choices=[(ut.type_name, ut.type_name) for ut in UserType.objects.all()],
        required=False,
        default='tenant'
    )
