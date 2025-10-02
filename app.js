let expenses = [];
const form = document.getElementById('expense-form');
const tableBody = document.querySelector('#expense-table tbody');

const pieCtx = document.getElementById('pieChart');
const barCtx = document.getElementById('barChart');
let pieChart, barChart;

function renderTable() {
  tableBody.innerHTML = '';
  expenses.forEach((e, i) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${e.desc}</td>
      <td>${e.amount}</td>
      <td>${e.date}</td>
      <td>${e.category}</td>
      <td><button onclick="deleteExpense(${i})">Delete</button></td>`;
    tableBody.appendChild(tr);
  });
}

function renderCharts() {
  const categoryTotals = {};
  expenses.forEach(e => {
    categoryTotals[e.category] = (categoryTotals[e.category] || 0) + parseFloat(e.amount);
  });
  const labels = Object.keys(categoryTotals);
  const data = Object.values(categoryTotals);

  if (pieChart) pieChart.destroy();
  pieChart = new Chart(pieCtx, {
    type: 'pie',
    data: {
      labels,
      datasets: [{ 
        data, 
        backgroundColor: ['#f87171','#60a5fa','#34d399','#fbbf24','#a78bfa'] 
      }]
    },
    options: { responsive: true, plugins: { legend: { position: 'bottom' } } }
  });

  if (barChart) barChart.destroy();
  barChart = new Chart(barCtx, {
    type: 'bar',
    data: { 
      labels, 
      datasets: [{ label: 'Expenses', data, 
        backgroundColor: '#60a5fa' }] 
    },
    options: { responsive: true, scales: { y: { beginAtZero: true } } }
  });
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const desc = document.getElementById('desc').value;
  const amount = document.getElementById('amount').value;
  const date = document.getElementById('date').value;
  const category = document.getElementById('category').value;
  
  expenses.push({ desc, amount, date, category });
  form.reset();
  renderTable();
  renderCharts();
});

function deleteExpense(index) {
  expenses.splice(index, 1);
  renderTable();
  renderCharts();
}