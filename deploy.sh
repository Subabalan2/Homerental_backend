#!/bin/bash

# RentEase Server Deployment Script
echo "🚀 Starting RentEase Server Deployment..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 16 ]; then
    echo "❌ Node.js version 16 or higher is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Check if .env file exists
if [ ! -f .env ]; then
    echo "⚠️  Warning: .env file not found. Please create one with your environment variables."
    echo "Required variables:"
    echo "  - MONGO_URL"
    echo "  - JWT_SECRET"
    echo "  - RAZORPAY_KEY_ID"
    echo "  - RAZORPAY_KEY_SECRET"
fi

# Run tests if available
if [ -f "package.json" ] && grep -q "\"test\":" package.json; then
    echo "🧪 Running tests..."
    npm test
fi

# Build the project
echo "🔨 Building project..."
npm run build

echo "✅ Deployment preparation completed!"
echo ""
echo "📋 Next steps for Render deployment:"
echo "1. Push your code to a Git repository"
echo "2. Go to render.com and create a new Web Service"
echo "3. Connect your repository"
echo "4. Set environment variables in Render dashboard:"
echo "   - MONGO_URL"
echo "   - JWT_SECRET"
echo "   - RAZORPAY_KEY_ID"
echo "   - RAZORPAY_KEY_SECRET"
echo "   - NODE_ENV=production"
echo "5. Deploy!"
echo ""
echo "🌐 Your API will be available at: https://your-service-name.onrender.com" 