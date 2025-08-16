from django.urls import path
from . import views
from .views import NeighborhoodListView
urlpatterns = [
    path('amenities/', views.AmenitiesView.as_view(), name='amenities'),
    path('neighborhoods/', NeighborhoodListView.as_view(), name='neighborhood-list'),
]
