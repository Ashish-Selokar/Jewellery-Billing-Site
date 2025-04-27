// Function to handle editing of profile information
function editInfo(field) {
    let currentValue = document.getElementById(field).innerText;
    let fieldSpan = document.getElementById(field);
    let saveButton = document.getElementById('save-' + field);
    fieldSpan.innerHTML = `<input type="text" id="${field}-input" value="${currentValue}">`;
    saveButton.style.display = 'inline-block';
}

// Function to save edited info
function saveInfo(field) {
    let newValue = document.getElementById(field + '-input').value;
    document.getElementById(field).innerText = newValue;
    document.getElementById('save-' + field).style.display = 'none';
}

// Profile Picture Update Functionality
document.getElementById('change-picture-btn').addEventListener('click', () => {
    document.getElementById('file-input').click();
});

// Handle file input and show preview
document.getElementById('file-input').addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            // Show preview
            document.getElementById('preview-container').style.display = 'block';
            document.getElementById('preview-image').src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});

// Confirm the profile picture change
document.getElementById('confirm-picture-btn').addEventListener('click', () => {
    const previewImage = document.getElementById('preview-image').src;
    document.getElementById('profile-picture').src = previewImage;
    document.getElementById('preview-container').style.display = 'none';
});

// Cancel the profile picture change
document.getElementById('cancel-picture-btn').addEventListener('click', () => {
    document.getElementById('preview-container').style.display = 'none';
});





document.addEventListener("DOMContentLoaded", () => {
    const profileOverlay = document.getElementById("profile-overlay");
    const closeProfileBtn = document.getElementById("close-profile");

    // Show overlay when page loads
    profileOverlay.style.display = "flex";

    // Close overlay when clicking the close button
    closeProfileBtn.addEventListener("click", () => {
        profileOverlay.style.display = "none";
    });

    // Close overlay when clicking outside the profile box
    profileOverlay.addEventListener("click", (event) => {
        if (!event.target.closest(".profile-container")) {
            profileOverlay.style.display = "none";
        }
    });
});


