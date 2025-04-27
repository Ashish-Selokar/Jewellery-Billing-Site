

// Smooth Scroll for Navbar Links
document.querySelectorAll('.navbar a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').slice(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
            window.location.href = this.getAttribute('href');
        }
    });
});

// Change Navbar Background on Scroll
const header = document.querySelector('.main-header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.style.backgroundColor = '#6c3483';
        header.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
    } else {
        header.style.backgroundColor = 'transparent';
        header.style.boxShadow = 'none';
    }
});

// Add Hover Effect to Collection Items
const collectionItems = document.querySelectorAll('.collection-item');
collectionItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'scale(1.1)';
        item.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.2)';
    });
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'scale(1)';
        item.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
    });
});


function gotoAbout(){
    window.location.href = "AboutPage.html";
    
}




function gotoCollection(){
    window.location.href = "COllectionPage.html";
    
}

// Dynamic Hero Section Text Animation
const heroText = document.querySelector('.hero-content h1');
let text = heroText.textContent;
heroText.textContent = '';
let index = 0;

function typeText() {
    if (index < text.length) {
        heroText.textContent += text.charAt(index);
        index++;
        setTimeout(typeText, 100);
    }
}
typeText();

// Interactive Map Placeholder
const map = document.getElementById('map');
map.addEventListener('click', () => {
    alert('Interactive map feature coming soon!');
});
