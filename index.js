document.addEventListener('DOMContentLoaded', () => {
    const expenseForm = document.getElementById('expense-form');
    const expenseList = document.getElementById('expense-list');
    const resetBtn = document.getElementById('reset-btn');
  
    // Function to fetch and display expenses from localStorage
    const fetchExpenses = () => {
      const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
      expenseList.innerHTML = '';
  
      expenses.forEach((expense, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
          <span>${expense.description} - $${expense.amount} on ${expense.date}</span>
          <button class="delete-btn" data-index="${index}">Delete</button>
        `;
        expenseList.appendChild(li);
      });
    };
  
    // Add an expense
    expenseForm.addEventListener('submit', (e) => {
      e.preventDefault();
  
      const description = document.getElementById('description').value;
      const amount = document.getElementById('amount').value;
      const date = document.getElementById('date').value;
  
      if (!description || !amount || !date) {
        alert('Please fill in all fields!');
        return;
      }
  
      const newExpense = { description, amount, date };
      const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
      expenses.push(newExpense);
      localStorage.setItem('expenses', JSON.stringify(expenses));
  
      fetchExpenses(); // Reload expenses list
      expenseForm.reset(); // Clear the form
    });
  
    // Delete an expense
    expenseList.addEventListener('click', (e) => {
      if (e.target.classList.contains('delete-btn')) {
        const index = e.target.dataset.index;
        const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
        expenses.splice(index, 1); // Remove expense from array
        localStorage.setItem('expenses', JSON.stringify(expenses));
  
        fetchExpenses(); // Reload expenses list
      }
    });
  
    // Reset all expenses
    resetBtn.addEventListener('click', () => {
      if (confirm('Are you sure you want to reset all expenses?')) {
        localStorage.removeItem('expenses'); // Clear all expenses from localStorage
        fetchExpenses(); // Reload expenses list (it will be empty)
      }
    });
  
    fetchExpenses(); // Initial load of expenses
  });