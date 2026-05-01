let growthChart = null;
let pieChart = null;

let finalValue = 0;
let finalWithFees = 0;
let totalContribution = 0;

function runSim() {

try {

```
let age = Number(document.getElementById("age").value);
let balance = Number(document.getElementById("balance").value);

let salary = Number(document.getElementById("salary").value) || 0;
let business = Number(document.getElementById("business").value) || 0;

let strategy = Number(document.getElementById("strategy").value);
let incomeRatio = 1 - strategy;

let growthReturn = 0.07;
let incomeReturn = 0.035;
let fee = 0.01;

let years = 90 - age;

let yearlyContribution = (salary * 0.07) + (business * 0.035);
totalContribution = yearlyContribution * years;

let value = balance;
let valueFee = balance;

let labels = [];
let data = [];
let dataFee = [];

for (let i = 0; i <= years; i++) {

  let r = (strategy * growthReturn) + (incomeRatio * incomeReturn);

  value = value * (1 + r) + yearlyContribution;
  valueFee = valueFee * (1 + r - fee) + yearlyContribution;

  labels.push(age + i);
  data.push(Math.round(value));
  dataFee.push(Math.round(valueFee));
}

finalValue = Math.round(value);
finalWithFees = Math.round(valueFee);

document.getElementById("result").innerText =
  "No Fees: $" + finalValue + " | With Fees: $" + finalWithFees;

if (growthChart) growthChart.destroy();
if (pieChart) pieChart.destroy();

// Growth Chart
growthChart = new Chart(document.getElementById("growthChart"), {
  type: 'line',
  data: {
    labels: labels,
    datasets: [
      { label: 'No Fees', data: data },
      { label: 'With Fees', data: dataFee }
    ]
  }
});

// Pie Chart
pieChart = new Chart(document.getElementById("pieChart"), {
  type: 'pie',
  data: {
    labels: ['Growth', 'Income'],
    datasets: [{
      data: [strategy * 100, incomeRatio * 100]
    }]
  }
});
```

} catch (error) {
alert("Error: " + error.message);
}
}

function downloadReport() {

const { jsPDF } = window.jspdf;
let doc = new jsPDF();

doc.text("KiwiSaver Growth Report", 20, 20);
doc.text("Final Value (No Fees): $" + finalValue, 20, 40);
doc.text("Final Value (With Fees): $" + finalWithFees, 20, 50);

doc.text("Fee Impact: $" + (finalValue - finalWithFees), 20, 70);

doc.save("KiwiSaver_Report.pdf");
}
