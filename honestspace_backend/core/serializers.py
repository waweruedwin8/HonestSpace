# core/serializers.py
from rest_framework import serializers
from .models import Country, County, City, Neighborhood

class CountrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Country
        fields = ['id', 'name', 'code', 'currency_code', 'phone_prefix']

class CountySerializer(serializers.ModelSerializer):
    country_name = serializers.CharField(source='country.name', read_only=True)
    
    class Meta:
        model = County
        fields = ['id', 'name', 'code', 'country', 'country_name']

class CitySerializer(serializers.ModelSerializer):
    county_name = serializers.CharField(source='county.name', read_only=True)
    country_name = serializers.CharField(source='county.country.name', read_only=True)
    
    class Meta:
        model = City
        fields = ['id', 'name', 'county', 'county_name', 'country_name', 'postal_code_prefix']

class NeighborhoodSerializer(serializers.ModelSerializer):
    city_name = serializers.CharField(source='city.name', read_only=True)
    county_name = serializers.CharField(source='city.county.name', read_only=True)
    country_name = serializers.CharField(source='city.county.country.name', read_only=True)
    
    class Meta:
        model = Neighborhood
        fields = [
            'id', 'name', 'city', 'city_name', 'county_name', 'country_name',
            'average_rent_range', 'safety_rating'
        ]