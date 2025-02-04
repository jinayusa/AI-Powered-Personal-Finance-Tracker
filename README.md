# AI-Powered Personal Finance Tracker

## Overview
AI-Powered Personal Finance Tracker is a web application that helps users track their expenses, categorize them using AI, and gain insights into their spending patterns. This version (V1) includes user authentication, expense tracking, and basic AI-based categorization.

## Tech Stack
### Frontend:
- React.js (UI & Expense Dashboard)
- Axios (API Calls)
- React Router (Navigation)

### Backend:
- FastAPI (API Development)
- SQLite (Database for storing users and expenses)
- Pandas, Scikit-learn (For future AI/ML enhancements)
- Bcrypt & JWT (User authentication and security)

## Features
✅ User Authentication (Register/Login)  
✅ Add and View Expenses  
✅ AI-Based Expense Categorization (Basic)  
✅ Expense Dashboard (React.js)  
✅ SQLite Database for Persistence  

## Installation Guide

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/ai-finance-tracker.git
cd ai-finance-tracker
```

### 2️⃣ Backend Setup (FastAPI)
#### Install dependencies:
```bash
pip install -r requirements.txt
```
#### Run the FastAPI server:
```bash
uvicorn main:app --reload
```
FastAPI will run on `http://127.0.0.1:8000`

### 3️⃣ Frontend Setup (React.js)
#### Navigate to the frontend directory:
```bash
cd frontend
```
#### Install dependencies:
```bash
npm install
```
#### Start React frontend:
```bash
npm start
```
React.js will run on `http://localhost:3000`

## API Endpoints
### User Authentication
- `POST /register/` → Register a new user
- `POST /login/` → Login and receive JWT token

### Expense Management
- `POST /add-expense/` → Add a new expense
- `GET /expenses/{user_id}` → Fetch expenses for a user
- `POST /predict-category/` → AI-Based Expense Categorization (Basic)

## Future Enhancements (Version 2)
✅ **AI Model for Expense Prediction** (Instead of random categorization)  
✅ **Charts & Analytics Dashboard** (Using Chart.js)  
✅ **User Authentication in React (JWT)**  
✅ **Bank API Integration for Automated Expense Tracking**  

## Contributing
Feel free to submit pull requests and suggest new features!

## License
This project is licensed under the MIT License.

## How to Contribute
1. Fork the repository
2. Create a new branch (`git checkout -b feature-branch`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature-branch`)
5. Create a Pull Request
## Demo credentials
a@a.a
123456
---

### 🚀 Happy Coding! 🚀
