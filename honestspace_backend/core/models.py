from django.db import models
from django.contrib.gis.db import models as gis_models
from django.core.validators import MinValueValidator, MaxValueValidator
import uuid


class Country(models.Model):
    """Countries lookup table"""
    name = models.CharField(max_length=100, unique=True)
    code = models.CharField(max_length=3, unique=True)  # ISO 3166-1 alpha-3
    currency_code = models.CharField(max_length=3)
    phone_prefix = models.CharField(max_length=10)
    is_active = models.BooleanField(default=True)
    
    class Meta:
        db_table = 'countries'
        verbose_name_plural = 'Countries'
    
    def __str__(self):
        return self.name


class County(models.Model):
    """Counties/States lookup table"""
    name = models.CharField(max_length=100)
    code = models.CharField(max_length=10)
    country = models.ForeignKey(Country, on_delete=models.CASCADE, related_name='counties')
    
    class Meta:
        db_table = 'counties'
        unique_together = ['name', 'country']
        verbose_name_plural = 'Counties'
    
    def __str__(self):
        return f"{self.name}, {self.country.name}"


class City(models.Model):
    """Cities lookup table"""
    name = models.CharField(max_length=100)
    county = models.ForeignKey(County, on_delete=models.CASCADE, related_name='cities')
    postal_code_prefix = models.CharField(max_length=10, blank=True)
    latitude = models.DecimalField(max_digits=9, decimal_places=6, blank=True, null=True)
    longitude = models.DecimalField(max_digits=9, decimal_places=6, blank=True, null=True)
    
    class Meta:
        db_table = 'cities'
        unique_together = ['name', 'county']
        verbose_name_plural = 'Cities'
    
    def __str__(self):
        return f"{self.name}, {self.county.name}"


class Neighborhood(models.Model):
    """Neighborhoods within cities"""
    name = models.CharField(max_length=100)
    city = models.ForeignKey(City, on_delete=models.CASCADE, related_name='neighborhoods')
    average_rent_range = models.CharField(
        max_length=50,
        choices=[
            ('low', 'Low (< 20K)'),
            ('medium', 'Medium (20K - 50K)'),
            ('high', 'High (50K - 100K)'),
            ('premium', 'Premium (> 100K)'),
        ],
        blank=True
    )
    safety_rating = models.DecimalField(
        max_digits=3,
        decimal_places=2,
        validators=[MinValueValidator(0), MaxValueValidator(10)],
        blank=True,
        null=True
    )
    description = models.TextField(blank=True)
    
    class Meta:
        db_table = 'neighborhoods'
        unique_together = ['name', 'city']
    
    def __str__(self):
        return f"{self.name}, {self.city.name}"


class LandmarkType(models.Model):
    """Types of landmarks"""
    name = models.CharField(max_length=50, unique=True)
    icon = models.CharField(max_length=50)
    color = models.CharField(max_length=7, default='#000000')  # Hex color
    description = models.TextField(blank=True)
    
    class Meta:
        db_table = 'landmark_types'
    
    def __str__(self):
        return self.name


class Landmark(models.Model):
    """Important landmarks like hospitals, schools, malls"""
    name = models.CharField(max_length=200)
    landmark_type = models.ForeignKey(LandmarkType, on_delete=models.CASCADE, related_name='landmarks')
    neighborhood = models.ForeignKey(Neighborhood, on_delete=models.CASCADE, related_name='landmarks')
    
    # Geographic location
    location = gis_models.PointField()
    address = models.TextField(blank=True)
    
    # Additional info
    description = models.TextField(blank=True)
    phone = models.CharField(max_length=20, blank=True)
    website = models.URLField(blank=True)
    rating = models.DecimalField(
        max_digits=3,
        decimal_places=2,
        validators=[MinValueValidator(0), MaxValueValidator(5)],
        blank=True,
        null=True
    )
    
    # Status
    is_active = models.BooleanField(default=True)
    is_verified = models.BooleanField(default=False)
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'landmarks'
        indexes = [
            models.Index(fields=['landmark_type']),
            models.Index(fields=['neighborhood']),
            models.Index(fields=['is_active']),
        ]
    
    def __str__(self):
        return f"{self.name} ({self.landmark_type.name})"


class AmenityCategory(models.Model):
    """Categories for property amenities"""
    CATEGORY_CHOICES = [
        ('on_premise', 'On-Premise'),
        ('area_amenity', 'Area Amenity'),
        ('infrastructure', 'Infrastructure'),
        ('safety', 'Safety & Security'),
    ]
    
    name = models.CharField(max_length=50, choices=CATEGORY_CHOICES, unique=True)
    display_name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    icon = models.CharField(max_length=50, blank=True)
    sort_order = models.PositiveIntegerField(default=0)
    
    class Meta:
        db_table = 'amenity_categories'
        ordering = ['sort_order', 'display_name']
        verbose_name_plural = 'Amenity Categories'
    
    def __str__(self):
        return self.display_name


class Amenity(models.Model):
    """Property amenities"""
    name = models.CharField(max_length=100)
    category = models.ForeignKey(AmenityCategory, on_delete=models.CASCADE, related_name='amenities')
    icon = models.CharField(max_length=50)
    description = models.TextField(blank=True)
    
    # Verification settings
    is_verifiable = models.BooleanField(default=True)
    verification_criteria = models.TextField(blank=True)
    
    # Display settings
    is_active = models.BooleanField(default=True)
    sort_order = models.PositiveIntegerField(default=0)
    
    class Meta:
        db_table = 'amenities'
        unique_together = ['name', 'category']
        ordering = ['category', 'sort_order', 'name']
        verbose_name_plural = 'Amenities'
    
    def __str__(self):
        return f"{self.name} ({self.category.display_name})"


class BadgeCategory(models.Model):
    """Categories for trust badges"""
    CATEGORY_CHOICES = [
        ('infrastructure', 'Infrastructure'),
        ('safety', 'Safety & Security'),
        ('lifestyle', 'Lifestyle'),
        ('verified', 'Verified'),
    ]
    
    name = models.CharField(max_length=50, choices=CATEGORY_CHOICES, unique=True)
    display_name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    color_scheme = models.CharField(max_length=20, default='blue')
    sort_order = models.PositiveIntegerField(default=0)
    
    class Meta:
        db_table = 'badge_categories'
        ordering = ['sort_order', 'display_name']
        verbose_name_plural = 'Badge Categories'
    
    def __str__(self):
        return self.display_name


class TrustBadge(models.Model):
    """Trust badges for properties"""
    name = models.CharField(max_length=100)
    category = models.ForeignKey(BadgeCategory, on_delete=models.CASCADE, related_name='badges')
    criteria_description = models.TextField()
    icon = models.CharField(max_length=50)
    
    # Badge requirements
    verification_required = models.BooleanField(default=True)
    auto_assignable = models.BooleanField(default=False)
    point_threshold = models.PositiveIntegerField(default=0)
    
    # Display settings
    is_active = models.BooleanField(default=True)
    sort_order = models.PositiveIntegerField(default=0)
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'trust_badges'
        ordering = ['category', 'sort_order', 'name']
    
    def __str__(self):
        return f"{self.name} ({self.category.display_name})"


class MediaType(models.Model):
    """Types of media files"""
    TYPE_CHOICES = [
        ('image', 'Image'),
        ('video', 'Video'),
        ('document', 'Document'),
    ]
    
    name = models.CharField(max_length=20, choices=TYPE_CHOICES, unique=True)
    max_file_size_mb = models.PositiveIntegerField()
    allowed_formats = models.JSONField(default=list)  # ['jpg', 'png', 'mp4', etc.]
    processing_required = models.BooleanField(default=False)
    
    class Meta:
        db_table = 'media_types'
    
    def __str__(self):
        return self.get_name_display()


class RatingCategory(models.Model):
    """Categories for property ratings"""
    name = models.CharField(max_length=100, unique=True)
    display_name = models.CharField(max_length=100)
    description = models.TextField()
    weight_factor = models.DecimalField(
        max_digits=3,
        decimal_places=2,
        default=1.0,
        validators=[MinValueValidator(0.1), MaxValueValidator(5.0)]
    )
    is_active = models.BooleanField(default=True)
    sort_order = models.PositiveIntegerField(default=0)
    
    class Meta:
        db_table = 'rating_categories'
        ordering = ['sort_order', 'display_name']
        verbose_name_plural = 'Rating Categories'
    
    def __str__(self):
        return self.display_name


class SystemSetting(models.Model):
    """System-wide settings"""
    key = models.CharField(max_length=100, unique=True)
    value = models.TextField()
    data_type = models.CharField(
        max_length=20,
        choices=[
            ('string', 'String'),
            ('integer', 'Integer'),
            ('float', 'Float'),
            ('boolean', 'Boolean'),
            ('json', 'JSON'),
        ],
        default='string'
    )
    description = models.TextField(blank=True)
    is_active = models.BooleanField(default=True)
    updated_at = models.DateTimeField(auto_now=True)
    updated_by = models.ForeignKey(
        'accounts.User',
        on_delete=models.SET_NULL,
        null=True,
        blank=True
    )
    
    class Meta:
        db_table = 'system_settings'
    
    def __str__(self):
        return f"{self.key}: {self.value}"
    
    def get_typed_value(self):
        """Return the value converted to its proper type"""
        if self.data_type == 'integer':
            return int(self.value)
        elif self.data_type == 'float':
            return float(self.value)
        elif self.data_type == 'boolean':
            return self.value.lower() in ['true', '1', 'yes', 'on']
        elif self.data_type == 'json':
            import json
            return json.loads(self.value)
        return self.value


class APIUsageLog(models.Model):
    """Track API usage for monitoring and analytics"""
    endpoint = models.CharField(max_length=200)
    method = models.CharField(max_length=10)
    user = models.ForeignKey(
        'accounts.User',
        on_delete=models.SET_NULL,
        null=True,
        blank=True
    )
    ip_address = models.GenericIPAddressField()
    user_agent = models.TextField(blank=True)
    response_status = models.PositiveIntegerField()
    response_time_ms = models.PositiveIntegerField()
    request_size_bytes = models.PositiveIntegerField(default=0)
    response_size_bytes = models.PositiveIntegerField(default=0)
    timestamp = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'api_usage_logs'
        indexes = [
            models.Index(fields=['endpoint', 'method']),
            models.Index(fields=['user']),
            models.Index(fields=['timestamp']),
            models.Index(fields=['response_status']),
        ]
    
    def __str__(self):
        return f"{self.method} {self.endpoint} - {self.response_status}"


class ErrorLog(models.Model):
    """System error logging"""
    error_type = models.CharField(max_length=100)
    message = models.TextField()
    stack_trace = models.TextField(blank=True)
    user = models.ForeignKey(
        'accounts.User',
        on_delete=models.SET_NULL,
        null=True,
        blank=True
    )
    ip_address = models.GenericIPAddressField(blank=True, null=True)
    request_data = models.JSONField(default=dict)
    resolved = models.BooleanField(default=False)
    resolved_by = models.ForeignKey(
        'accounts.User',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='resolved_errors'
    )
    resolved_at = models.DateTimeField(blank=True, null=True)
    timestamp = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'error_logs'
        indexes = [
            models.Index(fields=['error_type']),
            models.Index(fields=['resolved']),
            models.Index(fields=['timestamp']),
        ]
    
    def __str__(self):
        return f"{self.error_type}: {self.message[:100]}"