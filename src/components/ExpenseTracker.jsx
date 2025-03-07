import { useState, useEffect } from "react";
import ExpenseForm from "./ExpenseForm";
import ExpenseList from "./ExpenseList";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const ExpenseTracker = () => {
  const [expenses, setExpenses] = useState([]);
  const [filterDate, setFilterDate] = useState("");

  // Load saved expenses from Local Storage when the app starts
  useEffect(() => {
    const savedExpenses = JSON.parse(localStorage.getItem("expenses"));
    if (savedExpenses) {
      setExpenses(savedExpenses);
    }
  }, []);

  // Save expenses to Local Storage whenever expenses change
  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  const addExpense = (expense) => {
    setExpenses([...expenses, expense]);
  };

  const deleteExpense = (index) => {
    const newExpenses = expenses.filter((_, i) => i !== index);
    setExpenses(newExpenses);
  };

  // Function to download expenses as an Excel file
  const downloadExpensesExcel = () => {
    let data = filterDate
      ? expenses.filter((expense) => expense.date.startsWith(filterDate))
      : expenses;

    if (data.length === 0) {
      alert("No expenses available for download!");
      return;
    }

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Expenses");

    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const excelFile = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8" });

    saveAs(excelFile, "expenses.xlsx");
  };

  return (
    <div className="expense-tracker">
      <h2>Expense Tracker</h2>

      <div className="form-filter-container">
        <div className="expense-form">
          <ExpenseForm addExpense={addExpense} />
        </div>

        <div className="filter">
          <h3>Filter by Date</h3>
          <input 
            type="month" 
            value={filterDate} 
            onChange={(e) => setFilterDate(e.target.value)} 
          />
        </div>
      </div>

      <div className="total">
        <h3>Total: ₹{expenses.reduce((acc, expense) => acc + expense.amount, 0).toFixed(2)}</h3>
      </div>

      <button onClick={downloadExpensesExcel} className="download-btn">📥 Download Your Report</button>

      <ExpenseList expenses={expenses} deleteExpense={deleteExpense} />
    </div>
  );
};

export default ExpenseTracker;
