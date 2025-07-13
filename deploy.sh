#!/bin/bash

# =================================================================
# ConvinceMe Frontend Deployment Script
# =================================================================
# This script builds and deploys the frontend to production
# =================================================================

set -e  # Exit on any error

# Configuration
SERVER="root@46.101.198.5"
REMOTE_PATH="/var/www/convinceme-fe/dist"
BUILD_DIR="dist"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Helper functions
log_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

log_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

log_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

log_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Pre-deployment checks
echo "================================================================="
echo "🚀 ConvinceMe Frontend Deployment Starting..."
echo "================================================================="

log_info "Checking prerequisites..."

# Check if we're in the right directory
if [ ! -f "package.json" ] || [ ! -f "vite.config.ts" ]; then
    log_error "Please run this script from the convinceme-fe directory"
    exit 1
fi

# Check if pnpm is installed
if ! command -v pnpm &> /dev/null; then
    log_error "pnpm is not installed. Please install it first: npm install -g pnpm"
    exit 1
fi

# Test SSH connection
log_info "Testing SSH connection to $SERVER..."
if ! ssh -o ConnectTimeout=10 -o BatchMode=yes $SERVER "echo 'SSH connection successful'" 2>/dev/null; then
    log_error "Cannot connect to $SERVER. Please check your SSH connection."
    exit 1
fi

log_success "SSH connection verified"

# Install dependencies
log_info "Installing/updating dependencies..."
pnpm install

# Build the application
log_info "Building frontend application..."
pnpm run build

# Check if build was successful
if [ ! -d "$BUILD_DIR" ]; then
    log_error "Build failed! No dist directory found."
    exit 1
fi

log_success "Frontend build completed successfully"

# Create remote directory if it doesn't exist
log_info "Ensuring remote directory exists..."
ssh $SERVER "mkdir -p $REMOTE_PATH"

# Deploy to server
log_info "Deploying frontend to production server..."
log_warning "This will replace all files in $REMOTE_PATH"

rsync -avz --delete \
    --progress \
    --exclude='*.map' \
    --exclude='.DS_Store' \
    $BUILD_DIR/ $SERVER:$REMOTE_PATH/

if [ $? -eq 0 ]; then
    log_success "Frontend deployment completed successfully!"
    echo
    log_info "Deployment Information:"
    echo "  • Server: $SERVER"
    echo "  • Remote Path: $REMOTE_PATH"
    echo "  • Build Directory: $BUILD_DIR"
    echo
    log_info "To verify deployment:"
    echo "  ssh $SERVER 'ls -la $REMOTE_PATH'"
    echo
    log_success "Frontend deployment completed! 🎉"
else
    log_error "Frontend deployment failed! Check the logs above for details."
    exit 1
fi

echo "================================================================="