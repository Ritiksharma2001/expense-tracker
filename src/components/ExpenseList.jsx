const ExpenseList = ({ expenses, deleteExpense }) => {
  return (
    <div className="expense-list">
      <h3>Expenses</h3>
      {expenses.length > 0 ? (
        <ul>
          {expenses.map((expense, index) => (
            <li key={index} className="expense-item">
              <span>{expense.title} - ₹{expense.amount} on {expense.date}</span>
              <button onClick={() => deleteExpense(index)}>❌</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No expenses found.</p>
      )}
    </div>
  );
};

export default ExpenseList;
