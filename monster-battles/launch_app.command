#!/bin/bash

# Dungeon Battles - Launch Script (Mac)
# Double-click to start the game

# Get the directory where this script is located
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$DIR"

echo "=========================================="
echo "   DUNGEON BATTLES - Action RPG Game"
echo "=========================================="
echo ""
echo "Starting local development server..."
echo ""

# Check if Python 3 is installed
if ! command -v python3 &> /dev/null; then
    echo "ERROR: Python 3 is not installed"
    echo "Please install Python 3 from https://www.python.org/"
    read -p "Press Enter to exit..."
    exit 1
fi

# Function to check if port is in use
is_port_in_use() {
    lsof -i:$1 >/dev/null 2>&1
    return $?
}

# Find available port starting from 8080
PORT=8080
MAX_PORT=8090
while [ $PORT -le $MAX_PORT ]; do
    if ! is_port_in_use $PORT; then
        break
    fi
    echo "Port $PORT is already in use, trying $((PORT+1))..."
    PORT=$((PORT+1))
done

if [ $PORT -gt $MAX_PORT ]; then
    echo "ERROR: No available ports found (tried 8080-$MAX_PORT)"
    echo "Please close other applications using these ports"
    read -p "Press Enter to exit..."
    exit 1
fi

echo "Using port: $PORT"
echo "Game will open at: http://localhost:$PORT"
echo ""
echo "Press Ctrl+C to stop the server"
echo "=========================================="
echo ""

# Start server and open browser
python3 -m http.server $PORT &
SERVER_PID=$!

# Wait for server to start
sleep 2

# Open browser
if command -v open &> /dev/null; then
    open http://localhost:$PORT
elif command -v xdg-open &> /dev/null; then
    xdg-open http://localhost:$PORT
fi

echo "Server started (PID: $SERVER_PID)"
echo ""
echo "Controls:"
echo "  - Arrow Keys / WASD: Move"
echo "  - Space: Attack"
echo "  - X: Magic Attack"
echo "  - P: Pause"
echo "  - F1: Toggle Debug"
echo ""

# Wait for Ctrl+C
trap "echo ''; echo 'Stopping server...'; kill $SERVER_PID 2>/dev/null; exit 0" INT TERM

wait $SERVER_PID
