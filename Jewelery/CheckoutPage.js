document.addEventListener("DOMContentLoaded", function () {
    const btnUpi = document.getElementById('btn-upi');
    const btnCard = document.getElementById('btn-card');
    const upiSection = document.getElementById('upi-section');
    const cardSection = document.getElementById('card-section');

    btnUpi.addEventListener("click", function () {
        upiSection.style.display = "block";
        cardSection.style.display = "none";
        btnUpi.classList.add("active");
        btnCard.classList.remove("active");
    });

    btnCard.addEventListener("click", function () {
        upiSection.style.display = "none";
        cardSection.style.display = "block";
        btnCard.classList.add("active");
        btnUpi.classList.remove("active");
    });

    document.getElementById('checkout-form').addEventListener('submit', function (event) {
        event.preventDefault();
        alert("✅ Payment Successful!");
    });
});
