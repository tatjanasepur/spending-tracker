const form = document.getElementById('expense-form');
const descInput = document.getElementById('desc');
const amountInput = document.getElementById('amount');
const categorySelect = document.getElementById('category');
const expenseList = document.getElementById('expense-list');
const summaryList = document.getElementById('summary-list');

let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

function saveExpenses() {
  localStorage.setItem('expenses', JSON.stringify(expenses));
}

function renderExpenses() {
  expenseList.innerHTML = '';
  expenses.forEach((exp, i) => {
    const li = document.createElement('li');
    li.textContent = `${exp.description} - ${exp.amount.toFixed(2)} RSD (${exp.category})`;
    expenseList.appendChild(li);
  });
}

function renderSummary() {
  const totals = {};
  expenses.forEach(exp => {
    totals[exp.category] = (totals[exp.category] || 0) + exp.amount;
  });
  summaryList.innerHTML = '';
  for (const cat in totals) {
    const li = document.createElement('li');
    li.textContent = `${cat}: ${totals[cat].toFixed(2)} RSD`;
    summaryList.appendChild(li);
  }
}

form.addEventListener('submit', e => {
  e.preventDefault();
  const desc = descInput.value.trim();
  const amount = parseFloat(amountInput.value);
  const category = categorySelect.value;

  if (!desc || isNaN(amount) || amount <= 0) return;

  expenses.push({ description: desc, amount, category });
  saveExpenses();
  renderExpenses();
  renderSummary();

  descInput.value = '';
  amountInput.value = '';
  categorySelect.value = 'Food';
});

renderExpenses();
renderSummary();
