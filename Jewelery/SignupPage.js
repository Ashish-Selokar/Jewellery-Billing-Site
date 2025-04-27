// Form Validation Function
document.getElementById("signupForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission
  
    // Clear previous error messages
    document.getElementById("phoneError").style.display = "none";
    document.getElementById("emailError").style.display = "none";
    document.getElementById("termsError").style.display = "none";
    document.getElementById("photoError").style.display = "none";
  
    // Validate Phone Number (10 digits)
    const phoneNumber = document.getElementById("phoneNumber").value;
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phoneNumber)) {
      document.getElementById("phoneError").style.display = "block";
      return;
    }
  
    // Validate Email Format
    const email = document.getElementById("email").value;
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
      document.getElementById("emailError").style.display = "block";
      return;
    }
  
    // Validate Terms and Conditions
    const termsCheckbox = document.getElementById("terms");
    if (!termsCheckbox.checked) {
      document.getElementById("termsError").style.display = "block";
      return;
    }
  
    // Validate Passport Photo
    const passportPhoto = document.getElementById("passportPhoto").files[0];
    if (!passportPhoto) {
      document.getElementById("photoError").style.display = "block";
      return;
    }
  
    // Check if the uploaded file is an image
    const validImageTypes = ["image/jpeg", "image/png", "image/gif"];
    if (!validImageTypes.includes(passportPhoto.type)) {
      document.getElementById("photoError").style.display = "block";
      return;
    }
  
    // Check file size (2MB limit)
    if (passportPhoto.size > 2 * 1024 * 1024) {  // 2MB
      document.getElementById("photoError").style.display = "block";
      return;
    }
  
    // Show success message (or proceed with form submission)
    alert("Signup successful!");
    document.getElementById("signupForm").reset(); // Reset form fields
  });
  