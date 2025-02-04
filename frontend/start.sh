#!/bin/bash

# Navigate to the backend directory and start FastAPI server
echo "Starting FastAPI Backend..."
cd ../backend
source ../.venv/bin/activate  # Activate the virtual environment (Linux/Mac)
# Use `.venv\Scripts\activate` for Windows

uvicorn main:app --host 0.0.0.0 --port 8000 --reload &

# Navigate to the frontend directory and start React app
echo "Starting React Frontend..."
cd ../frontend
npm start &
 
# Wait for both processes to complete
wait
