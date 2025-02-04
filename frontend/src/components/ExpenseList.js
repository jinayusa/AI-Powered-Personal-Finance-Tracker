import React from "react";
import { FaListUl, FaTrash, FaSpinner } from "react-icons/fa";

const ExpenseList = ({ expenses, deleteExpense, loading }) => {
  return (
    <div className="card">
      <h2>
        <FaListUl /> Expense List
      </h2>
      {loading ? (
        <div className="loading-spinner">
          <FaSpinner />
        </div>
      ) : (
        <ul className="expense-list">
          {expenses.length === 0 ? (
            <p className="text-gray-500 text-center">No expenses recorded.</p>
          ) : (
            expenses.map((exp, index) => (
              <li key={exp.id || index} className="expense-item">
                <span className="expense-amount">${exp.amount}</span>
                <span className="expense-category">{exp.category}</span>
                <span className="expense-date">{exp.date}</span>
                <button className="delete-button" onClick={() => deleteExpense(exp.id)}>
                  <FaTrash />
                </button>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
};

export default ExpenseList;