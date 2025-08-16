from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics
from core.models import Neighborhood
from core.serializers import NeighborhoodSerializer

class NeighborhoodListView(generics.ListAPIView):
    queryset = Neighborhood.objects.all()
    serializer_class = NeighborhoodSerializer
class AmenitiesView(APIView):
    def get(self, request):
        return Response({"message": "Amenities endpoint"})

class NeighborhoodListView(generics.ListAPIView):
    queryset = Neighborhood.objects.all()
    serializer_class = NeighborhoodSerializer