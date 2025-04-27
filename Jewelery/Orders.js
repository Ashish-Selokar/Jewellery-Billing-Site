function filterOrders(status) {
    const allOrders = document.querySelectorAll('.order-item');
    allOrders.forEach(order => {
        if (status === 'all' || order.classList.contains(status)) {
            order.classList.remove('hidden');
        } else {
            order.classList.add('hidden');
        }
    });
    const tabs = document.querySelectorAll('.tabs button');
    tabs.forEach(tab => tab.classList.remove('active'));
    document.getElementById(status).classList.add('active');
}

function searchOrders() {
    const query = document.getElementById('search-bar').value.toLowerCase();
    const allOrders = document.querySelectorAll('.order-item');
    allOrders.forEach(order => {
        const orderText = order.textContent.toLowerCase();
        if (orderText.includes(query)) {
            order.classList.remove('hidden');
        } else {
            order.classList.add('hidden');
        }
    });
}

function addOrder() {
    const orderId = document.getElementById('new-order-id').value;
    const orderStatus = document.getElementById('new-order-status').value;

    // Validate input
    if (orderId.trim() === "") {
        alert("Please enter a valid order ID.");
        return;
    }

    // Create new order element
    const orderList = document.getElementById('order-list');
    const newOrder = document.createElement('li');
    newOrder.classList.add('order-item', orderStatus);
    newOrder.id = `order-${orderId}`;

    // Add content to the new order
    newOrder.innerHTML = `
        <span>Order #${orderId}</span>
        <span class="status ${orderStatus}">${capitalizeFirstLetter(orderStatus)}</span>
        <button class="remove-btn" onclick="removeOrder('order-${orderId}')">Remove</button>
    `;

    // Append the new order to the order list
    orderList.appendChild(newOrder);

    // Update the order count summary
    updateOrderCount();

    // Clear the input fields
    document.getElementById('new-order-id').value = '';
    document.getElementById('new-order-status').value = 'pending';
}

function removeOrder(orderId) {
    const orderToRemove = document.getElementById(orderId);
    if (orderToRemove) {
        orderToRemove.remove();
    }
    // Update the order count summary
    updateOrderCount();
}

function updateOrderCount() {
    const pendingCount = document.querySelectorAll('.order-item.pending').length;
    const onTheWayCount = document.querySelectorAll('.order-item.on-the-way').length;

    document.getElementById('pending-count').innerText = pendingCount;
    document.getElementById('on-the-way-count').innerText = onTheWayCount;
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}



