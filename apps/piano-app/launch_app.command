#!/bin/bash

# Piano App Launch Script
# This script automatically installs dependencies and starts the development server

# Change to the script's directory
cd "$(dirname "$0")"

echo "========================================="
echo "🎹 Piano App Launcher"
echo "========================================="
echo ""

# Check if node is installed
if ! command -v node &> /dev/null; then
    echo "❌ Error: Node.js is not installed"
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi

echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Error: npm install failed"
    exit 1
fi

echo ""
echo "✅ Dependencies installed successfully"
echo ""
echo "🚀 Starting development server..."
echo "📍 The app will be available at: http://localhost:5173"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

# Start the development server
npm run dev
