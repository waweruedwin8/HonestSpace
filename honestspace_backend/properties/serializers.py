# properties/serializers.py
from rest_framework import serializers
from django.db import transaction
from .models import (
    Property, PropertyLocation, PropertyMedia, PropertyAmenity,
    PropertyType, PropertyStatus,
    LovedProperty
)
from core.models import Neighborhood
from core.serializers import NeighborhoodSerializer 
from core.models import (Amenity, AmenityCategory, MediaType,)
from core.models import Neighborhood
from accounts.serializers import UserSerializer
from django.contrib.gis.geos import Point
import re
from rest_framework.exceptions import ValidationError

class PropertyTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = PropertyType
        fields = ['id', 'name', 'description', 'category']

class PropertyStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = PropertyStatus
        fields = ['id', 'name', 'description']

class NeighborhoodSerializer(serializers.ModelSerializer):
    city_name = serializers.CharField(source='city.name', read_only=True)
    county_name = serializers.CharField(source='city.county.name', read_only=True)
    
    class Meta:
        model = Neighborhood
        fields = ['id', 'name', 'city_name', 'county_name', 'average_rent_range', 'safety_rating']

def extract_coordinates(google_maps_url):
    """Extract lat/lng from a Google Maps URL."""
    # Match @lat,lng
    match = re.search(r'@(-?\d+\.\d+),(-?\d+\.\d+)', google_maps_url)
    if match:
        return float(match.group(1)), float(match.group(2))
    
    # Fallback: match plain lat,lng
    match = re.search(r'(-?\d+\.\d+),(-?\d+\.\d+)', google_maps_url)
    if match:
        return float(match.group(1)), float(match.group(2))
    
    return None, None
class PropertyLocationSerializer(serializers.ModelSerializer):
    neighborhood_details = NeighborhoodSerializer(source="neighborhood", read_only=True)
    full_address = serializers.ReadOnlyField()

    google_maps_link = serializers.CharField(write_only=True, required=False)

    # Expose lat/lng as read-only derived fields
    latitude = serializers.SerializerMethodField()
    longitude = serializers.SerializerMethodField()

    class Meta:
        model = PropertyLocation
        fields = [
            "id", "address_line_1", "address_line_2",
            "neighborhood", "neighborhood_details",
            "postal_code", "google_maps_link",
            "latitude", "longitude",
            "address_verified", "coordinates_verified",
            "public_transport_distance_m",
            "main_road_distance_m", "full_address"
        ]
        read_only_fields = ["latitude", "longitude"]

    def get_latitude(self, obj):
        return obj.location.y if obj.location else None

    def get_longitude(self, obj):
        return obj.location.x if obj.location else None

    def validate(self, attrs):
        """Validate and extract coordinates from google_maps_link if provided."""
        google_maps_link = attrs.get("google_maps_link")
        if google_maps_link:
            lat, lng = extract_coordinates(google_maps_link)
            if not (lat and lng):
                raise ValidationError({"google_maps_link": "Invalid Google Maps URL"})
            attrs["location"] = Point(lng, lat)  # x=lng, y=lat
        return attrs

    def create(self, validated_data):
        return super().create(validated_data)

    def update(self, instance, validated_data):
        return super().update(instance, validated_data)

class MediaTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = MediaType
        fields = ['id', 'name', 'max_file_size_mb', 'allowed_formats']

class PropertyMediaSerializer(serializers.ModelSerializer):
    media_type_details = MediaTypeSerializer(source='media_type', read_only=True)
    file_url = serializers.SerializerMethodField()
    thumbnail_url = serializers.SerializerMethodField()
    
    class Meta:
        model = PropertyMedia
        fields = [
            'id', 'media_type', 'media_type_details', 'file_url', 'thumbnail_url',
            'sort_order', 'alt_text', 'file_size_bytes', 'original_filename',
            'uploaded_at'
        ]
        read_only_fields = ['id', 'file_size_bytes', 'original_filename', 'uploaded_at']
    
    def get_file_url(self, obj):
        if file:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(file.url)
            return file.url
        return None
    
    def get_thumbnail_url(self, obj):
        if obj.thumbnail:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.thumbnail.url)
            return obj.thumbnail.url
        return None

class AmenityCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = AmenityCategory
        fields = ['id', 'name', 'description', 'sort_order']

class AmenitySerializer(serializers.ModelSerializer):
    category_details = AmenityCategorySerializer(source='category', read_only=True)
    
    class Meta:
        model = Amenity
        fields = [
            'id', 'name', 'category', 'category_details', 'icon_name',
            'description', 'is_verifiable', 'verification_criteria'
        ]

class PropertyAmenitySerializer(serializers.ModelSerializer):
    amenity_details = AmenitySerializer(source='amenity', read_only=True)
    verified_by_name = serializers.SerializerMethodField()
    
    class Meta:
        model = PropertyAmenity
        fields = [
            'id', 'amenity', 'amenity_details', 'is_verified',
            'verified_by', 'verified_by_name', 'verification_date',
            'verification_notes'
        ]
        read_only_fields = ['is_verified', 'verified_by', 'verification_date']
    
    def get_verified_by_name(self, obj):
        if obj.verified_by:
            return obj.verified_by.get_full_name()
        return None

class PropertyListSerializer(serializers.ModelSerializer):
    """Lightweight serializer for property listings"""
    landlord_name = serializers.SerializerMethodField()
    property_type_display = serializers.CharField(source='property_type.get_name_display', read_only=True)
    status_display = serializers.CharField(source='status.get_name_display', read_only=True)
    location = PropertyLocationSerializer(read_only=True)
    featured_image = serializers.SerializerMethodField()
    is_loved = serializers.SerializerMethodField()
    
    class Meta:
        model = Property
        fields = [
            'id', 'title', 'rent_amount', 'deposit_amount', 'property_type',
            'property_type_display', 'status', 'status_display', 'is_verified',
            'is_furnished', 'is_pet_friendly', 'availability_date',
            'landlord', 'landlord_name', 'location', 'featured_image',
            'views_count', 'created_at', 'is_loved'
        ]
    
    def get_landlord_name(self, obj):
        return obj.landlord.get_full_name()
    
    def get_featured_image(self, obj):
        media = obj.media.filter(media_type__name='image').first()
        if media:
            return PropertyMediaSerializer(media, context=self.context).data
        return None
    
    def get_is_loved(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            return LovedProperty.objects.filter(user=request.user, property=obj).exists()
        return False

class PropertyDetailSerializer(serializers.ModelSerializer):
    """Detailed serializer for single property view"""
    landlord_details = UserSerializer(source='landlord', read_only=True)
    property_type_details = PropertyTypeSerializer(source='property_type', read_only=True)
    status_details = PropertyStatusSerializer(source='status', read_only=True)
    location = PropertyLocationSerializer(read_only=True)
    media = PropertyMediaSerializer(many=True, read_only=True)
    amenities = PropertyAmenitySerializer(source='property_amenities', many=True, read_only=True)
    is_loved = serializers.SerializerMethodField()
    reviews_count = serializers.SerializerMethodField()
    average_rating = serializers.SerializerMethodField()
    
    class Meta:
        model = Property
        fields = [
            'id', 'title', 'description', 'rent_amount', 'deposit_amount',
            'utilities_included', 'is_furnished', 'is_pet_friendly',
            'property_size_sqft', 'availability_date', 'is_verified',
            'verification_date', 'views_count', 'created_at', 'updated_at',
            'landlord', 'landlord_details', 'property_type', 'property_type_details',
            'status', 'status_details', 'location', 'media', 'amenities',
            'is_loved', 'reviews_count', 'average_rating'
        ]
    
    def get_is_loved(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            return LovedProperty.objects.filter(user=request.user, property=obj).exists()
        return False
    
    def get_reviews_count(self, obj):
        # Will implement when reviews model is ready
        return 0
    
    def get_average_rating(self, obj):
        # Will implement when reviews model is ready
        return 0.0

class PropertyCreateSerializer(serializers.ModelSerializer):
    """Serializer for creating new properties"""
    location = PropertyLocationSerializer()
    amenities = serializers.ListField(
        child=serializers.IntegerField(),
        write_only=True,
        required=False
    )
    
    class Meta:
        model = Property
        fields = [
            'title', 'description', 'property_type', 'rent_amount',
            'deposit_amount', 'utilities_included', 'is_furnished',
            'is_pet_friendly', 'property_size_sqft', 'availability_date',
            'location', 'amenities'
        ]
    
    def validate_rent_amount(self, value):
        if value <= 0:
            raise serializers.ValidationError("Rent amount must be greater than 0")
        return value
    
    def validate_deposit_amount(self, value):
        if value is not None and value < 0:
            raise serializers.ValidationError("Deposit amount cannot be negative")
        return value
    
    @transaction.atomic
    def create(self, validated_data):
        location_data = validated_data.pop('location')
        amenities_ids = validated_data.pop('amenities', [])
        
        request = self.context.get('request')
        validated_data['landlord'] = request.user
        
        pending_status, _ = PropertyStatus.objects.get_or_create(
            name='pending',
            defaults={'description': 'Pending verification'}
        )
        validated_data['status'] = pending_status
        
        property_instance = Property.objects.create(**validated_data)
        
        # Use the already validated location serializer data
        PropertyLocation.objects.create(property=property_instance, **location_data)
        
        for amenity_id in amenities_ids:
            try:
                amenity = Amenity.objects.get(id=amenity_id)
                PropertyAmenity.objects.create(
                    property=property_instance,
                    amenity=amenity
                )
            except Amenity.DoesNotExist:
                continue
        
        return property_instance

class LovedPropertySerializer(serializers.ModelSerializer):
    property_details = PropertyListSerializer(source='property', read_only=True)
    
    class Meta:
        model = LovedProperty
        fields = ['id', 'property', 'property_details', 'loved_at', 'notes']
        read_only_fields = ['id', 'loved_at']