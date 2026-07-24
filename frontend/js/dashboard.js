const chartCanvas = document.getElementById("financeChart");

const revenue = [42000, 48000, 53000, 61000, 72000, 84500]; //easy then to replace with backend
const expenses = [30000, 32000, 39000, 41000, 47000, 52300];
const financeChart = new Chart(chartCanvas, {
  type: "line",

  data: {
    labels: ["January", "February", "March", "April", "May", "June"],

    datasets: [
     {
    label: "Revenue",
    data: revenue,
    borderColor: "#16a34a",
    backgroundColor: "rgba(22, 163, 74, 0.15)",
    borderWidth: 3,
    tension: 0.4,
    fill: true
     },
     {
    label: "Expenses",
    data: expenses,
    borderColor: "#dc2626",
    backgroundColor: "rgba(220, 38, 38, 0.15)",
    borderWidth: 3,
    tension: 0.4,
    fill: true
     }
    ]
  }
});
const addTransactionButton =
  document.getElementById("add-transaction-btn");

const closeModalButton =
  document.getElementById("close-modal-btn");

const transactionModal =
  document.getElementById("transaction-modal");

addTransactionButton.addEventListener("click", function () {
  transactionModal.hidden = false;
});

closeModalButton.addEventListener("click", function () {
  transactionModal.hidden = true;
});
const transactionForm =
  document.getElementById("transaction-form");

const transactionTableBody =
  document.querySelector(".transactions-section tbody");

const totalRevenueElement =
  document.getElementById("total-revenue");

const totalExpensesElement =
  document.getElementById("total-expenses");

const netProfitElement =
  document.getElementById("net-profit");

const profitMarginElement =
  document.getElementById("profit-margin");

let totalRevenue = 84500;
let totalExpenses = 52300;

transactionForm.addEventListener("submit", function (event) {
  event.preventDefault();

const categoryInput =
  document.getElementById("transaction-category");

const dateInput =
  document.getElementById("transaction-date");  

  const descriptionInput =
    document.getElementById("transaction-description");

  const amountInput =
    document.getElementById("transaction-amount");

  const typeInput =
    document.getElementById("transaction-type");

  const newRow = document.createElement("tr");

 const formattedDate = new Date(
  `${dateInput.value}T00:00:00`
).toLocaleDateString("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric"
});

newRow.innerHTML = `
  <td>${formattedDate}</td>
  <td>${descriptionInput.value}</td>
  <td>${categoryInput.value}</td>
  <td>${typeInput.value}</td>
  <td>$${Number(amountInput.value).toLocaleString()}</td>
  <td>Pending</td>
`;

transactionTableBody.prepend(newRow);

const amount = Number(amountInput.value);

if (typeInput.value === "Revenue") {
  totalRevenue += amount;
} else {
  totalExpenses += amount;
}

const netProfit = totalRevenue - totalExpenses;

const profitMargin =
  totalRevenue === 0
    ? 0
    : (netProfit / totalRevenue) * 100;

totalRevenueElement.textContent =
  `$${totalRevenue.toLocaleString()}`;

totalExpensesElement.textContent =
  `$${totalExpenses.toLocaleString()}`;

netProfitElement.textContent =
  `$${netProfit.toLocaleString()}`;

profitMarginElement.textContent =
  `${profitMargin.toFixed(1)}%`;

transactionForm.reset();

transactionModal.hidden = true;
});