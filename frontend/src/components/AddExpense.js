import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";

const AddExpense = ({ addExpense, fetchExpenses, setError }) => {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = async () => {
    const expenseAmount = parseFloat(amount);
    if (isNaN(expenseAmount) || expenseAmount <= 0) {
      setError("Please enter a valid amount.");
      return;
    }

    if (!category.trim()) {
      setError("Please enter a valid category.");
      return;
    }

    try {
      await addExpense(expenseAmount, category);
      fetchExpenses();
      setAmount("");
      setCategory("");
    } catch (error) {
      setError("Error adding expense.");
    }
  };

  return (
    <div className="card">
      <h2>
        <FaPlus /> Add Expense
      </h2>
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="input-field"
      />
      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="input-field"
      />
      <button onClick={handleSubmit} className="button">
        <FaPlus /> Add Expense
      </button>
    </div>
  );
};

export default AddExpense;
