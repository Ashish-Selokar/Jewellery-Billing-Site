let items = [];
let totalAmount = 0;
let discount = 0;
let gst = 0;
let shippingCharges = 0;

document.getElementById('add-item-to-bill').addEventListener('click', addItemToBill);
document.getElementById('finalize-bill').addEventListener('click', finalizeBill);
document.getElementById('apply-coupon').addEventListener('click', applyCoupon);
document.getElementById('close-modal').addEventListener('click', closeModal);
document.getElementById('print-bill').addEventListener('click', printBill);

function addItemToBill() {
    const name = document.getElementById('item-name').value;
    const price = parseFloat(document.getElementById('item-price').value);
    const quantity = parseInt(document.getElementById('item-quantity').value);

    if (!name || isNaN(price) || isNaN(quantity) || price <= 0 || quantity <= 0) {
        alert('Please enter valid item details.');
        return;
    }

    const total = price * quantity;
    items.push({ name, price, quantity, total });

    totalAmount += total;
    updateBillTable();
    updateBillSummary();
}

function updateBillTable() {
    const tbody = document.getElementById('billing-items');
    tbody.innerHTML = '';

    items.forEach((item, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td>₹${item.price.toFixed(2)}</td>
            <td>${item.quantity}</td>
             <td>₹${(item.total * 0.03).toFixed(2)}</td>  
            <td>₹${item.total.toFixed(2)}</td>
            <td><button onclick="removeItem(${index})">Remove</button></td>
        `;
        tbody.appendChild(row);
    });
}

function removeItem(index) {
    totalAmount -= items[index].total;
    items.splice(index, 1);
    updateBillTable();
    updateBillSummary();
}

function updateBillSummary() {
    // Update GST to 3%
    gst = totalAmount * 0.03;  // GST is now 3%
    
    // Shipping Charges: If total > 1000, shipping is free; else ₹50
    shippingCharges = totalAmount > 1000 ? 0 : 50;

    // Calculate final total
    const finalTotal = totalAmount - discount + gst + shippingCharges;

    // Update the bill summary display
    document.getElementById('total-amount').textContent = totalAmount.toFixed(2);
    document.getElementById('discount-amount').textContent = discount.toFixed(2);
    document.getElementById('tax-amount').textContent = gst.toFixed(2);  // Show 3% GST
    document.getElementById('shipping-amount').textContent = shippingCharges.toFixed(2);
    document.getElementById('final-total').textContent = finalTotal.toFixed(2);
}

function applyCoupon() {
    const couponCode = document.getElementById('coupon-code').value.trim();
    const couponMessage = document.getElementById('coupon-message');

    if (couponCode === 'DISCOUNT10') {
        discount = totalAmount * 0.10;  // Apply 10% discount
        couponMessage.textContent = 'Coupon applied successfully! You saved 10%.';
        couponMessage.style.color = 'green';
    } else {
        discount = 0;
        couponMessage.textContent = 'Invalid coupon code.';
        couponMessage.style.color = 'red';
    }
    updateBillSummary();
}

function finalizeBill() {
    const modal = document.getElementById('finalize-modal');
    const tbody = document.getElementById('final-bill-body');
    const finalTotalAmount = document.getElementById('final-total-amount');
    const shippingInput = document.getElementById('shipping-charges');

    // Check if shipping charges field is empty
    if (!shippingInput.value) {
        alert("Please enter the shipping charges.");
        return;
    }

    // Get the shipping charges value
    shippingCharges = parseFloat(shippingInput.value);
    if (isNaN(shippingCharges) || shippingCharges < 0) {
        alert("Please enter a valid number for shipping charges.");
        return;
    }

    tbody.innerHTML = '';
    items.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td>₹${item.price.toFixed(2)}</td>
            <td>${item.quantity}</td>
             <td>₹${(item.total * 0.03).toFixed(2)}</td>  
            <td>₹${item.total.toFixed(2)}</td>
        `;
        tbody.appendChild(row);
    });

    // Calculate final total with shipping charges
    const finalTotal = totalAmount - discount + gst + shippingCharges;
    finalTotalAmount.textContent = finalTotal.toFixed(2);

    modal.style.display = 'flex';
}

function closeModal() {
    const modal = document.getElementById('finalize-modal');
    modal.style.display = 'none';
}



function printBill() {
  const printWindow = window.open('', '', 'height=600,width=800');

  // Fetching user input details
  const customerFirstName = document.getElementById('customerFirstName').value.trim();
  const customerLastName = document.getElementById('customerLastName').value.trim();
  const customerPhone = document.getElementById('customer-phone').value.trim();
  const customerEmail = document.getElementById('customer-email').value.trim();
  const customerPincode = document.getElementById('pinCode').value.trim();
  const customerCity = document.getElementById('city').value.trim();
  const customerState = document.getElementById('state').value.trim();
  const customerAddress = document.getElementById('customer-address').value.trim();
  const customerAadhar = document.getElementById('customer-aadhar').value.trim();
  const customerPan = document.getElementById('customer-pan').value.trim();

  // Concatenating First Name & Last Name into Customer Name
  const customerFullName = `${customerFirstName} ${customerLastName}`.trim();

  // Function to format empty fields as "N/A"
  function formatField(field) {
      return field !== "" ? field : "N/A";
  }

  const billContent = `
      <html>
      <head>
          <title>Bill</title>
          <style>
              body { font-family: "Times New Roman", serif; font-size: 14pt; color: black; margin: 40px; }
              .bill-header { text-align: center; margin-bottom: 20px; font-weight: bold; border-bottom: 2px solid black; padding-bottom: 10px; }
              .bill-header h1 { margin: 0; font-size: 24pt; text-transform: uppercase; }
              .customer-details { margin-top: 20px; font-size: 14pt; border: 2px solid black; padding: 15px; width: 100%; display: grid; grid-template-columns: 50% 50%; gap: 15px; }
              .customer-details p { margin: 5px 0; font-size: 14pt; font-weight: bold; padding: 5px; }
              table { width: 100%; border-collapse: collapse; margin-top: 20px; }
              table, th, td { border: 1px solid black; }
              th, td { padding: 10px; text-align: left; font-size: 14pt; }
              th { background-color: #f0f0f0; font-weight: bold; text-transform: uppercase; text-align: center; }
              .bill-summary { margin-top: 20px; font-size: 14pt; font-weight: bold; border-top: 2px solid black; padding-top: 10px; }
              .bill-summary p { display: flex; justify-content: space-between; padding: 5px 0; }
              .footer { text-align: center; margin-top: 30px; font-size: 16pt; font-weight: bold; border-top: 2px solid black; padding-top: 10px; }
          </style>
      </head>
      <body>
          <div class="bill-header">
              <h1>Jewellery Haven</h1>
          </div>
          
          <div class="customer-details">
              <p><strong>Customer Name:</strong> ${formatField(customerFullName)}</p>
              <p><strong>Phone:</strong> ${formatField(customerPhone)}</p>
              <p><strong>Email:</strong> ${formatField(customerEmail)}</p>
              <p><strong>Pincode:</strong> ${formatField(customerPincode)}</p>
              <p><strong>City:</strong> ${formatField(customerCity)}</p>
              <p><strong>State:</strong> ${formatField(customerState)}</p>
              <p><strong>Address:</strong> ${formatField(customerAddress)}</p>
              <p><strong>Aadhar Number:</strong> ${formatField(customerAadhar)}</p>
              <p><strong>PAN Number:</strong> ${formatField(customerPan)}</p>
          </div>

          <table>
              <thead>
                  <tr>
                      <th>Item</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Gst(3%)</th>
                      <th>Total</th>
                  </tr>
              </thead>
              <tbody>
                  ${items.map(item => `
                      <tr>
                          <td>${item.name}</td>
                          <td>₹${item.price.toFixed(2)}</td>
                          <td>${item.quantity}</td>
                          <td>₹${(item.total * 0.03).toFixed(2)}</td>  
                          <td>₹${item.total.toFixed(2)}</td>
                          
                      </tr>
                  `).join('')}
              </tbody>
          </table>

          <div class="bill-summary">
              <p><strong>Total Amount:</strong> ₹${totalAmount.toFixed(2)}</p>
          </div>

          <div class="footer">
              <p>Thank you for shopping with us!</p>
          </div>
      </body>
      </html>
  `;

  printWindow.document.write(billContent);
  printWindow.document.close();
  printWindow.onload = () => {
      printWindow.print();
      printWindow.close();
  };
}











function shareBill() {
    // Prepare the bill content to send in the email
    const customerName = document.getElementById('customer-name').value;
    const customerPhone = document.getElementById('customer-phone').value;
    const customerAddress = document.getElementById('customer-address').value;
    const emailBody = `
        Bill for ${customerName} (Phone: ${customerPhone}, Address: ${customerAddress})
        
        Items:
        ${items.map(item => `${item.name} - ₹${item.price.toFixed(2)} x ${item.quantity} = ₹${item.total.toFixed(2)}`).join('\n')}
        
        Total Amount: ₹${totalAmount.toFixed(2)}
        Discount: ₹${discount.toFixed(2)}
        GST (3%): ₹${gst.toFixed(2)}
        Shipping Charges: ₹${shippingCharges.toFixed(2)}
        Final Total: ₹${(totalAmount - discount + gst + shippingCharges).toFixed(2)}

        Thank you for shopping with us!
    `;

    // Create the mailto link with subject and body
    const mailtoLink = `mailto:?subject=Your Bill from Jewellery Haven&body=${encodeURIComponent(emailBody)}`;
    
    // Trigger the email action
    window.location.href = mailtoLink;
}



// *************GOld API Key****************
const API_KEY = 'goldapi-pirmfsm64mdgg3-io'; // Your GoldAPI key
const API_URL = 'https://www.goldapi.io/api/XAU/INR';

fetch(API_URL, {
  method: 'GET',
  headers: {
    'x-access-token': API_KEY, // GoldAPI expects the API key in the headers
    'Content-Type': 'application/json'
  }
})
.then(response => {
  if (!response.ok) {
    throw new Error(`HTTP Error: ${response.status}`);
  }
  return response.json();
})
.then(data => {
  const pricePerOunce = data.price; // Gold rate per ounce in INR
  const pricePerGram = pricePerOunce / 31.1035; // Convert to grams
  document.getElementById('gold-rate').innerText = `Current Gold Rate(22 Carat): ₹${pricePerGram.toFixed(2)} per gram`;
})
.catch(error => {
  document.getElementById('gold-rate').innerText = 'Error fetching gold rate!';
  document.getElementById('error').innerText = `Error: ${error.message}`;
  console.error('Fetch Error:', error);
});



// ***************SILVER API Key****************
// script.js
const apiKey = 'goldapi-pirmfsm64mdgg3-io'; // Replace with your API key
const apiUrl = 'https://www.goldapi.io/api/XAG/INR'; // Endpoint for Silver in INR

async function getSilverPrice() {
  try {
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'x-access-token': apiKey,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    const pricePerGram = data.price / 31.1035; // Convert from troy ounce to gram
    const silverPriceElement = document.getElementById('silver-price');
    silverPriceElement.textContent = `Current Silver Rate: ₹${pricePerGram.toFixed(2)} per gram`;
  } catch (error) {
    const silverPriceElement = document.getElementById('silver-price');
    silverPriceElement.textContent = 'Failed to fetch silver price. Please try again later.';
    console.error('Failed to fetch silver price:', error);
  }
}

// Fetch silver price when the page loads
getSilverPrice();




// ***************State and City Pin code API Key Usiing Postal PIN Code API****************
async function fetchStateCity(pinCode) {
    const url = `https://api.postalpincode.in/pincode/${pinCode}`;

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Network response was not ok");

      const data = await response.json();

      if (data[0].Status === "Success") {
        const postOffice = data[0].PostOffice[0];
        const state = postOffice.State;
        const city = postOffice.District;

        console.log("State:", state);
        console.log("City:", city);

        // Populate the form fields
        document.getElementById("state").value = state;
        document.getElementById("city").value = city;
      } else {
        console.error("Invalid PIN code");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  // Example usage
  document.getElementById("pinCode").addEventListener("input", (event) => {
    const pinCode = event.target.value;
    if (pinCode.length === 6) fetchStateCity(pinCode);
  });




  // ***************Dropdown Countries****************


  

document.addEventListener("DOMContentLoaded", () => {
  const countries = ["India", "United States", "Australia", "Canada", "Germany", "France", "Japan", "China", "Brazil"];
  const dropdown = document.querySelector(".dropdown");
  const selected = dropdown.querySelector(".dropdown-selected");
  const options = dropdown.querySelector(".dropdown-options");

  // Populate dropdown options dynamically
  options.innerHTML = countries.map(country => `<li>${country}</li>`).join("");

  // Toggle dropdown visibility
  selected.addEventListener("click", () => dropdown.classList.toggle("dropdown-active"));

  // Handle option selection
  dropdown.addEventListener("click", (event) => {
      if (event.target.tagName === "LI") {
          selected.textContent = event.target.textContent;
          dropdown.classList.remove("dropdown-active");
      }
  });

  // Close dropdown when clicking outside
  document.addEventListener("click", (event) => {
      if (!dropdown.contains(event.target)) {
          dropdown.classList.remove("dropdown-active");
      }
  });
});
