document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll(".fade-in-section");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        observer.observe(section);
    });
});

function searchProducts() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    const productItems = document.querySelectorAll('.product-item');

    productItems.forEach(item => {
        const productName = item.getAttribute('data-name').toLowerCase();

        if (productName.includes(input)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

function selectAllCategories(checkbox) {
    document.querySelectorAll('.category-checkbox').forEach(cb => cb.checked = checkbox.checked);
    filterByCategory();
}

function filterByCategory() {
    const selectedCategories = Array.from(document.querySelectorAll('.category-checkbox:checked')).map(cb => cb.value);
    document.querySelectorAll('.product-item').forEach(item => {
        const categoryName = item.getAttribute('data-name');
        item.style.display = (selectedCategories.length === 0 || selectedCategories.includes(categoryName)) ? 'block' : 'none';
    });
}

function filterByPrice() {
    // Get the input values for min and max prices
    const minPrice = document.getElementById('minPrice').value ? parseInt(document.getElementById('minPrice').value) : null;
    const maxPrice = document.getElementById('maxPrice').value ? parseInt(document.getElementById('maxPrice').value) : null;
    const productItems = document.querySelectorAll('.product-item');

    productItems.forEach(item => {
        const productPrice = parseInt(item.getAttribute('data-price'));

        // Logic to show items only within or above the minimum price and optionally below the maximum price
        const showItem =
            (minPrice === null || productPrice >= minPrice) &&
            (maxPrice === null || productPrice <= maxPrice);

        // Apply the display style based on the condition
        item.style.display = showItem ? 'block' : 'none';
    });
}


function applyFilters() {
    searchProducts();
    filterByCategory();
    filterByPrice();
}

function toggleModals() {
    // Hide the sign-up modal if it is open
    $('#signupModal').modal('hide');
    // Show the login modal
    $('#loginModal').modal('show');
}

function toggleToSignUp() {
    // Hide the login modal
    $('#loginModal').modal('hide');
    // Show the sign-up modal
    $('#signupModal').modal('show');
}

let cartCount = 0;

document.getElementById('addToCartButton').addEventListener('click', function () {
    cartCount++;
    const cartCountElement = document.getElementById('cartCount');
    cartCountElement.innerText = cartCount;

    // Show the cart count if it's greater than 0
    if (cartCount > 0) {
        cartCountElement.style.display = 'inline'; // Show the count
    }
});

function playVideo() {
    // Hide the thumbnail and play icon
    document.getElementById('video-thumbnail').style.display = 'none';
    document.querySelector('.play-icon').style.display = 'none';
    
    // Show the video
    var videoFrame = document.getElementById('video-frame');
    videoFrame.style.display = 'block';
    
    // Start playing the video by interacting with the YouTube API
    videoFrame.querySelector('iframe').contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
}