#!/bin/bash
# Open the Create New Inventory prototype in your browser.
# Double-click this file in Finder, or run: ./open-create-inventory-prototype.command

cd "$(dirname "$0")"

# Start server in background if not already running
if ! curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1:3333/ 2>/dev/null | grep -q 200; then
  echo "Starting server on port 3333..."
  python3 -m http.server 3333 &
  SERVER_PID=$!
  sleep 2
fi

URL="http://localhost:3333/prototypes/create-new-inventory/"
echo "Opening: $URL"
open "$URL" 2>/dev/null || xdg-open "$URL" 2>/dev/null || echo "Open this URL in your browser: $URL"

# If we started the server, keep script running so server stays up
if [ -n "$SERVER_PID" ]; then
  echo "Server running. Press Ctrl+C to stop."
  wait $SERVER_PID
fi
