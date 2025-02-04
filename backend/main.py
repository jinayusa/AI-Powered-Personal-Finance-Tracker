from fastapi import FastAPI, HTTPException, Depends, Header
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import sqlite3
import bcrypt
import jwt
from jwt import encode, decode, ExpiredSignatureError, InvalidTokenError
import datetime
import random
import pandas as pd
import numpy as np
from sklearn.linear_model import LinearRegression

SECRET_KEY = "your_secret_key"

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Database
def initialize_database():
    conn = sqlite3.connect("expenses.db")
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE,
            password TEXT
        )
    ''')
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS expenses (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            amount REAL,
            category TEXT,
            date TEXT,
            FOREIGN KEY(user_id) REFERENCES users(id)
        )
    ''')
    conn.commit()
    conn.close()

initialize_database()

# Database Connection
def get_db_connection():
    conn = sqlite3.connect("expenses.db", check_same_thread=False)
    conn.row_factory = sqlite3.Row
    return conn

# User Schema
class User(BaseModel):
    username: str
    password: str

# Expense Schema
class Expense(BaseModel):
    amount: float
    category: str
    date: str

# Hash Password
def hash_password(password: str):
    return bcrypt.hashpw(password.encode(), bcrypt.gensalt()).decode()

# Verify Password
def verify_password(password: str, hashed: str):
    return bcrypt.checkpw(password.encode(), hashed.encode())

# Generate JWT Token
def create_jwt(user_id: int):
    payload = {"user_id": user_id, "exp": datetime.datetime.utcnow() + datetime.timedelta(days=1)}
    return encode(payload, SECRET_KEY, algorithm="HS256")

# User Registration
@app.post("/register/")
def register(user: User):
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        hashed_password = hash_password(user.password)
        cursor.execute("INSERT INTO users (username, password) VALUES (?, ?)", (user.username, hashed_password))
        conn.commit()
        conn.close()
        return {"message": "User registered successfully!"}
    except sqlite3.IntegrityError:
        raise HTTPException(status_code=400, detail="Username already exists!")

# User Login
@app.post("/login/")
def login(user: User):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT id, password FROM users WHERE username=?", (user.username,))
    result = cursor.fetchone()
    conn.close()
    if result and verify_password(user.password, result["password"]):
        token = create_jwt(result["id"])
        return {"token": token, "user_id": result["id"]}
    raise HTTPException(status_code=401, detail="Invalid credentials!")

# Authentication Dependency
def authenticate(authorization: str = Header(None)):
    if not authorization:
        raise HTTPException(status_code=401, detail="Authorization header missing")
    try:
        token = authorization.split(" ")[1]
        payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        return payload["user_id"]
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")

# Add Expense
@app.post("/add-expense/")
def add_expense(expense: Expense, user_id: int = Depends(authenticate)):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO expenses (user_id, amount, category, date) VALUES (?, ?, ?, ?)",
        (user_id, expense.amount, expense.category, expense.date),
    )
    conn.commit()
    conn.close()
    return {"message": "Expense added successfully!"}

# Get Expenses
@app.get("/expenses/{user_id}")
def get_expenses(user_id: int):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT id, amount, category, date FROM expenses WHERE user_id=?", (user_id,))
    data = cursor.fetchall()
    conn.close()
    return {"expenses": [{"id": row["id"], "amount": row["amount"], "category": row["category"], "date": row["date"]} for row in data]}

# Delete Expense
@app.delete("/delete-expense/{expense_id}")
def delete_expense(expense_id: int, user_id: int = Depends(authenticate)):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM expenses WHERE id=? AND user_id=?", (expense_id, user_id))
    conn.commit()
    conn.close()
    return {"message": "Expense deleted successfully!"}

# Run FastAPI
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)