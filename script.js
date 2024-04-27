document.addEventListener('DOMContentLoaded', function() {
    const productList = document.getElementById('product-list');
    const categorySelect = document.getElementById('category');
    const searchInput = document.getElementById('search');
    const sortSelect = document.getElementById('sort');
    let allProducts = [];

    fetch('https://fakestoreapi.com/products/categories')
        .then(response => response.json())
        .then(categories => {
            categories.forEach(category => {
                const option = document.createElement('option');
                option.textContent = category;
                option.value = category;
                categorySelect.appendChild(option);
            });
        });
    fetch('https://fakestoreapi.com/products')
        .then(response => response.json())
        .then(products => {
            allProducts = products;
            displayProducts(products);
        });

    function displayProducts(products) {
        productList.innerHTML = '';
        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.title}">
                <h3>${product.title}</h3>
                <p>$${product.price}</p>
            `;
            productList.appendChild(productCard);
        });
    }

    // Filter products by category
    categorySelect.addEventListener('change', function() {
        if (this.value === 'all') {
            displayProducts(allProducts);
        } else {
            const filteredProducts = allProducts.filter(product => product.category === this.value);
            displayProducts(filteredProducts);
        }
    });

    // Search products by title
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const filteredProducts = allProducts.filter(product => product.title.toLowerCase().includes(searchTerm));
        displayProducts(filteredProducts);
    });

    // Sort products by price
    sortSelect.addEventListener('change', function() {
        const sortOrder = this.value;
        const sortedProducts = [...allProducts].sort((a, b) => {
            return sortOrder === 'asc' ? a.price - b.price : b.price - a.price;
        });
        displayProducts(sortedProducts);
    });
});
