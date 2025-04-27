// Functionality: Show Modal with Details

// Sample data for collections
const collections = [
    { name: "Gold Necklace", description: "An elegant gold necklace for special occasions." },
    { name: "Diamond Earrings", description: "Sparkling diamond earrings for timeless beauty." },
    { name: "Silver Bracelet", description: "A sleek silver bracelet perfect for daily wear." },
    { name: "Platinum Ring", description: "A sophisticated platinum ring for engagements and anniversaries." }
];

// Functionality: Show Modal with Details
function viewDetails(itemName) {
    const collection = collections.find(item => item.name === itemName);
    const modalContent = document.querySelector('.modal-content');
    modalContent.innerHTML = `
        <h2>${collection.name}</h2>
        <p>${collection.description}</p>
        <button onclick="closeModal()">Close</button>
    `;
    document.querySelector('.modal').style.display = 'block';
    modalContent.style.margin = '30px';
    modalContent.style.padding = '30px';
}

// Functionality: Close Modal
function closeModal() {
    document.querySelector('.modal').style.display = 'none';
   
}

// Functionality: Filter Collection Items
function filterCollections() {
    const searchValue = document.querySelector('#search-bar').value.toLowerCase();
    const items = document.querySelectorAll('.collection-item');

    items.forEach(item => {
        const itemName = item.querySelector('p').textContent.toLowerCase();
        item.style.display = itemName.includes(searchValue) ? 'block' : 'none';
    });
}

// Functionality: Filter by Selected Category (Gold, Silver, Platinum)
function filterByOption(option) {
    // Highlight the selected button and change its background color to gold
    document.querySelectorAll(".option-btn").forEach(btn => {
        btn.classList.remove("selected");
        btn.style.backgroundColor = ""; // Reset the background color
    });
    event.target.classList.add("selected");
    event.target.style.backgroundColor = "gold"; // Set the selected button's background to gold

    // Filter and display the relevant collection items based on the selected option
    const filteredItems = collections.filter(item => item.name.toLowerCase().includes(option.toLowerCase()));
    const resultsContainer = document.getElementById("results-container");

    if (filteredItems.length > 0) {
        resultsContainer.innerHTML = `
            <h3>${option.charAt(0).toUpperCase() + option.slice(1)} Collection</h3>
            <ul>
                ${filteredItems.map(item => `
                    <li class="collection-item">
                        <p>${item.name}</p>
                        <button onclick="viewDetails('${item.name}')">View Details</button>
                    </li>
                `).join("")}
            </ul>
        `;
        
    } else {
        resultsContainer.innerHTML = `<p>No items found for ${option}.</p>`;
    }
}
