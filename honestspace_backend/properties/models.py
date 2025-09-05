from django.db import models
from django.contrib.gis.db import models as gis_models
from django.core.validators import MinValueValidator, MaxValueValidator
from builtins import property as builtin_property
from django.utils import timezone
from decimal import Decimal
import uuid
from django.utils.functional import cached_property as builtin_property
from django.contrib.gis.geos import Point

class PropertyType(models.Model):
    """Types of properties"""
    TYPE_CHOICES = [
        ('studio', 'Studio'),
        ('1bedroom', '1 Bedroom'),
        ('2bedroom', '2 Bedroom'),
        ('3bedroom', '3 Bedroom'),
        ('4bedroom', '4+ Bedroom'),
        ('bungalow', 'Bungalow'),
        ('maisonette', 'Maisonette'),
        ('apartment', 'Apartment'),
        ('commercial', 'Commercial'),
        ('office', 'Office Space'),
        ('shop', 'Shop/Retail'),
        ('warehouse', 'Warehouse'),
        ('land', 'Land'),
    ]
    
    CATEGORY_CHOICES = [
        ('residential', 'Residential'),
        ('commercial', 'Commercial'),
        ('mixed', 'Mixed Use'),
    ]
    
    name = models.CharField(max_length=50, choices=TYPE_CHOICES, unique=True)
    display_name = models.CharField(max_length=100)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    description = models.TextField(blank=True)
    icon = models.CharField(max_length=50, blank=True)
    is_active = models.BooleanField(default=True)
    sort_order = models.PositiveIntegerField(default=0)
    
    class Meta:
        db_table = 'property_types'
        ordering = ['sort_order', 'display_name']
    
    def __str__(self):
        return self.display_name


class PropertyStatus(models.Model):
    """Status of properties"""
    STATUS_CHOICES = [
        ('draft', 'Draft'),
        ('pending', 'Pending Verification'),
        ('active', 'Active'),
        ('inactive', 'Inactive'),
        ('verified', 'Verified'),
        ('rejected', 'Rejected'),
        ('suspended', 'Suspended'),
        ('rented', 'Rented'),
        ('expired', 'Expired'),
    ]
    
    name = models.CharField(max_length=20, choices=STATUS_CHOICES, unique=True)
    display_name = models.CharField(max_length=50)
    description = models.TextField(blank=True)
    color = models.CharField(max_length=7, default='#000000')  # Hex color
    is_public = models.BooleanField(default=True)  # Show to public searches
    
    class Meta:
        db_table = 'property_status'
        verbose_name_plural = 'Property statuses'
    
    def __str__(self):
        return self.display_name


class Property(models.Model):
    """Main property model"""
    # Basic Information
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=200)
    description = models.TextField()
    
    # Relationships
    landlord = models.ForeignKey(
        'accounts.User',
        on_delete=models.CASCADE,
        related_name='properties'
    )
    property_type = models.ForeignKey(
        PropertyType,
        on_delete=models.PROTECT,
        related_name='properties'
    )
    status = models.ForeignKey(
        PropertyStatus,
        on_delete=models.PROTECT,
        related_name='properties',
        default=1  # Assuming 'draft' is the first status
    )
    
    # Pricing
    rent_amount = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        validators=[MinValueValidator(Decimal('0.01'))]
    )
    deposit_amount = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        default=Decimal('0.00')
    )
    currency = models.CharField(max_length=3, default='KES')
    
    # Property Details
    property_size_sqft = models.PositiveIntegerField(blank=True, null=True)
    bedrooms = models.PositiveIntegerField(default=0)
    bathrooms = models.PositiveIntegerField(default=0)
    floors = models.PositiveIntegerField(default=1)
    parking_spaces = models.PositiveIntegerField(default=0)
    
    # Features
    utilities_included = models.BooleanField(default=False)
    is_furnished = models.BooleanField(default=False)
    is_pet_friendly = models.BooleanField(default=False)
    has_garden = models.BooleanField(default=False)
    has_pool = models.BooleanField(default=False)
    has_gym = models.BooleanField(default=False)
    
    # Availability
    availability_date = models.DateField(default=timezone.now)
    minimum_lease_months = models.PositiveIntegerField(default=6)
    maximum_lease_months = models.PositiveIntegerField(blank=True, null=True)
    
    # Verification
    is_verified = models.BooleanField(default=False)
    verification_date = models.DateTimeField(blank=True, null=True)
    verified_by = models.ForeignKey(
        'accounts.User',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='verified_properties'
    )
    verification_score = models.DecimalField(
        max_digits=3,
        decimal_places=2,
        validators=[MinValueValidator(0), MaxValueValidator(10)],
        blank=True,
        null=True
    )
    
    # Analytics
    view_count = models.PositiveIntegerField(default=0)
    inquiry_count = models.PositiveIntegerField(default=0)
    love_count = models.PositiveIntegerField(default=0)
    
    # SEO
    slug = models.SlugField(max_length=255, unique=True, blank=True)
    meta_description = models.CharField(max_length=160, blank=True)
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    published_at = models.DateTimeField(blank=True, null=True)
    expires_at = models.DateTimeField(blank=True, null=True)
    
    class Meta:
        db_table = 'properties'
        indexes = [
            models.Index(fields=['landlord']),
            models.Index(fields=['property_type']),
            models.Index(fields=['status']),
            models.Index(fields=['rent_amount']),
            models.Index(fields=['is_verified']),
            models.Index(fields=['created_at']),
            models.Index(fields=['published_at']),
            models.Index(fields=['availability_date']),
        ]
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.title} - {self.rent_amount} {self.currency}"
    
    @property
    def is_available(self):
        return (
            self.status.name == 'active' and
            self.availability_date <= timezone.now().date() and
            (self.expires_at is None or self.expires_at > timezone.now())
        )
    
    def save(self, *args, **kwargs):
        if not self.slug:
            from django.utils.text import slugify
            self.slug = slugify(f"{self.title}-{self.id}")
        super().save(*args, **kwargs)

class PropertyLocation(models.Model):
    """Property location details"""
    property = models.OneToOneField(
        "Property",
        on_delete=models.CASCADE,
        related_name="location"
    )

    # Address
    address_line_1 = models.CharField(max_length=255, blank=True)
    address_line_2 = models.CharField(max_length=255, blank=True, null=True)
    postal_code = models.CharField(max_length=20, blank=True, null=True)
    neighborhood = models.ForeignKey(
        "core.Neighborhood",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="property_locations"
    )

    # Geographic coordinates
    location = gis_models.PointField(null=True, blank=True)  # store lat/lng
    latitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    longitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    google_maps_link = models.URLField(blank=True, null=True)

    # Verification
    address_verified = models.BooleanField(default=False)
    coordinates_verified = models.BooleanField(default=False)

    # Accessibility
    public_transport_distance_m = models.PositiveIntegerField(blank=True, null=True)
    main_road_distance_m = models.PositiveIntegerField(blank=True, null=True)

    class Meta:
        db_table = "property_locations"

    def __str__(self):
        return f"Location for {self.property.title}"

    @builtin_property
    def full_address(self):
        parts = []
        if self.address_line_1:
            parts.append(self.address_line_1)
        if self.address_line_2:
            parts.append(self.address_line_2)
        if self.neighborhood:
            parts.append(self.neighborhood.name)
            if self.neighborhood.city:
                parts.append(self.neighborhood.city.name)
                if self.neighborhood.city.county:
                    parts.append(self.neighborhood.city.county.name)
        return ", ".join(parts)

    def save(self, *args, **kwargs):
        # Keep GIS Point in sync with latitude/longitude
        if self.latitude and self.longitude:
            self.location = Point(float(self.longitude), float(self.latitude))
        elif self.location:
            # If Point exists but lat/lng fields are empty, sync them
            self.latitude = self.location.y
            self.longitude = self.location.x
        super().save(*args, **kwargs)

class PropertyMedia(models.Model):
    """Property images and videos"""
    property = models.ForeignKey(
        Property,
        on_delete=models.CASCADE,
        related_name='media'
    )
    media_type = models.ForeignKey(
        'core.MediaType',
        on_delete=models.PROTECT
    )

    # File information
    file = models.FileField(upload_to='property_media/')
    thumbnail = models.ImageField(upload_to='property_thumbnails/', blank=True, null=True)
    original_filename = models.CharField(max_length=255)
    file_size_bytes = models.PositiveIntegerField()
    
    # Metadata
    title = models.CharField(max_length=200, blank=True)
    description = models.TextField(blank=True)
    alt_text = models.CharField(max_length=255, blank=True)
    sort_order = models.PositiveIntegerField(default=0)
    
    # Status
    is_active = models.BooleanField(default=True)
    is_primary = models.BooleanField(default=False)
    
    # Processing status for videos
    processing_status = models.CharField(
        max_length=20,
        choices=[
            ('pending', 'Pending'),
            ('processing', 'Processing'),
            ('completed', 'Completed'),
            ('failed', 'Failed'),
        ],
        default='completed'
    )
    
    # Timestamps
    uploaded_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'property_media'
        ordering = ['sort_order', 'uploaded_at']
        indexes = [
            models.Index(fields=['property', 'is_active']),
            models.Index(fields=['media_type']),
        ]
    
    def __str__(self):
        return f"{self.media_type.name} for {self.property.title}"


class PropertyAmenity(models.Model):
    """Junction table for property amenities"""
    property = models.ForeignKey(
        Property,
        on_delete=models.CASCADE,
        related_name='property_amenities'
    )
    amenity = models.ForeignKey(
        'core.Amenity',
        on_delete=models.CASCADE,
        related_name='property_amenities'
    )
    
    # Verification
    is_verified = models.BooleanField(default=False)
    verified_by = models.ForeignKey(
        'accounts.User',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='verified_amenities'
    )
    verification_date = models.DateTimeField(blank=True, null=True)
    verification_notes = models.TextField(blank=True)
    
    # Additional info
    notes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'property_amenities'
        unique_together = ['property', 'amenity']
    
    def __str__(self):
        return f"{self.property.title} - {self.amenity.name}"


class PropertyTrustBadge(models.Model):
    """Junction table for property trust badges"""
    property = models.ForeignKey(
        Property,
        on_delete=models.CASCADE,
        related_name='trust_badges'
    )
    badge = models.ForeignKey(
        'core.TrustBadge',
        on_delete=models.CASCADE,
        related_name='property_badges'
    )
    
    # Verification
    verified_by = models.ForeignKey(
        'accounts.User',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='awarded_badges'
    )
    verification_date = models.DateTimeField(auto_now_add=True)
    verification_notes = models.TextField(blank=True)
    
    # Status
    is_active = models.BooleanField(default=True)
    expires_at = models.DateTimeField(blank=True, null=True)
    
    # Score/criteria met
    score_achieved = models.DecimalField(
        max_digits=5,
        decimal_places=2,
        blank=True,
        null=True
    )
    
    class Meta:
        db_table = 'property_trust_badges'
        unique_together = ['property', 'badge']
    
    def __str__(self):
        return f"{self.property.title} - {self.badge.name}"


class PropertyLandmark(models.Model):
    """Junction table linking properties to nearby landmarks"""
    property = models.ForeignKey(
        Property,
        on_delete=models.CASCADE,
        related_name='nearby_landmarks'
    )
    landmark = models.ForeignKey(
        'core.Landmark',
        on_delete=models.CASCADE,
        related_name='nearby_properties'
    )
    
    # Distance calculations
    distance_meters = models.PositiveIntegerField()
    walking_time_minutes = models.PositiveIntegerField(blank=True, null=True)
    driving_time_minutes = models.PositiveIntegerField(blank=True, null=True)
    
    # Additional info
    notes = models.TextField(blank=True)
    is_highlighted = models.BooleanField(default=False)  # Feature this landmark
    
    # Verification
    distance_verified = models.BooleanField(default=False)
    verified_by = models.ForeignKey(
        'accounts.User',
        on_delete=models.SET_NULL,
        null=True,
        blank=True
    )
    
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'property_landmarks'
        unique_together = ['property', 'landmark']
        indexes = [
            models.Index(fields=['distance_meters']),
            models.Index(fields=['is_highlighted']),
        ]
    
    def __str__(self):
        return f"{self.property.title} - {self.landmark.name} ({self.distance_meters}m)"


class Review(models.Model):
    """Property reviews by tenants"""
    property = models.ForeignKey(
        Property,
        on_delete=models.CASCADE,
        related_name='reviews'
    )
    tenant = models.ForeignKey(
        'accounts.User',
        on_delete=models.CASCADE,
        related_name='reviews_written'
    )
    
    # Rating (1-5 stars)
    overall_rating = models.PositiveIntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(5)]
    )
    
    # Review content
    title = models.CharField(max_length=200)
    review_text = models.TextField()
    
    # Pros and cons
    pros = models.TextField(blank=True)
    cons = models.TextField(blank=True)
    
    # Verification
    is_verified = models.BooleanField(default=False)
    verification_method = models.CharField(
        max_length=50,
        choices=[
            ('lease_agreement', 'Lease Agreement'),
            ('utility_bill', 'Utility Bill'),
            ('bank_statement', 'Bank Statement'),
            ('scout_verification', 'Scout Verification'),
        ],
        blank=True
    )
    
    # Interaction metrics
    helpful_count = models.PositiveIntegerField(default=0)
    unhelpful_count = models.PositiveIntegerField(default=0)
    reported_count = models.PositiveIntegerField(default=0)
    
    # Status
    is_approved = models.BooleanField(default=True)
    is_featured = models.BooleanField(default=False)
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    stay_duration_months = models.PositiveIntegerField(blank=True, null=True)
    
    class Meta:
        db_table = 'reviews'
        unique_together = ['property', 'tenant']  # One review per tenant per property
        indexes = [
            models.Index(fields=['property', 'is_approved']),
            models.Index(fields=['overall_rating']),
            models.Index(fields=['created_at']),
            models.Index(fields=['is_verified']),
        ]
        ordering = ['-created_at']
    
    def __str__(self):
        return f"Review by {self.tenant.full_name} for {self.property.title}"


class ReviewRating(models.Model):
    """Detailed ratings for different aspects"""
    review = models.ForeignKey(
        Review,
        on_delete=models.CASCADE,
        related_name='detailed_ratings'
    )
    category = models.ForeignKey(
        'core.RatingCategory',
        on_delete=models.CASCADE
    )
    rating_value = models.PositiveIntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(5)]
    )
    notes = models.TextField(blank=True)
    
    class Meta:
        db_table = 'review_ratings'
        unique_together = ['review', 'category']
    
    def __str__(self):
        return f"{self.review} - {self.category.display_name}: {self.rating_value}"


class ReviewMedia(models.Model):
    """Images and videos attached to reviews"""
    review = models.ForeignKey(
        Review,
        on_delete=models.CASCADE,
        related_name='media'
    )
    
    # File information
    file = models.FileField(upload_to='review_media/')
    media_type = models.CharField(
        max_length=10,
        choices=[
            ('image', 'Image'),
            ('video', 'Video'),
        ]
    )
    
    # Metadata
    caption = models.CharField(max_length=255, blank=True)
    sort_order = models.PositiveIntegerField(default=0)
    
    # Status
    is_approved = models.BooleanField(default=True)
    
    uploaded_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'review_media'
        ordering = ['sort_order', 'uploaded_at']
    
    def __str__(self):
        return f"{self.media_type} for review {self.review.id}"


class LovedProperty(models.Model):
    """User's favorite/bookmarked properties"""
    user = models.ForeignKey(
        'accounts.User',
        on_delete=models.CASCADE,
        related_name='loved_properties'
    )
    property = models.ForeignKey(
        Property,
        on_delete=models.CASCADE,
        related_name='loved_by_users'
    )
    
    # User notes
    notes = models.TextField(blank=True)
    
    # Timestamps
    loved_at = models.DateTimeField(auto_now_add=True)
    last_viewed = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'loved_properties'
        unique_together = ['user', 'property']
        indexes = [
            models.Index(fields=['user', 'loved_at']),
            models.Index(fields=['property']),
        ]
    
    def __str__(self):
        return f"{self.user.full_name} loves {self.property.title}"


class PropertyInquiry(models.Model):
    """Inquiries from potential tenants"""
    property = models.ForeignKey(
        Property,
        on_delete=models.CASCADE,
        related_name='inquiries'
    )
    tenant = models.ForeignKey(
        'accounts.User',
        on_delete=models.CASCADE,
        related_name='property_inquiries'
    )
    
    # Inquiry details
    subject = models.CharField(max_length=200)
    message = models.TextField()
    
    # Contact preferences
    preferred_contact_method = models.CharField(
        max_length=20,
        choices=[
            ('email', 'Email'),
            ('phone', 'Phone'),
            ('whatsapp', 'WhatsApp'),
            ('in_app', 'In-App Message'),
        ],
        default='email'
    )
    
    # Move-in details
    desired_move_in_date = models.DateField(blank=True, null=True)
    lease_duration_months = models.PositiveIntegerField(blank=True, null=True)
    budget_max = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        blank=True,
        null=True
    )
    
    # Status
    status = models.CharField(
        max_length=25,
        choices=[
            ('new', 'New'),
            ('responded', 'Responded'),
            ('scheduled', 'Viewing Scheduled'),
            ('viewed', 'Property Viewed'),
            ('application_submitted', 'Application Submitted'),
            ('approved', 'Approved'),
            ('rejected', 'Rejected'),
            ('closed', 'Closed'),
        ],
        default='new'
    )
    
    # Response tracking
    landlord_responded = models.BooleanField(default=False)
    response_time_hours = models.PositiveIntegerField(blank=True, null=True)
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    responded_at = models.DateTimeField(blank=True, null=True)
    
    class Meta:
        db_table = 'property_inquiries'
        indexes = [
            models.Index(fields=['property', 'status']),
            models.Index(fields=['tenant']),
            models.Index(fields=['created_at']),
        ]
        ordering = ['-created_at']
    
    def __str__(self):
        return f"Inquiry from {self.tenant.full_name} for {self.property.title}"


class PropertyViewing(models.Model):
    """Scheduled property viewings"""
    inquiry = models.ForeignKey(
        PropertyInquiry,
        on_delete=models.CASCADE,
        related_name='viewings'
    )
    
    # Viewing details
    scheduled_datetime = models.DateTimeField()
    duration_minutes = models.PositiveIntegerField(default=30)
    
    # Attendees
    tenant_confirmed = models.BooleanField(default=False)
    landlord_confirmed = models.BooleanField(default=False)
    
    # Status
    status = models.CharField(
        max_length=25,
        choices=[
            ('scheduled', 'Scheduled'),
            ('confirmed', 'Confirmed'),
            ('completed', 'Completed'),
            ('cancelled', 'Cancelled'),
            ('no_show', 'No Show'),
        ],
        default='scheduled'
    )
    
    # Notes
    landlord_notes = models.TextField(blank=True)
    tenant_notes = models.TextField(blank=True)
    
    # Feedback
    tenant_rating = models.PositiveIntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(5)],
        blank=True,
        null=True
    )
    landlord_rating = models.PositiveIntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(5)],
        blank=True,
        null=True
    )
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    completed_at = models.DateTimeField(blank=True, null=True)
    
    class Meta:
        db_table = 'property_viewings'
        indexes = [
            models.Index(fields=['scheduled_datetime']),
            models.Index(fields=['status']),
        ]
    
    def __str__(self):
        return f"Viewing for {self.inquiry.property.title} on {self.scheduled_datetime}"


class PropertyAnalytics(models.Model):
    """Daily analytics for properties"""
    property = models.ForeignKey(
        Property,
        on_delete=models.CASCADE,
        related_name='daily_analytics'
    )
    
    # Date
    date = models.DateField()
    
    # Metrics
    views = models.PositiveIntegerField(default=0)
    unique_views = models.PositiveIntegerField(default=0)
    inquiries = models.PositiveIntegerField(default=0)
    loves = models.PositiveIntegerField(default=0)
    shares = models.PositiveIntegerField(default=0)
    
    # Conversion metrics
    view_to_inquiry_rate = models.DecimalField(
        max_digits=5,
        decimal_places=4,
        default=Decimal('0.0000')
    )
    inquiry_to_viewing_rate = models.DecimalField(
        max_digits=5,
        decimal_places=4,
        default=Decimal('0.0000')
    )
    
    # Search metrics
    search_appearances = models.PositiveIntegerField(default=0)
    search_clicks = models.PositiveIntegerField(default=0)
    search_ctr = models.DecimalField(
        max_digits=5,
        decimal_places=4,
        default=Decimal('0.0000')
    )
    
    # Social media metrics
    social_shares = models.PositiveIntegerField(default=0)
    social_clicks = models.PositiveIntegerField(default=0)
    
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'property_analytics'
        unique_together = ['property', 'date']
        indexes = [
            models.Index(fields=['date']),
            models.Index(fields=['property', 'date']),
        ]
    
    def __str__(self):
        return f"Analytics for {self.property.title} on {self.date}"