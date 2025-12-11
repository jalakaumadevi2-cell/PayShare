const addBtn = document.getElementById('addBtn');
const descInput = document.getElementById('desc');
const amountInput = document.getElementById('amount');
const contributorsInput = document.getElementById('contributors');
const expenseTable = document.querySelector('#expenseTable tbody');
const balancesDiv = document.getElementById('balances');

let expenses = [];

// Add expense
addBtn.addEventListener('click', () => {
    const desc = descInput.value.trim();
    const amount = parseFloat(amountInput.value);
    const contributors = contributorsInput.value.split(',').map(c => c.trim()).filter(c => c);

    if (!desc || !amount || contributors.length === 0) return alert("Fill all fields correctly!");

    expenses.push({ desc, amount, contributors });
    updateTable();
    descInput.value = '';
    amountInput.value = '';
    contributorsInput.value = '';
});

// Update table and summary
function updateTable() {
    expenseTable.innerHTML = '';
    balancesDiv.innerHTML = '';

    let balances = {};

    expenses.forEach((exp, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${exp.desc}</td>
            <td>${exp.amount.toFixed(2)}</td>
            <td>${exp.contributors.join(', ')}</td>
            <td><button onclick="deleteExpense(${index})">Delete</button></td>
        `;
        expenseTable.appendChild(row);

        const share = exp.amount / exp.contributors.length;
        exp.contributors.forEach(name => {
            balances[name] = (balances[name] || 0) + share;
        });
    });

    for (let person in balances) {
        const p = document.createElement('p');
        p.textContent = `${person}: ₹${balances[person].toFixed(2)}`;
        balancesDiv.appendChild(p);
    }
}

// Delete expense
function deleteExpense(index) {
    expenses.splice(index, 1);
    updateTable();
}
