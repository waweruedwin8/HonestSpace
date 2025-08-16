from django.contrib import admin
from .models import Property

@admin.register(Property)
class PropertyAdmin(admin.ModelAdmin):
    list_display = ('title', 'landlord', 'rent_amount', 'is_verified', 'created_at')
    list_filter = ('is_verified', 'created_at')
    search_fields = ('title', 'description')
