# HonestSpace - Africa's Verified Property Rental Platform

![HonestSpace Logo](https://via.placeholder.com/200x80/2563eb/ffffff?text=HonestSpace)

**Tagline:** *Where every listing is verified and every review is real*

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)](https://github.com/edwinwaweru/honestspace)
[![Django](https://img.shields.io/badge/Django-4.2+-green.svg)](https://djangoproject.com/)
[![React](https://img.shields.io/badge/React-18.0+-blue.svg)](https://reactjs.org/)
[![Redis](https://img.shields.io/badge/Redis-7.0+-red.svg)](https://redis.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-14+-blue.svg)](https://postgresql.org/)

## 🎯 Project Overview

HonestSpace is a revolutionary property rental platform that eliminates fake listings and builds trust through community-based verification. Unlike traditional rental platforms, every property is verified by trained local scouts, and every review is authentic and detailed.

### 🚀 Live Demo
- **Frontend:** [https://honestspace.online](https://honestspace.online)
- **API Documentation:** [https://api.honestspace.online/docs](https://api.honestspace.online/docs)

## ✨ Key Features

### 🏠 Core Platform
- **100% Verified Listings** - No fake properties allowed
- **Multi-Role Authentication** - Tenants, Landlords, Scouts, Admins
- **Comprehensive Property Search** - Advanced filtering with real-time results
- **Media Management** - High-quality images and video support
- **Trust Badge System** - Verified amenities and safety features

### 👥 User Management
- **JWT Authentication** with Google OAuth integration
- **Role-based Access Control** (RBAC)
- **Email & Phone Verification**
- **Password Reset & Security Features**

### 📊 Advanced Features
- **Multi-Category Reviews** - Water, internet, safety, landlord responsiveness
- **Subscription Management** - Tiered pricing for different user types
- **Real-time Notifications** - Email and SMS alerts
- **Analytics Dashboard** - Comprehensive insights for all user types

### 💳 Payment Integration
- **Multiple Payment Gateways** - M-Pesa, Stripe, PayPal
- **Subscription Management** - Automated billing and renewals
- **Transaction Tracking** - Complete payment history

## 🛠 Technology Stack

### Backend
- **Framework:** Django 4.2+ with Django REST Framework
- **Database:** PostgreSQL (Primary), Redis (Caching)
- **Authentication:** JWT tokens with OAuth2
- **File Storage:** AWS S3 / Google Cloud Storage
- **Search:** Elasticsearch for advanced property search
- **Task Queue:** Celery with Redis broker

### Frontend
- **Framework:** React 18+ with TypeScript
- **State Management:** Context API + Custom Hooks
- **Styling:** Tailwind CSS
- **HTTP Client:** Axios with interceptors
- **Routing:** React Router v6

### DevOps & Infrastructure
- **Hosting:** AWS EC2 / Google Cloud Platform
- **Database:** AWS RDS PostgreSQL
- **CDN:** CloudFlare
- **Monitoring:** New Relic / DataDog
- **CI/CD:** GitHub Actions

### Third-Party Integrations
- **Maps:** Google Maps & Places API
- **Payments:** Stripe, PayPal, M-Pesa APIs
- **Communications:** Twilio (SMS), SendGrid (Email)
- **Images:** Cloudinary for optimization

## 📋 Prerequisites

- Python 3.9+
- Node.js 16+
- PostgreSQL 14+
- Redis 7+
- Git

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/edwinwaweru/honestspace.git
cd honestspace
```

### 2. Backend Setup
```bash
# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Environment setup
cp .env.example .env
# Edit .env with your configuration

# Database setup
python manage.py migrate
python manage.py createsuperuser
python manage.py collectstatic

# Load initial data
python manage.py loaddata initial_data.json

# Start development server
python manage.py runserver
```

### 3. Frontend Setup
```bash
cd frontend

# Install dependencies
npm install

# Environment setup
cp .env.example .env.local
# Edit .env.local with your configuration

# Start development server
npm start
```

### 4. Redis Setup
```bash
# Install Redis (Ubuntu/Debian)
sudo apt install redis-server

# Start Redis
redis-server

# Or using Docker
docker run -d -p 6379:6379 redis:7-alpine
```

## 🔧 Environment Configuration

### Backend (.env)
```bash
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/honestspace
REDIS_URL=redis://localhost:6379/0

# Django Settings
SECRET_KEY=your-secret-key
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1

# Authentication
JWT_SECRET_KEY=your-jwt-secret
GOOGLE_OAUTH_CLIENT_ID=your-google-client-id
GOOGLE_OAUTH_CLIENT_SECRET=your-google-client-secret

# File Storage
AWS_ACCESS_KEY_ID=your-aws-key
AWS_SECRET_ACCESS_KEY=your-aws-secret
AWS_STORAGE_BUCKET_NAME=honestspace-media

# External APIs
GOOGLE_MAPS_API_KEY=your-maps-api-key
STRIPE_PUBLISHABLE_KEY=your-stripe-key
STRIPE_SECRET_KEY=your-stripe-secret
MPESA_CONSUMER_KEY=your-mpesa-key
MPESA_CONSUMER_SECRET=your-mpesa-secret

# Communications
SENDGRID_API_KEY=your-sendgrid-key
TWILIO_ACCOUNT_SID=your-twilio-sid
TWILIO_AUTH_TOKEN=your-twilio-token
```

### Frontend (.env.local)
```bash
REACT_APP_API_BASE_URL=http://localhost:8000/api
REACT_APP_GOOGLE_MAPS_API_KEY=your-maps-api-key
REACT_APP_STRIPE_PUBLISHABLE_KEY=your-stripe-key
REACT_APP_GOOGLE_OAUTH_CLIENT_ID=your-google-client-id
```

## 📊 Database Schema

The project uses a comprehensive, normalized database design with 47+ tables organized into logical domains:

### Core Entities
- **Users** - Multi-role user management
- **Properties** - Property listings with comprehensive details
- **Reviews** - Multi-category rating system
- **Media** - Images and videos with optimization

### Advanced Features
- **Scout System** - Verification workflow management
- **Payment System** - Multi-gateway transaction handling
- **Geographic Data** - Hierarchical location management
- **Trust Badges** - Quality and safety verification

[View Complete ERD](https://drive.google.com/file/d/your-erd-link)

## 🌐 API Documentation

### Authentication Endpoints
```
POST /api/auth/register/          # User registration
POST /api/auth/login/             # User login
POST /api/auth/refresh/           # Token refresh
POST /api/auth/logout/            # User logout
POST /api/auth/google-login/      # Google OAuth
```

### Property Management
```
GET    /api/properties/           # List properties
POST   /api/properties/           # Create property
GET    /api/properties/{id}/      # Property details
PUT    /api/properties/{id}/      # Update property
DELETE /api/properties/{id}/      # Delete property
POST   /api/properties/{id}/media/ # Upload media
```

### Reviews & Ratings
```
GET  /api/properties/{id}/reviews/ # Get reviews
POST /api/properties/{id}/reviews/ # Create review
PUT  /api/reviews/{id}/           # Update review
```

### Search & Filtering
```
GET /api/search/properties/       # Advanced search
GET /api/search/autocomplete/     # Search suggestions
GET /api/filters/amenities/       # Available amenities
```

[Complete API Documentation](https://api.honestspace.online/docs)

## 🧪 Testing

### Run Backend Tests
```bash
# Unit tests
python manage.py test

# Coverage report
coverage run --source='.' manage.py test
coverage html

# API tests
python manage.py test api.tests
```

### Run Frontend Tests
```bash
# Unit tests
npm test

# Coverage
npm run test:coverage

# E2E tests
npm run test:e2e
```

## 📦 Deployment

### Production Deployment

#### 1. Backend (Django)
```bash
# Install production dependencies
pip install -r requirements/production.txt

# Collect static files
python manage.py collectstatic --noinput

# Run migrations
python manage.py migrate

# Start with Gunicorn
gunicorn honestspace.wsgi:application --bind 0.0.0.0:8000
```

#### 2. Frontend (React)
```bash
# Build for production
npm run build

# Serve with nginx or deploy to CDN
cp -r build/* /var/www/html/
```

#### 3. Database Migration
```bash
# Create production database
createdb honestspace_prod

# Run migrations
python manage.py migrate --settings=honestspace.settings.production
```

### Docker Deployment
```bash
# Build and run with Docker Compose
docker-compose up -d

# Scale services
docker-compose up --scale web=3
```

## 📈 Performance Optimization

### Database Optimization
- **Query Optimization** - Select/prefetch related objects
- **Database Indexing** - Strategic indexes on search fields
- **Connection Pooling** - PgBouncer for connection management

### Caching Strategy
- **Redis Caching** - API responses and database queries
- **Browser Caching** - Static assets with long TTL
- **CDN Integration** - Global content distribution

### API Performance
- **Pagination** - Cursor-based pagination for large datasets
- **Rate Limiting** - Protection against abuse
- **Response Compression** - Gzip compression enabled

## 🔐 Security Features

### Authentication & Authorization
- **JWT Tokens** - Secure stateless authentication
- **Role-based Access** - Granular permission system
- **OAuth Integration** - Secure third-party authentication

### Data Protection
- **Input Validation** - Comprehensive request validation
- **SQL Injection Protection** - ORM-based queries
- **XSS Prevention** - Output sanitization
- **CSRF Protection** - Built-in Django CSRF

### Infrastructure Security
- **HTTPS Everywhere** - SSL/TLS encryption
- **Secure Headers** - Security-focused HTTP headers
- **Rate Limiting** - DDoS and abuse protection

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Code Standards
- **Python:** Follow PEP 8 style guide
- **JavaScript:** ESLint with Airbnb configuration
- **Testing:** Minimum 80% code coverage
- **Documentation:** Comprehensive docstrings and comments

## 📖 Project Structure

```
honestspace/
├── backend/                 # Django backend
│   ├── apps/
│   │   ├── authentication/ # Auth system
│   │   ├── properties/     # Property management
│   │   ├── reviews/        # Review system
│   │   ├── scouts/         # Scout verification
│   │   ├── payments/       # Payment processing
│   │   └── core/          # Shared utilities
│   ├── config/            # Django settings
│   ├── requirements/      # Dependencies
│   └── manage.py
├── frontend/              # React frontend
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── hooks/         # Custom hooks
│   │   ├── contexts/      # React contexts
│   │   ├── utils/         # Utilities
│   │   └── types/         # TypeScript types
│   ├── public/
│   └── package.json
├── docs/                  # Documentation
├── docker-compose.yml     # Docker configuration
└── README.md
```

## 📊 Industry Best Practices Implemented

### Development Practices
- **Test-Driven Development** - Comprehensive test suite
- **Code Reviews** - Pull request review process
- **Continuous Integration** - Automated testing and deployment
- **Documentation** - Comprehensive API and code documentation

### Architecture Patterns
- **Model-View-Controller** - Clean separation of concerns
- **Repository Pattern** - Data access abstraction
- **Factory Pattern** - Object creation abstraction
- **Observer Pattern** - Event-driven notifications

### Database Design
- **Normalization** - Third normal form compliance
- **Foreign Key Constraints** - Data integrity enforcement
- **Soft Deletes** - Data preservation strategy
- **Audit Trails** - Complete change tracking

## 📈 Metrics & Analytics

### Key Performance Indicators
- **Response Time** - Average API response < 200ms
- **Uptime** - 99.9% availability target
- **User Engagement** - Average session duration
- **Conversion Rate** - Property inquiry to rental ratio

### Monitoring & Alerting
- **Application Monitoring** - New Relic integration
- **Error Tracking** - Sentry for error monitoring
- **Performance Metrics** - Custom Django middleware
- **Health Checks** - Automated system monitoring

## 🛣 Roadmap

### Phase 1: MVP (Completed)
- ✅ User authentication and management
- ✅ Property listing and search
- ✅ Basic review system
- ✅ Payment integration

### Phase 2: Advanced Features (In Progress)
- 🔄 Scout verification system
- 🔄 Advanced analytics dashboard
- 🔄 Mobile app development
- 🔄 AI-powered recommendations

### Phase 3: Scale & Expand (Planned)
- 📋 Multi-country expansion
- 📋 Advanced machine learning features
- 📋 Enterprise solutions
- 📋 API marketplace

## 📞 Contact & Support

- **Website:** [honestspace.online](https://honestspace.online)
- **Email:** edwin@honestspace.online
- **LinkedIn:** [Edwin Waweru](https://www.linkedin.com/in/edwinwaweru/)
- **GitHub:** [@edwinwaweru](https://github.com/edwinwaweru)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Django Community** - For the amazing framework
- **React Team** - For the excellent frontend library
- **ALX Software Engineering Program** - For the learning opportunity
- **Open Source Contributors** - For the tools and libraries used

---

**Built with ❤️ in Kenya by Edwin Waweru**

*Transforming Africa's rental market, one verified listing at a time.*
