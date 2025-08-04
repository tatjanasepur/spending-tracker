let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

const form = document.getElementById('expense-form');
const list = document.getElementById('expense-list');
const chartCanvas = document.getElementById('expense-chart');

form.addEventListener('submit', e => {
  e.preventDefault();
  const desc = document.getElementById('desc').value;
  const amount = parseFloat(document.getElementById('amount').value);
  const category = document.getElementById('category').value;

  expenses.push({ desc, amount, category });
  localStorage.setItem('expenses', JSON.stringify(expenses));
  form.reset();
  renderList();
  renderChart();
});

function renderList() {
  list.innerHTML = '';
  expenses.forEach((e, i) => {
    const li = document.createElement('li');
    li.textContent = `${e.desc} - ${e.amount.toFixed(2)} RSD (${e.category})`;
    list.appendChild(li);
  });
}

function renderChart() {
  const categorySums = {};
  expenses.forEach(e => {
    categorySums[e.category] = (categorySums[e.category] || 0) + e.amount;
  });

  const data = {
    labels: Object.keys(categorySums),
    datasets: [{
      data: Object.values(categorySums),
      backgroundColor: ['#ffc9d0', '#e6a6af', '#c997a0', '#b76e79']
    }]
  };

  if (window.expenseChart) window.expenseChart.destroy();

  window.expenseChart = new Chart(chartCanvas, {
    type: 'pie',
    data
  });
}

renderList();
renderChart();
