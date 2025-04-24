const products = [
    {
        id: 1,
        name: "Smartphone XYZ",
        price: 599.99,
        category: "Électronique",
        image: "Assets/iphon.jpg",
        description: "Un smartphone haut de gamme avec d'excellentes performances."
    },
    {
        id: 2,
        name: "Laptop Pro",
        price: 999.99,
        category: "electronics",
        image: "Assets/laptop.jpg",
        description: "Ordinateur portable puissant pour les professionnels."
    },
    {
        id: 3,
        name: "T-shirt Premium",
        price: 29.99,
        category: "clothing",
        image: "assets/f6.jpg",
        description: "T-shirt confortable en coton bio."
    },
    {
        id: 4,
        name: "Jean Classique",
        price: 49.99,
        category: "clothing",
        image: "Assets/f5.jpg",
        description: "Jean durable de qualité supérieure."
    },
    {
        id: 5,
        name: "Roman Bestseller",
        price: 19.99,
        category: "books",
        image: "   Assets/livre2.jpeg",
        description: "Le dernier roman à succès qui captivera votre attention."
    },
    {
        id: 10,
        name: "laila",
        price: 19.99,
        category: "books",
        image: "   Assets/livre3.jpeg",
        description: "Le dernier roman à succès qui captivera votre attention."
    },
    {
        id: 6,
        name: "Guide Pratique",
        price: 24.99,
        category: "books",
        image: "Assets/livre1.jpeg",
        description: "Un guide pratique pour améliorer votre quotidien."
    },
    {
        id: 7,
        name: "Lampe Design",
        price: 79.99,
        category: "homeDecor",
        image: "Assets/doc3.jpg",
        description: "Lampe élégante pour une ambiance chaleureuse."
    },
    {
        id: 8,
        name: "Tapis Moderne",
        price: 129.99,
        category: "homeDecor",
        image: "Assets/doc2.jpg",
        description: "Tapis moderne qui s'intègre parfaitement à votre intérieur."
    },
    {
        id: 9,
        name: "Écouteurs Sans Fil",
        price: 149.99,
        category: "electronics",
        image: "Assets/ecouteir.jpg",
        description: "Écouteurs sans fil avec une excellente qualité sonore."
    },
    {
        id: 10,
        name: "Vase Décoratif",
        price: 39.99,
        category: "homeDecor",
        image: "assets/deco2.jpg",
        description: "Vase élégant pour mettre en valeur vos fleurs."
    },
    {
        id: 11,
        name: "Montre Connectée",
        price: 199.99,
        category: "electronics",
        image: "Assets/montre.jpg",
        description: "Montre connectée avec de nombreuses fonctionnalités."
    },
    {
        id: 12,
        name: "Pull d'Hiver",
        price: 59.99,
        category: "clothing",
        image: "Assets/f2.jpg",
        description: "Pull chaud et confortable pour l'hiver."
    },
    {
        id: 13,
        name: "Pull d'Hiver",
        price: 59.99,
        category: "clothing",
        image: "Assets/f4.jpg",
        description: "Pull chaud et confortable pour l'hiver."
    },
    {
        id: 14,
        name: "Pull d'Hiver",
        price: 59.99,
        category: "clothing",
        image: "Assets/f5.jpg",
        description: "Pull chaud et confortable pour l'hiver."
    },
    {
        id: 16,
        name: "Pull d'Hiver",
        price: 40.99,
        category: "clothing",
        image: "Assets/f3.jpg",
        description: "Pull chaud et confortable pour l'hiver."
    }
];

// Panier d'achat
let cart = [];

// Éléments du DOM
const productsContainer = document.getElementById('products-container');
const categoryFilter = document.getElementById('category-filter');
const priceFilter = document.getElementById('price-filter');
const priceDisplay = document.getElementById('price-display');
const searchFilter = document.getElementById('search-filter');
const cartIcon = document.getElementById('cart-icon');
const cartModal = document.getElementById('cart-modal');
const closeModal = document.getElementById('close-modal');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const cartCount = document.getElementById('cart-count');
const checkoutBtn = document.getElementById('checkout-btn');

// Fonction pour afficher les produits
function displayProducts(productList) {
    productsContainer.innerHTML = '';
    
    if (productList.length === 0) {
        productsContainer.innerHTML = '<p>Aucun produit ne correspond à vos critères.</p>';
        return;
    }
    
    productList.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'product';
        
        productElement.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
                <div class="product-description">
                    <p>${product.description}</p>
                </div>
            </div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-category">${getCategoryName(product.category)}</p>
                <p class="product-price">${product.price.toFixed(2)}€</p>
                <button class="add-to-cart" data-id="${product.id}">Ajouter au panier</button>
            </div>
        `;
        
        productsContainer.appendChild(productElement);
    });
    
    // Ajouter les écouteurs d'événements pour les boutons "Ajouter au panier"
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-id'));
            addToCart(productId);
        });
    });
}

// Fonction pour filtrer les produits
function filterProducts() {
    const category = categoryFilter.value;
    const maxPrice = parseFloat(priceFilter.value);
    const searchTerm = searchFilter.value.toLowerCase();
    
    const filteredProducts = products.filter(product => {
        const matchCategory = category === 'all' || product.category === category;
        const matchPrice = product.price <= maxPrice;
        const matchSearch = product.name.toLowerCase().includes(searchTerm) || 
                           product.description.toLowerCase().includes(searchTerm);
        
        return matchCategory && matchPrice && matchSearch;
    });
    
    displayProducts(filteredProducts);
}

// Fonction pour obtenir le nom de la catégorie en français
function getCategoryName(category) {
    const categories = {
        'electronics': 'Électronique',
        'clothing': 'Vêtements',
        'books': 'Livres',
        'homeDecor': 'Décoration'
    };
    
    return categories[category] || category;
}

// Fonction pour ajouter un produit au panier
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1
        });
    }
    
    updateCartUI();
    
    // Animation pour indiquer que le produit a été ajouté
    const button = document.querySelector(`.add-to-cart[data-id="${productId}"]`);
    button.textContent = 'Ajouté !';
    button.style.backgroundColor = '#ff6b6b';
    
    setTimeout(() => {
        button.textContent = 'Ajouter au panier';
        button.style.backgroundColor = '#4CAF50';
    }, 1000);
}

// Fonction pour mettre à jour l'interface du panier
function updateCartUI() {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    cartItemsContainer.innerHTML = '';
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Votre panier est vide.</p>';
        cartTotal.textContent = '0.00';
        return;
    }
    
    let total = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        const cartItemElement = document.createElement('div');
        cartItemElement.className = 'cart-item';
        
        cartItemElement.innerHTML = `
            <div class="cart-item-info">
                <h3>${item.name}</h3>
                <p>${item.price.toFixed(2)}€ x ${item.quantity}</p>
            </div>
            <div class="cart-item-quantity">
                <button class="decrease-qty" data-id="${item.id}">-</button>
                <span>${item.quantity}</span>
                <button class="increase-qty" data-id="${item.id}">+</button>
            </div>
            <p>${itemTotal.toFixed(2)}€</p>
            <button class="remove-item" data-id="${item.id}">🗑️</button>
        `;
        
        cartItemsContainer.appendChild(cartItemElement);
    });
    
    cartTotal.textContent = total.toFixed(2);
    
    // Ajouter les écouteurs d'événements pour les boutons de quantité et suppression
    document.querySelectorAll('.increase-qty').forEach(button => {
        button.addEventListener('click', function() {
            const id = parseInt(this.getAttribute('data-id'));
            changeQuantity(id, 1);
        });
    });
    
    document.querySelectorAll('.decrease-qty').forEach(button => {
        button.addEventListener('click', function() {
            const id = parseInt(this.getAttribute('data-id'));
            changeQuantity(id, -1);
        });
    });
    
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', function() {
            const id = parseInt(this.getAttribute('data-id'));
            removeFromCart(id);
        });
    });
}

// Fonction pour modifier la quantité d'un produit dans le panier
function changeQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    
    if (!item) return;
    
    item.quantity += change;
    
    if (item.quantity <= 0) {
        removeFromCart(productId);
    } else {
        updateCartUI();
    }
}

// Fonction pour supprimer un produit du panier
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
}


function init() {
    // Ajouter les styles CSS pour l'effet de description au survol
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        .product-image {
            position: relative;
            overflow: hidden;
        }
        
        .product-description {
            position: absolute;
            bottom: -100%;
            left: 0;
            width: 100%;
            background-color: rgba(0, 0, 0, 0.7);
            color: white;
            padding: 10px;
            transition: bottom 0.3s ease;
            color: white;
            font-size: 14px;
        }
        
        .product-image:hover .product-description {
            bottom: 0;
        }
    `;
    document.head.appendChild(styleElement);
    

    displayProducts(products);
    

    priceDisplay.textContent = `${priceFilter.value}€`;
    
  
    categoryFilter.addEventListener('change', filterProducts);
    
    priceFilter.addEventListener('input', function() {
        priceDisplay.textContent = `${this.value}€`;
        filterProducts();
    });
    
    searchFilter.addEventListener('input', filterProducts);
    
 
    cartIcon.addEventListener('click', function() {
        cartModal.style.display = 'flex';
    });
    
    closeModal.addEventListener('click', function() {
        cartModal.style.display = 'none';
    });
    
  
    window.addEventListener('click', function(event) {
        if (event.target === cartModal) {
            cartModal.style.display = 'none';
        }
    });
    
 
    checkoutBtn.addEventListener('click', function() {
        if (cart.length === 0) {
            alert('Votre panier est vide.');
            return;
        }
        
        alert('Merci pour votre commande ! Elle sera traitée dans les plus brefs délais.');
        cart = [];
        updateCartUI();
        cartModal.style.display = 'none';
    });
}


document.addEventListener('DOMContentLoaded', init);