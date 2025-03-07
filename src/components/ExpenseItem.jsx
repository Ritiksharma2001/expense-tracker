const ExpenseItem = ({ expense, index, deleteExpense }) => {
    return (
      <li>
        {expense.title} - ₹{expense.amount}
        <button onClick={() => deleteExpense(index)}>❌</button>
      </li>
    );
  };
  
  export default ExpenseItem;
  