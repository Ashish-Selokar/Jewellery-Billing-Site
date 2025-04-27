function previewImage(event, previewId) {
    var reader = new FileReader();
    reader.onload = function () {
        var output = document.getElementById(previewId);
        output.src = reader.result;
        output.style.display = "block";
        checkSubmitButton(); // Check if submit button should be enabled
    };
    reader.readAsDataURL(event.target.files[0]);
}

function checkSubmitButton() {
    var photoPreview = document.getElementById('photo-preview').src;
    var signPreview = document.getElementById('sign-preview').src;
    var submitButton = document.querySelector(".submit-btn");

    // Ensure both images are uploaded
    if (photoPreview && signPreview) {
        submitButton.removeAttribute('disabled');  // Enable button
    } else {
        submitButton.setAttribute('disabled', true); // Disable button
    }
}

document.addEventListener("DOMContentLoaded", function () {
    var submitButton = document.querySelector(".submit-btn");

    // Initially disable submit button
    submitButton.setAttribute('disabled', true);

    // Add event listener for form submission
    document.querySelector("form").addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent default form submission

        // Check if submit button is enabled before submission
        if (submitButton.hasAttribute('disabled')) {
            alert("Please upload both Photo and Signature to submit the form.");
            return;
        }

        // Get all input values
        var formData = new FormData(this);

        // Example action: Log form data
        console.log("Form Submitted!");
        for (let [name, value] of formData.entries()) {
            console.log(name + ": " + value);
        }

        // Show alert message
        alert("Form successfully submitted!");
    });
});



document.addEventListener("DOMContentLoaded", function () {
    var submitButton = document.querySelector(".submit-btn");

    // Initially disable submit button
    submitButton.setAttribute('disabled', true);

    // Add event listener for form submission
    document.querySelector("form").addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent default form submission

        if (!validateForm()) {
            return;
        }

        // Get all input values
        var formData = new FormData(this);

        // Example action: Log form data
        console.log("Form Submitted!");
        for (let [name, value] of formData.entries()) {
            console.log(name + ": " + value);
        }

        // Show alert message
        alert("Form successfully submitted!");
    });
});

// Form validation function
function validateForm() {
    var isValid = true;
    var requiredFields = document.querySelectorAll("input[required]");
    
    requiredFields.forEach(function (field) {
        if (!field.value.trim()) {
            alert(field.previousElementSibling.innerText + " is required.");
            isValid = false;
            return false;
        }
    });

    var emailField = document.getElementById("email");
    var emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(emailField.value)) {
        alert("Enter a valid email address.");
        isValid = false;
    }

    var contactField = document.getElementById("contact-number");
    if (!/^\d{10}$/.test(contactField.value)) {
        alert("Enter a valid 10-digit contact number.");
        isValid = false;
    }

    return isValid;
}
