from rest_framework import generics, permissions
from .models import Property
from .serializers import PropertyCreateSerializer

class PropertyListCreateView(generics.ListCreateAPIView):
    queryset = Property.objects.all()
    serializer_class = PropertyCreateSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(landlord=self.request.user)
