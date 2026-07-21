const chartCanvas = document.getElementById("financeChart");

const financeChart = new Chart(chartCanvas, {
  type: "line",

  data: {
    labels: ["January", "February", "March", "April", "May", "June"],

    datasets: [
     {
    label: "Revenue",
    data: [42000, 48000, 53000, 61000, 72000, 84500],
    borderColor: "#16a34a",
    backgroundColor: "rgba(22, 163, 74, 0.15)",
    borderWidth: 3,
    tension: 0.4,
    fill: true
     },
     {
    label: "Expenses",
    data: [30000, 32000, 39000, 41000, 47000, 52300],
    borderColor: "#dc2626",
    backgroundColor: "rgba(220, 38, 38, 0.15)",
    borderWidth: 3,
    tension: 0.4,
    fill: true
     }
    ]
  }
});