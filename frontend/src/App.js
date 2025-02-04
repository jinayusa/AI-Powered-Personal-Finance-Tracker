import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./components/Navbar";
import AddExpense from "./components/AddExpense";
import ExpenseList from "./components/ExpenseList";
import Login from "./components/Login";
import Register from "./components/Register";
import "./style.css";

const App = () => {
  const [expenses, setExpenses] = useState([]);
  const [userId, setUserId] = useState(localStorage.getItem("user_id") || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch expenses when user logs in
  useEffect(() => {
    if (userId) {
      fetchExpenses();
    }
  }, [userId]);

  // Function to fetch expenses for the logged-in user
  const fetchExpenses = async () => {
    if (!userId) return;
    setLoading(true);
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(`http://localhost:8000/expenses/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setExpenses(response.data.expenses);
    } catch (error) {
      console.error("Error fetching expenses:", error.response ? error.response.data : error);
      setError("Error fetching expenses.");
    }
    setLoading(false);
  };

  // Function to add a new expense
  const addExpense = async (amount, category) => {
    if (!amount || !category) {
      setError("Please fill in all fields.");
      return;
    }
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Unauthorized: Please log in.");
      return;
    }
    try {
      await axios.post(
        "http://localhost:8000/add-expense/",
        {
          amount: parseFloat(amount),
          category,
          date: new Date().toISOString().split("T")[0],
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchExpenses();
    } catch (error) {
      console.error("Error adding expense:", error.response ? error.response.data : error);
      setError("Failed to add expense.");
    }
  };

  // Function to delete an expense
  const deleteExpense = async (expenseId) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`http://localhost:8000/delete-expense/${expenseId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchExpenses();
    } catch (error) {
      console.error("Error deleting expense:", error.response ? error.response.data : error);
      setError("Failed to delete expense.");
    }
  };

  return (
    <Router>
      <Navbar userId={userId} setUserId={setUserId} />
      <Routes>
        {/* Redirect logged-in users from login page to home */}
        <Route path="/login" element={userId ? <Navigate to="/" /> : <Login setUserId={setUserId} />} />
        <Route path="/register" element={userId ? <Navigate to="/" /> : <Register />} />
        {userId ? (
          <Route
            path="/"
            element={
              <>
                <AddExpense addExpense={addExpense} fetchExpenses={fetchExpenses} setError={setError} />
                <ExpenseList expenses={expenses} deleteExpense={deleteExpense} loading={loading} />
              </>
            }
          />
        ) : (
          <Route path="/" element={<Navigate to="/login" />} />
        )}
      </Routes>
    </Router>
  );
};

export default App;
