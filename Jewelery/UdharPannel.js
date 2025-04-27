document.addEventListener("DOMContentLoaded", loadTable);

function addRow(data = {}) {
    let table = document.getElementById("udhaarTable").getElementsByTagName("tbody")[0];
    let rowCount = table.rows.length;
    let newRow = table.insertRow();

    for (let i = 0; i < 17; i++) {
        let cell = newRow.insertCell(i);

        // Row Number
        if (i === 0) {
            cell.innerHTML = rowCount + 1;

        // User Type Dropdown (Index 4)
        } else if (i === 4) {
            let select = document.createElement("select");
            let options = ["Admin", "Customer", "Supplier"]; // Example user types
            options.forEach(optionText => {
                let option = document.createElement("option");
                option.value = optionText;
                option.textContent = optionText;
                select.appendChild(option);
            });
            cell.appendChild(select);

        // Udhaar Type Dropdown (Index 6)
        } else if (i === 6) {
            let select = document.createElement("select");
            let options = ["Cash", "Credit", "Installment"]; // Example Udhaar types
            options.forEach(optionText => {
                let option = document.createElement("option");
                option.value = optionText;
                option.textContent = optionText;
                select.appendChild(option);
            });
            cell.appendChild(select);

        // Transaction Type Dropdown (Index 8)
        } else if (i === 8) {
            let select = document.createElement("select");
            let options = ["Debit", "Credit", "Refund"]; // Example transaction types
            options.forEach(optionText => {
                let option = document.createElement("option");
                option.value = optionText;
                option.textContent = optionText;
                select.appendChild(option);
            });
            cell.appendChild(select);

        // Delete Button (Index 16)
        } else if (i === 16) {
            let deleteBtn = document.createElement("button");
            deleteBtn.innerText = "❌";
            deleteBtn.onclick = function () {
                alert("Are you sure to delete this row?");
                deleteRow(newRow);
            };
            cell.appendChild(deleteBtn);

        // Input Fields for Other Columns
        } else {
            let input = document.createElement("input");
            input.type = (i === 1) ? "date" : "text";
            input.placeholder = "Enter";
            input.required = true; // Making all fields required

            if (i === 2) { // Invoice Number Validation
                input.pattern = "^[a-zA-Z0-9-]+$";  // Accept alphanumeric characters and hyphen
                input.placeholder = "Invoice Number";
                input.required = true;
            }

            if (i === 3) { // Mobile Number Validation
                input.type = "tel";
                input.placeholder = "Mobile Number";
                input.pattern = "^\\d{10}$"; // Validates exactly 10 digits
                input.required = true;
            }

            if (i === 9 || i === 10 || i === 11 || i === 12 || i === 13) { // Cash, Bank, Cheque, Online, Deposit Amount
                input.type = "number";
                input.placeholder = "Amount";
                input.step = "0.01"; // Allow decimal amounts
                input.min = "0"; // Prevent negative values
                input.required = true;
                input.setAttribute("oninput", "updateLeftAmount(this)");
            }

            if (i === 15) {
                input.type = "number";
                input.placeholder = "Remaining Amount";
                input.readOnly = true;
            }

            if (data[i] !== undefined) input.value = data[i];
            input.addEventListener("input", saveTable);
            cell.appendChild(input);
        }
    }
    saveTable();
}

function updateLeftAmount(input) {
    let row = input.closest("tr");
    let udhaarAmount = parseFloat(row.cells[9].querySelector("input").value) || 0;
    let totalPaid = Array.from(row.cells).slice(10, 15)
        .reduce((sum, cell) => sum + (parseFloat(cell.querySelector("input").value) || 0), 0);
    row.cells[15].querySelector("input").value = (udhaarAmount - totalPaid).toFixed(2);
    saveTable();
}

function saveTable() {
    let table = document.getElementById("udhaarTable").getElementsByTagName("tbody")[0];
    let rows = table.rows;
    let data = [];

    for (let i = 0; i < rows.length; i++) {
        let row = rows[i];
        let rowData = [];
        for (let j = 0; j < 16; j++) {
            if (j === 0) {
                rowData.push(i + 1);
            } else {
                rowData.push(row.cells[j].querySelector("input").value);
            }
        }
        data.push(rowData);
    }
    localStorage.setItem("udhaarData", JSON.stringify(data));
}

function loadTable() {
    let savedData = localStorage.getItem("udhaarData");
    let table = document.getElementById("udhaarTable").getElementsByTagName("tbody")[0];

    table.innerHTML = ""; // Clear table before reloading saved data
    if (savedData) {
        let tableData = JSON.parse(savedData);
        tableData.forEach(rowData => addRow(rowData));
    }

    if (table.rows.length === 0) {
        addRow(); // Ensure at least one row exists
    }
}

function deleteRow(row) {
    let table = document.getElementById("udhaarTable").getElementsByTagName("tbody")[0];
    if (table.rows.length > 1) {
        row.remove();
        updateRowNumbers();
        saveTable();
    } else {
        alert("At least one row is required.");
    }
}

function updateRowNumbers() {
    let table = document.getElementById("udhaarTable").getElementsByTagName("tbody")[0];
    for (let i = 0; i < table.rows.length; i++) {
        table.rows[i].cells[0].innerText = i + 1;
    }
}

let saveButton = document.getElementsByClassName("saveButton")[0];

if (saveButton) {  // Check if the element exists to avoid errors
    saveButton.addEventListener("click", function() {
        alert("Saved Successfully");
    });
}
