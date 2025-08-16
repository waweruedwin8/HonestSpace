# properties/filters.py
import django_filters
from django.db import models
from .models import Property, PropertyType, Amenity

class PropertyFilter(django_filters.FilterSet):
    """Advanced filtering for properties"""
    
    # Price range filters
    min_price = django_filters.NumberFilter(field_name="rent_amount", lookup_expr='gte')
    max_price = django_filters.NumberFilter(field_name="rent_amount", lookup_expr='lte')
    
    # Location filters
    neighborhood = django_filters.CharFilter(
        field_name="location__neighborhood__name",
        lookup_expr='icontains'
    )
    city = django_filters.CharFilter(
        field_name="location__neighborhood__city__name",
        lookup_expr='icontains'
    )
    county = django_filters.CharFilter(
        field_name="location__neighborhood__city__county__name",
        lookup_expr='icontains'
    )
    
    # Property type filter
    property_type = django_filters.ModelChoiceFilter(
        queryset=PropertyType.objects.all()
    )
    property_types = django_filters.ModelMultipleChoiceFilter(
        field_name="property_type",
        queryset=PropertyType.objects.all()
    )
    
    # Boolean filters
    is_furnished = django_filters.BooleanFilter()
    is_pet_friendly = django_filters.BooleanFilter()
    utilities_included = django_filters.BooleanFilter()
    is_verified = django_filters.BooleanFilter()
    
    # Size filter
    min_size = django_filters.NumberFilter(field_name="property_size_sqft", lookup_expr='gte')
    max_size = django_filters.NumberFilter(field_name="property_size_sqft", lookup_expr='lte')
    
    # Amenities filter
    amenities = django_filters.ModelMultipleChoiceFilter(
        field_name="propertyamenity__amenity",
        queryset=Amenity.objects.all(),
        method='filter_amenities'
    )
    
    # Date filters
    available_from = django_filters.DateFilter(field_name="availability_date", lookup_expr='gte')
    available_until = django_filters.DateFilter(field_name="availability_date", lookup_expr='lte')
    
    # Ordering
    ordering = django_filters.OrderingFilter(
        fields=(
            ('rent_amount', 'price'),
            ('created_at', 'created'),
            ('views_count', 'popular'),
            ('is_verified', 'verified'),
        ),
        field_labels={
            'price': 'Price',
            'created': 'Date Listed',
            'popular': 'Popularity',
            'verified': 'Verified',
        }
    )
    
    class Meta:
        model = Property
        fields = {
            'landlord': ['exact'],
            'status__name': ['exact', 'in'],
        }
    
    def filter_amenities(self, queryset, name, value):
        """Custom filter for amenities - properties must have ALL selected amenities"""
        if value:
            for amenity in value:
                queryset = queryset.filter(propertyamenity__amenity=amenity)
            queryset = queryset.distinct()
        return queryset