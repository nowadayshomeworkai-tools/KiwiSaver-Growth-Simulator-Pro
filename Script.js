let chart;

function runSim() {

const age = parseInt(document.getElementById("age").value);
const balance = parseFloat(document.getElementById("balance").value);
const salary = parseFloat(document.getElementById("salary").value) || 0;
const business = parseFloat(document.getElementById("business").value) || 0;
const strategy = parseFloat(document.getElementById("strategy").value);

const incomeRatio = 1 - strategy;

const growthReturn = 0.07;
const incomeReturn = 0.035;

const contribution = (salary * 0.07) + (business * 0.035);

let value = balance;

const labels = [];
const data = [];

for (let i = age; i <= 90; i++) {
const r = (strategy * growthReturn) + (incomeRatio * incomeReturn);
value = value * (1 + r) + contribution;

```
labels.push(i);
data.push(Math.round(value));
```

}

document.getElementById("result").innerText =
"Final Value: $" + Math.round(value);

if (chart) chart.destroy();

chart = new Chart(document.getElementById("chart"), {
type: "line",
data: {
labels: labels,
datasets: [{
label: "Growth",
data: data
}]
}
});
}
