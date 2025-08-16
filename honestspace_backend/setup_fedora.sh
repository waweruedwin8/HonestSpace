#!/bin/bash

# HonestSpace Backend Setup Script for Fedora
# This script installs and configures PostgreSQL, PostGIS, Redis, and other dependencies

echo "🚀 Setting up HonestSpace Backend on Fedora..."

# Update system
echo "📦 Updating system packages..."
sudo dnf update -y

# Install PostgreSQL and PostGIS
echo "🗄️ Installing PostgreSQL and PostGIS..."
sudo dnf install -y postgresql postgresql-server postgresql-contrib postgis gdal-devel proj-devel geos-devel

# Initialize PostgreSQL database
echo "🔧 Initializing PostgreSQL database..."
sudo postgresql-setup --initdb

# Start and enable PostgreSQL service
echo "▶️ Starting PostgreSQL service..."
sudo systemctl start postgresql
sudo systemctl enable postgresql

# Install Redis
echo "📊 Installing Redis..."
sudo dnf install -y redis

# Start and enable Redis service
echo "▶️ Starting Redis service..."
sudo systemctl start redis
sudo systemctl enable redis

# Install Python development headers and tools
echo "🐍 Installing Python development tools..."
sudo dnf install -y python3-devel python3-pip gcc gcc-c++ make

# Install system dependencies for Python packages
echo "🔨 Installing system dependencies..."
sudo dnf install -y \
    libpq-devel \
    postgresql-devel \
    gdal-devel \
    proj-devel \
    geos-devel \
    libffi-devel \
    openssl-devel \
    libjpeg-turbo-devel \
    zlib-devel \
    freetype-devel \
    lcms2-devel \
    openjpeg2-devel \
    libtiff-devel \
    tk-devel \
    tcl-devel

# Create PostgreSQL user and database
echo "👤 Setting up PostgreSQL user and database..."
sudo -u postgres psql -c "CREATE USER honestspace WITH PASSWORD 'honestspace123';"
sudo -u postgres psql -c "CREATE DATABASE honestspace_db OWNER honestspace;"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE honestspace_db TO honestspace;"
sudo -u postgres psql -d honestspace_db -c "CREATE EXTENSION IF NOT EXISTS postgis;"

# Configure PostgreSQL authentication
echo "🔐 Configuring PostgreSQL authentication..."
PG_VERSION=$(sudo -u postgres psql -t -c "SELECT version();" | grep -oP '\d+\.\d+' | head -1)
PG_CONFIG_PATH="/var/lib/pgsql/data"

# Backup original pg_hba.conf
sudo cp $PG_CONFIG_PATH/pg_hba.conf $PG_CONFIG_PATH/pg_hba.conf.backup

# Update pg_hba.conf for local connections
sudo sed -i "s/#local   all             all                                     trust/local   all             all                                     trust/" $PG_CONFIG_PATH/pg_hba.conf
sudo sed -i "s/local   all             all                                     peer/local   all             all                                     trust/" $PG_CONFIG_PATH/pg_hba.conf
sudo sed -i "s/host    all             all             127.0.0.1\/32            ident/host    all             all             127.0.0.1\/32            md5/" $PG_CONFIG_PATH/pg_hba.conf
sudo sed -i "s/host    all             all             ::1\/128                 ident/host    all             all             ::1\/128                 md5/" $PG_CONFIG_PATH/pg_hba.conf

# Restart PostgreSQL to apply changes
echo "🔄 Restarting PostgreSQL service..."
sudo systemctl restart postgresql

# Create virtual environment
echo "🐍 Creating Python virtual environment..."
python3 -m venv venv
source venv/bin/activate

# Upgrade pip
echo "📦 Upgrading pip..."
pip install --upgrade pip

# Install Python dependencies
echo "📚 Installing Python dependencies..."
pip install -r requirements.txt

# Create logs directory
echo "📝 Creating logs directory..."
mkdir -p logs

# Copy environment file
echo "📄 Creating environment file..."
cp .env.example .env

# Generate Django secret key
echo "🔑 Generating Django secret key..."
SECRET_KEY=$(python3 -c 'from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())')
sed -i "s/SECRET_KEY=your-secret-key-here/SECRET_KEY=$SECRET_KEY/" .env

# Update database credentials in .env
sed -i "s/DB_PASSWORD=your_password_here/DB_PASSWORD=honestspace123/" .env

echo "✅ Setup completed successfully!"
echo ""
echo "🔧 Next steps:"
echo "1. Activate virtual environment: source venv/bin/activate"
echo "2. Update .env file with your API keys and credentials"
echo "3. Run migrations: python manage.py migrate"
echo "4. Create superuser: python manage.py createsuperuser"
echo "5. Start development server: python manage.py runserver"
echo ""
echo "📊 Service status:"
echo "PostgreSQL: $(systemctl is-active postgresql)"
echo "Redis: $(systemctl is-active redis)"
echo ""
echo "🔗 Database connection:"
echo "Database: honestspace_db"
echo "Username: honestspace"
echo "Password: honestspace123"
echo "Host: localhost"
echo "Port: 5432"