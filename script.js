document.getElementById('addExpenseBtn').addEventListener('click', addExpense);

let totalExpense = 0;
let expenseData = [];
let expenseChart;

function addExpense() {
  const description = document.getElementById('expenseDescription').value;
  const amount = parseFloat(document.getElementById('expenseAmount').value);

  if (description === "" || isNaN(amount) || amount <= 0) {
    alert('Please enter a valid description and amount');
    return;
  }

  // Add to total expense
  totalExpense += amount;
  document.getElementById('totalAmount').innerText = `$${totalExpense.toFixed(2)}`;

  // Create new expense item
  const expenseItem = {
    description,
    amount,
  };

  expenseData.push(expenseItem);
  renderExpenseList();
  updateChart();
  resetForm();
}

// Function to reset the input fields
function resetForm() {
  document.getElementById('expenseDescription').value = '';
  document.getElementById('expenseAmount').value = '';
}

// Function to render the expense list
function renderExpenseList() {
  const expenseList = document.getElementById('expenseList');
  expenseList.innerHTML = '';

  expenseData.forEach((expense, index) => {
    const expenseItem = document.createElement('li');
    expenseItem.classList.add('expense-item');
    expenseItem.innerHTML = `
      <span><strong>${expense.description}</strong>: $${expense.amount.toFixed(2)}</span>
      <button onclick="editExpense(${index})">Edit</button>
      <button onclick="deleteExpense(${index})">Delete</button>
    `;
    expenseList.appendChild(expenseItem);
  });
}

// Function to edit an expense
function editExpense(index) {
  const expense = expenseData[index];
  document.getElementById('expenseDescription').value = expense.description;
  document.getElementById('expenseAmount').value = expense.amount;
  deleteExpense(index);
}

// Function to delete an expense
function deleteExpense(index) {
  totalExpense -= expenseData[index].amount;
  document.getElementById('totalAmount').innerText = `$${totalExpense.toFixed(2)}`;
  expenseData.splice(index, 1);
  renderExpenseList();
  updateChart();
}

// Function to update the chart
function updateChart() {
  if (expenseChart) {
    expenseChart.destroy();
  }

  const expenseLabels = expenseData.map(expense => expense.description);
  const expenseAmounts = expenseData.map(expense => expense.amount);

  const ctx = document.getElementById('expenseChart').getContext('2d');
  expenseChart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: expenseLabels,
      datasets: [{
        data: expenseAmounts,
        backgroundColor: ['#3498db', '#e74c3c', '#2ecc71', '#f39c12', '#8e44ad'],
      }],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
      },
    },
  });
}

