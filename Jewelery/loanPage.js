document.addEventListener("DOMContentLoaded", function () {
    const addItemButton = document.getElementById('addItemButton');

    if (!addItemButton) {
        console.error("Add More Item button not found!");
        return;
    }

    addItemButton.addEventListener('click', function() {
        const tableBody = document.querySelector('#itemTable tbody');
        
        if (!tableBody) {
            console.error("Table body not found!");
            return;
        }

        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>
                <select>
                    <option value="GOLD">GOLD</option>
                    <option value="SILVER">SILVER</option>
                    <option value="PLATINUM">PLATINUM</option>
                    <option value="PALLADIUM">PALLADIUM</option>
                    <option value="COPPER">COPPER</option>
                </select>
            </td>
            <td><input type="text" placeholder="Item Name / Details"></td>
            <td><input type="number" value="1"></td>
            <td><input type="number" placeholder="8.256"></td>
            <td><input type="text" placeholder="GM"></td>
            <td><input type="text" placeholder="70%"></td>
            <td><input type="text" value="5.779"></td>
            <td><input type="text" value="45654.10"></td>
            <td><button type="button">Upload</button></td>
        `;

        tableBody.appendChild(newRow);
    });
});
