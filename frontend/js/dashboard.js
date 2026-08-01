
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

const saveTransactionButton =
  document.getElementById("save-transaction-btn");

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

transactionModal.addEventListener("click", function (event) {
  if (event.target === transactionModal) {
    transactionModal.hidden = true;
  }
});

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    transactionModal.hidden = true;
  }
});


const transactionForm =
  document.getElementById("transaction-form");

const totalRevenueElement =
  document.getElementById("total-revenue");

const totalExpensesElement =
  document.getElementById("total-expenses");

const netProfitElement =
  document.getElementById("net-profit");

const profitMarginElement =
  document.getElementById("profit-margin");

const descriptionInput =
  document.getElementById("transaction-description");

const categoryInput =
  document.getElementById("transaction-category");

const amountInput =
  document.getElementById("transaction-amount");

const typeInput =
  document.getElementById("transaction-type");

const dateInput =
  document.getElementById("transaction-date");

function updateSaveButton() {
  const formIsComplete =
    descriptionInput.value.trim() !== "" &&
    categoryInput.value.trim() !== "" &&
    amountInput.value.trim() !== "" &&
    typeInput.value !== "" &&
    dateInput.value !== "";

  saveTransactionButton.disabled = !formIsComplete;
}

descriptionInput.addEventListener("input", updateSaveButton);
categoryInput.addEventListener("input", updateSaveButton);
amountInput.addEventListener("input", updateSaveButton);
typeInput.addEventListener("change", updateSaveButton);
dateInput.addEventListener("change", updateSaveButton);

updateSaveButton();

const transactionsTableBody = document.getElementById(
  "transactions-table-body"
);

async function loadTransactions() {
  try {
    const response = await fetch(
      "http://localhost:8080/api/transactions"
    );

    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`);
    }

    const savedTransactions = await response.json();

    console.log("Saved transactions:", savedTransactions);

    renderTransactions(savedTransactions);

    function updateSummaryCards(transactions) {
  let totalRevenue = 0;
  let totalExpenses = 0;

  for (const transaction of transactions) {
    const amount = Number(transaction.amount);

    if (transaction.type === "Revenue") {
      totalRevenue += amount;
    } else if (transaction.type === "Expense") {
      totalExpenses += amount;
    }
  }

  const netProfit = totalRevenue - totalExpenses;

  let profitMargin = 0;

  if (totalRevenue !== 0) {
    profitMargin = (netProfit / totalRevenue) * 100;
  }

  totalRevenueElement.textContent =
    `$${totalRevenue.toLocaleString()}`;

  totalExpensesElement.textContent =
    `$${totalExpenses.toLocaleString()}`;

  netProfitElement.textContent =
    `$${netProfit.toLocaleString()}`;

  profitMarginElement.textContent =
    `${profitMargin.toFixed(1)}%`;
}
    updateSummaryCards(savedTransactions);

  } catch (error) {
    console.error("Could not load transactions:", error);
  }
}

function renderTransactions(transactions) {
  transactionsTableBody.innerHTML = "";

  transactions.forEach((transaction) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${transaction.date}</td>
      <td>${transaction.description}</td>
      <td>${transaction.category}</td>
      <td>${transaction.type}</td>
      <td>$${Number(transaction.amount).toLocaleString()}</td>
      <td>${transaction.status}</td>
    `;

    transactionsTableBody.appendChild(row);
  });
}

loadTransactions(); //gets the official data from the PostgreSQL

transactionForm.addEventListener("submit", async function (event) { //async lets to wait for a backend response 
  event.preventDefault();

  const transaction = {
  description: descriptionInput.value.trim(),
  category: categoryInput.value.trim(),
  amount: Number(amountInput.value),
  type: typeInput.value,
  date: dateInput.value,
  status: "Pending"
};

try {
  const response = await fetch(
    "http://localhost:8080/api/transactions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(transaction)
    }
  );

  if (!response.ok) {
    throw new Error("Could not create transaction");
  }

  const savedTransaction = await response.json();

  console.log("Backend response:", savedTransaction);
  await loadTransactions();

} catch (error) {
  console.error(error);
  alert("Transaction could not be saved.");
  return;
}

transactionForm.reset();
updateSaveButton();


transactionModal.hidden = true;
});

