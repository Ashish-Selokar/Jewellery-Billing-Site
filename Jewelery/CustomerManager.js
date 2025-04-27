function addCustomer() {
    const customerName = document.getElementById('customerName').value.trim();
    const customerAddress = document.getElementById('customerAddress').value.trim();
    const customerAge = document.getElementById('customerAge').value.trim();
    const customerPhotoInput = document.getElementById('customerPhoto');

    if (!customerName || !customerAddress || !customerAge) {
        alert('Please fill out all fields.');
        return;
    }

    const customerList = document.getElementById('customerList');
    const listItem = document.createElement('li');

    const customerPhoto = customerPhotoInput.files[0];
    let photoURL = '';

    if (customerPhoto) {
        photoURL = URL.createObjectURL(customerPhoto);
    }

    listItem.innerHTML = `
        <img src="${photoURL}" alt="Customer Photo" class="customer-photo">
        <strong>Name:</strong> <span class="name">${customerName}</span><br>
        <strong>Address:</strong> <span class="address">${customerAddress}</span><br>
        <strong>Age:</strong> <span class="age">${customerAge}</span>
    `;

    const actionsDiv = document.createElement('div');
    actionsDiv.classList.add('action-buttons');

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.classList.add('edit-button');
    editButton.onclick = () => editCustomer(listItem);

    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.classList.add('remove-button');
    removeButton.onclick = () => customerList.removeChild(listItem);

    actionsDiv.appendChild(editButton);
    actionsDiv.appendChild(removeButton);
    listItem.appendChild(actionsDiv);
    customerList.appendChild(listItem);

    clearForm();
}

function editCustomer(listItem) {
    const name = listItem.querySelector('.name').textContent;
    const address = listItem.querySelector('.address').textContent;
    const age = listItem.querySelector('.age').textContent;

    document.getElementById('customerName').value = name;
    document.getElementById('customerAddress').value = address;
    document.getElementById('customerAge').value = age;

    listItem.remove();
}

function clearForm() {
    document.getElementById('customerName').value = '';
    document.getElementById('customerAddress').value = '';
    document.getElementById('customerAge').value = '';
    document.getElementById('customerPhoto').value = '';
}


async function fetchCountries() {
    const response = await fetch("https://countriesnow.space/api/v0.1/countries");
    const data = await response.json();

    let countryDropdown = document.getElementById("countryDropdown");

    // Populate country dropdown
    data.data.forEach(country => {
        let option = document.createElement("option");
        option.value = country.country;
        option.textContent = country.country;
        countryDropdown.appendChild(option);
    });
}

// Fetch and populate state dropdown based on selected country
async function fetchStates() {
    let country = document.getElementById("countryDropdown").value;
    if (!country) return;

    let response = await fetch("https://countriesnow.space/api/v0.1/countries/states", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ country: country })
    });

    let data = await response.json();
    let stateDropdown = document.getElementById("stateDropdown");

    // Clear previous states
    stateDropdown.innerHTML = "<option value=''>Select State</option>";

    // Populate state dropdown
    data.data.states.forEach(state => {
        let option = document.createElement("option");
        option.value = state.name;
        option.textContent = state.name;
        stateDropdown.appendChild(option);
    });
}

// Fetch and populate city dropdown based on selected state
async function fetchCities() {
    let country = document.getElementById("countryDropdown").value;
    let state = document.getElementById("stateDropdown").value;
    if (!country || !state) return;

    let response = await fetch("https://countriesnow.space/api/v0.1/countries/state/cities", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ country: country, state: state })
    });

    let data = await response.json();
    let cityDropdown = document.getElementById("cityDropdown");

    // Clear previous cities
    cityDropdown.innerHTML = "<option value=''>Select City</option>";

    // Populate city dropdown
    data.data.forEach(city => {
        let option = document.createElement("option");
        option.value = city;
        option.textContent = city;
        cityDropdown.appendChild(option);
    });
}

// Load countries when page loads
fetchCountries();




document.addEventListener("DOMContentLoaded", function () {
    createCustomerTable(); // Ensure table structure is created on page load
});

function addCustomer() {
    // Fetch input values
    const mobileNumber = document.querySelector("input[placeholder='Mobile Number']").value.trim();
    const gender = document.getElementById("Gender").value;
    const firstName = document.querySelector("input[placeholder='First Name']").value.trim();
    const fatherName = document.querySelector("input[placeholder='Father Name']").value.trim();
    const lastName = document.querySelector("input[placeholder='Last Name']").value.trim();
    const email = document.querySelector("input[placeholder='EMAIL ID']").value.trim();
    const country = document.getElementById("countryDropdown").value;
    const state = document.getElementById("stateDropdown").value;
    const city = document.getElementById("cityDropdown").value;
    const pinCode = document.getElementById("pinCodeInput").value.trim();
    const address = document.querySelector("input[placeholder='Residential Address']").value.trim();
    const gstNumber = document.querySelector("input[placeholder='GST Number']").value.trim();
    const panNumber = document.querySelector("input[placeholder='PAN Number']").value.trim();
    const aadhaarNumber = document.querySelector("input[placeholder='Adhaar Card Number']").value.trim();

    // Validate required fields
    if (!firstName || !email || !mobileNumber) {
        alert("Please fill in required fields: First Name, Email, and Mobile Number.");
        return;
    }

    // Get the customer table
    const table = document.getElementById("customerTable").getElementsByTagName("tbody")[0];

    // Create a new row
    const newRow = table.insertRow();

    // Add customer details in table row
    newRow.innerHTML = `
        <td>${gender} ${firstName} ${lastName}</td>
        <td>${fatherName}</td>
        <td>${mobileNumber}</td>
        <td>${email}</td>
        <td>${address}, ${city}, ${state}, ${country} - ${pinCode}</td>
        <td>${gstNumber}</td>
        <td>${panNumber}</td>
        <td>${aadhaarNumber}</td>
        <td><button class="remove-button" onclick="removeCustomer(this)">Remove</button></td>
    `;

    // Clear form inputs
    clearForm();
}

// Function to remove a customer from the table
function removeCustomer(button) {
    const row = button.parentElement.parentElement;
    row.remove();
}

// Function to clear form fields after adding a customer
function clearForm() {
    document.querySelectorAll(".form-group input, .form-group select").forEach(input => {
        input.value = "";
    });
}

// Function to create the table structure if not present
function createCustomerTable() {
    const container = document.querySelector(".stored-info");
    const table = document.createElement("table");
    table.id = "customerTable";
    table.innerHTML = `
        <thead>
            <tr>
                <th>Name</th>
                <th>Father Name</th>
                <th>Mobile</th>
                <th>Email</th>
                <th>Address</th>
                <th>GST Number</th>
                <th>PAN Number</th>
                <th>Aadhaar Number</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody></tbody>
    `;
    container.appendChild(table);
}




function createCustomerTable() {
    const container = document.querySelector(".storedinfo");
    const tableContainer = document.getElementById("customerTableContainer");
    
    // Ensure table is created only once
    if (!document.getElementById("customerTable")) {
        const table = document.createElement("table");
        table.id = "customerTable";
        table.innerHTML = `
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Father Name</th>
                    <th>Mobile</th>
                    <th>Email</th>
                    <th>Address</th>
                    <th>GST Number</th>
                    <th>PAN Number</th>
                    <th>Aadhaar Number</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody></tbody>
        `;
        tableContainer.appendChild(table);
    }
}



document.addEventListener("DOMContentLoaded", function () {
    restoreFormData(); // Load saved form data when the page loads

    // Attach event listeners to save data on input change
    document.querySelectorAll(".form-group input, .form-group select").forEach(input => {
        input.addEventListener("input", saveFormData);
        input.addEventListener("change", saveFormData);
    });
});

// Function to Save Form Data in localStorage
function saveFormData() {
    let formData = {};

    document.querySelectorAll(".form-group input, .form-group select").forEach(input => {
        formData[input.id] = input.value; // Save each input's value using its ID
    });

    localStorage.setItem("customerFormData", JSON.stringify(formData));
}

// Function to Restore Form Data from localStorage
function restoreFormData() {
    let savedData = localStorage.getItem("customerFormData");

    if (savedData) {
        savedData = JSON.parse(savedData);

        document.querySelectorAll(".form-group input, .form-group select").forEach(input => {
            if (savedData[input.id]) {
                input.value = savedData[input.id]; // Restore the saved value
            }
        });
    }
}
