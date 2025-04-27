// FAQ Toggle Effect
document.querySelectorAll(".faq").forEach(item => {
    item.addEventListener("click", () => {
        let answer = item.querySelector(".answer");
        answer.style.display = (answer.style.display === "block") ? "none" : "block";
    });
});

// Contact Form Validation
document.getElementById("contactForm").addEventListener("submit", function(event) {
    event.preventDefault();
    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let phone = document.getElementById("phone").value.trim();
    let message = document.getElementById("message").value.trim();
    
    if (name === "" || email === "" || phone === "" || message === "") {
        document.getElementById("formResponse").innerText = "All fields are required!";
        document.getElementById("formResponse").style.color = "red";
        return;
    }
    
    document.getElementById("formResponse").innerText = "Your message has been sent!";
    document.getElementById("formResponse").style.color = "green";
    this.reset();
});

// Toggle Chat Box with Animation
function toggleChat() {
    let chatBox = document.querySelector(".chat-box");
    chatBox.style.display = (chatBox.style.display === "flex") ? "none" : "flex";
}

// Close Chat Box with Animation
function closeChat() {
    let chatBox = document.querySelector(".chat-box");
    chatBox.style.display = "none";
}