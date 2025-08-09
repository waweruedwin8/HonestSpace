# Django Backend Migration Guide

## Removing Mock Data for Production

### Current Mock Data Locations
The following files contain mock data that needs to be replaced with real API calls:

1. **Property Data**: `src/hooks/usePropertySearch.tsx` - Line 45-120
2. **Authentication**: Mock user data in `src/contexts/AuthContext.tsx`
3. **Dashboard Data**: Mock stats in all dashboard components
4. **Reviews**: Static review data in property components

### Migration Steps

#### 1. Environment Configuration
Create `.env` file with Django backend URL:
```bash
VITE_API_BASE_URL=https://your-django-backend.com/api
```

#### 2. Replace Mock Data with API Calls
Update these files to use real API endpoints:

**Property Search Hook** (`src/hooks/usePropertySearch.tsx`):
```typescript
// Replace mock data with:
const response = await apiClient.getProperties({
  search: searchTerm,
  location,
  minPrice,
  maxPrice,
  propertyType,
  amenities,
  page: currentPage,
  pageSize: itemsPerPage
});
```

**Dashboard Components**:
- Remove all mock stats objects
- Add useEffect hooks to fetch real data
- Implement loading states

#### 3. Update Authentication Flow
The auth context is already set up for Django JWT tokens. Just ensure your Django backend returns the expected user structure.

#### 4. File Upload Configuration
Update media handling to use Django's file upload endpoints:
```typescript
// In property creation forms
const formData = new FormData();
formData.append('images', file);
const response = await apiClient.uploadFile(file, 'property');
```

---

## Landlord Dashboard Implementation

### Features Implemented

#### 1. Portfolio Overview
- Property count and status tracking
- Revenue analytics
- Performance metrics
- Profile completeness indicator

#### 2. Property Management
- Individual property cards with status
- Verification tracking
- Trust badge display
- Action buttons for management

#### 3. Inquiry Management
- Active conversation tracking
- Auto-response templates
- Viewing schedule management
- Application review system

#### 4. Analytics Dashboard
- Performance metrics per property
- Conversion rates
- Optimization suggestions
- Revenue tracking

#### 5. Application Review
- Tenant application processing
- Document verification
- Employment verification
- Reference checking

#### 6. Profile Management
- Completion tracking
- Trust building features
- Landlord rating system

### API Endpoints Required

```typescript
// Property Management
GET  /api/landlords/dashboard/stats
GET  /api/landlords/properties
PUT  /api/properties/{id}/status
GET  /api/properties/{id}/analytics

// Inquiry Management  
GET  /api/landlords/inquiries
POST /api/inquiries/{id}/respond
POST /api/viewings/schedule

// Applications
GET  /api/applications/pending
PUT  /api/applications/{id}/status
GET  /api/applications/{id}/documents

// Profile
GET  /api/landlords/profile
PUT  /api/landlords/profile
GET  /api/landlords/ratings
```

---

## Scout Dashboard Implementation

### Features Implemented

#### 1. Assignment Management
- Active verification assignments
- Priority tracking
- Location and distance calculation
- Payment information

#### 2. Verification Tools
- Checklist management
- Photo upload interface
- Infrastructure assessment
- Safety evaluation

#### 3. Earnings Tracking
- Monthly earnings overview
- Payment status
- Per-verification breakdown
- Payment history

#### 4. Training & Certification
- Progress tracking
- Available courses
- Certification requirements
- Performance ratings

#### 5. Performance Analytics
- Success rate tracking
- Quality ratings
- Response time metrics
- Area coverage

### API Endpoints Required

```typescript
// Assignments
GET  /api/scouts/assignments
PUT  /api/assignments/{id}/accept
POST /api/assignments/{id}/start

// Verification
POST /api/verifications/submit
POST /api/verifications/photos
GET  /api/verifications/checklist

// Earnings
GET  /api/scouts/earnings
GET  /api/scouts/payments
GET  /api/scouts/payment-history

// Training
GET  /api/scouts/training/progress
GET  /api/scouts/training/courses
POST /api/scouts/training/complete
```

---

## Admin Dashboard Implementation

### Features Implemented

#### 1. Platform Overview
- User statistics
- Property metrics
- Revenue tracking
- Activity monitoring

#### 2. Verification Management
- Pending verification queue
- Bulk review tools
- Scout performance tracking
- Quality control

#### 3. Scout Management
- Application review system
- Scout onboarding
- Performance monitoring
- Area coverage optimization

#### 4. Property Oversight
- Flagged property management
- Verification quality control
- Trust badge assignment
- Content moderation

#### 5. User Management
- User growth analytics
- Account management
- Support ticket handling
- Fraud detection

#### 6. Analytics & Reporting
- Platform health metrics
- Business intelligence
- Performance optimization
- System monitoring

### API Endpoints Required

```typescript
// Platform Overview
GET  /api/admin/dashboard/stats
GET  /api/admin/activity/today
GET  /api/admin/metrics/overview

// Verification Management
GET  /api/admin/verifications/pending
PUT  /api/verifications/{id}/approve
PUT  /api/verifications/{id}/reject
POST /api/verifications/bulk-review

// Scout Management
GET  /api/admin/scouts/applications
PUT  /api/scout-applications/{id}/approve
GET  /api/admin/scouts/performance
POST /api/scouts/recruit

// Property Management
GET  /api/admin/properties/flagged
PUT  /api/properties/{id}/moderate
GET  /api/admin/properties/statistics

// User Management
GET  /api/admin/users/statistics
GET  /api/admin/users/growth
GET  /api/admin/support/tickets

// Analytics
GET  /api/admin/analytics/revenue
GET  /api/admin/analytics/users
GET  /api/admin/system/health
```

---

## Implementation Priority

### Phase 1: Core Functionality (Weeks 1-2)
1. Remove mock data from property search
2. Implement basic landlord dashboard
3. Set up authentication with Django
4. Basic property management

### Phase 2: Advanced Features (Weeks 3-4)
1. Complete scout dashboard
2. Admin dashboard implementation
3. Real-time notifications
4. File upload handling

### Phase 3: Optimization (Weeks 5-6)
1. Performance optimization
2. Error handling improvements
3. Testing and bug fixes
4. Production deployment

### Phase 4: Analytics & Monitoring (Weeks 7-8)
1. Advanced analytics implementation
2. Monitoring and alerting
3. User feedback systems
4. Continuous improvement

## Next Steps

1. **Backend API Development**: Implement Django REST API endpoints
2. **Authentication Setup**: Configure JWT authentication
3. **Database Migration**: Set up PostgreSQL with the ERD schema
4. **File Storage**: Configure AWS S3 or similar for media handling
5. **Testing**: Implement comprehensive test suite
6. **Deployment**: Set up CI/CD pipeline for production deployment

The frontend is now fully prepared for Django integration with proper separation of concerns and clean API interfaces.