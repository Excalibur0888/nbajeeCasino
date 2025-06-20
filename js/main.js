// Wait for DOM content to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize mobile menu first to ensure it works on all pages
    initMobileMenu();
    
    // Check if we're on the index page before initializing the hero slider
    if (document.querySelector('.hero-banner')) {
        initHeroSlider();
    }
    // Initialize animations
    initAnimations();
    
    // Initialize floating notifications
    initFloatingNotifications();
    
    // Initialize game hover effects
    initGameHoverEffects();
    
    // Initialize category filter
    initCategoryFilter();
    
    // Create animated coins
    createAnimatedCoins();
    
    // Initialize currency animation
    initCurrencyAnimation();
});

// Hero Slider Functionality
function initHeroSlider() {
    const slides = [
        {
            title: "Nbajee Casino – Bangladesh's Premier Online Casino Experience",
            subtitle: "Grab a 250% Welcome Bonus + 100 Free Spins on Nbajee's Most Popular Slots!",
            background: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.2)), url('images/1.avif')",
            badge: "WELCOME BONUS"
        },
        {
            title: "Bonus awaits: 500 free spins for all new users",
            subtitle: "Experience the thrill of sports betting with competitive odds and live match updates",
            background: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.2)), url('images/2.avif')",
            badge: "SPORTS BETTING"
        },
        {
            title: "Live Dealer Games with Bangla-Speaking Dealers",
            subtitle: "Enjoy Teen Patti, Roulette, and Blackjack with real dealers speaking your language",
            background: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.2)), url('images/3.avif')",
            badge: "LIVE CASINO"
        }
    ];
    
    let currentSlide = 0;
    const banner = document.querySelector('.hero-banner');
    const title = document.querySelector('.hero-content h2');
    const subtitle = document.querySelector('.hero-content p');
    const badge = document.querySelector('.promo-badge');
    const dots = document.querySelectorAll('.dot');
    
    // Add CSS transitions to elements
    banner.style.transition = 'opacity 0.5s ease-in-out, background 0.5s ease-in-out';
    title.style.transition = 'opacity 0.5s ease-in-out';
    subtitle.style.transition = 'opacity 0.5s ease-in-out';
    badge.style.transition = 'opacity 0.5s ease-in-out';
    
    // Preload images
    slides.forEach(slide => {
        const img = new Image();
        img.src = slide.background.split("url('")[1].split("')")[0];
    });
    
    function updateSlider() {
        // Just fade content, not the entire banner
        title.style.opacity = '0';
        subtitle.style.opacity = '0';
        badge.style.opacity = '0';
        
        setTimeout(() => {
            // Update content
            title.textContent = slides[currentSlide].title;
            subtitle.textContent = slides[currentSlide].subtitle;
            badge.textContent = slides[currentSlide].badge;
            banner.style.background = `${slides[currentSlide].background}`;
            banner.style.backgroundSize = 'cover';
            banner.style.backgroundPosition = 'center';
            
            // Update dots
            dots.forEach((dot, index) => {
                dot.classList.remove('active');
                if (index === currentSlide) {
                    dot.classList.add('active');
                }
            });
            
            // Apply fade in effect only to content
            title.style.opacity = '1';
            subtitle.style.opacity = '1';
            badge.style.opacity = '1';
        }, 300); // Shorter timeout for smoother transitions
    }
    
    // Add click event listeners to dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            updateSlider();
        });
    });
    
    // Auto-rotate slides
    setInterval(() => {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlider();
    }, 5000);
    
    // Initial update to set the first slide
    updateSlider();
}

// Initialize Animations
function initAnimations() {
    // Add animation classes to elements when they come into view
    const animatedElements = document.querySelectorAll('.home-section, .game-card, .feature-list');
    
    function checkVisibility() {
        animatedElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            const viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
            const isVisible = !(rect.bottom < 0 || rect.top - viewHeight >= 0);
            
            if (isVisible) {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Initial setup
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    });
    
    // Check visibility on scroll
    window.addEventListener('scroll', checkVisibility);
    
    // Check once on load
    setTimeout(checkVisibility, 100);
}

// Floating notifications for winners
function initFloatingNotifications() {
    const winMessages = [
        { name: "Rahim", city: "Dhaka", amount: "৳120,000", game: "Sweet Bonanza" },
        { name: "Tania", city: "Chittagong", amount: "৳95,000", game: "Gates of Olympus" },
        { name: "Farzana", city: "Khulna", amount: "৳210,500", game: "Crazy Time" },
        { name: "Kamal", city: "Sylhet", amount: "৳75,000", game: "Wolf Gold" },
        { name: "Nasir", city: "Rajshahi", amount: "৳180,000", game: "Teen Patti" },
        { name: "Sadia", city: "Dhaka", amount: "৳250,000", game: "Book of Dead" },
        { name: "Imran", city: "Barisal", amount: "৳60,000", game: "Mega Moolah" },
        { name: "Nusrat", city: "Comilla", amount: "৳2,801,581", game: "Gates of Olympus" }
    ];
    
    const games = [
        "Sweet Bonanza", 
        "Gates of Olympus", 
        "Wolf Gold", 
        "Book of Dead", 
        "Mega Moolah", 
        "Crazy Time", 
        "Teen Patti"
    ];
    
    const ticker = document.querySelector('.live-winner-ticker');
    const currencyWinners = document.querySelector('.winners-section');
    
    function showWinNotification() {
        const randomWinner = winMessages[Math.floor(Math.random() * winMessages.length)];
        const randomGame = games[Math.floor(Math.random() * games.length)];
        
        ticker.innerHTML = `<i class="fas fa-trophy"></i> ${randomWinner.name} from ${randomWinner.city} just won ${randomWinner.amount} on ${randomGame}!`;
        
        // Animation effect
        ticker.style.animation = 'none';
        void ticker.offsetWidth; // Trigger reflow
        ticker.style.animation = 'float 3s infinite ease-in-out';
    }
    
    function updateCurrencyBarWinner() {
        const randomWinner = winMessages[Math.floor(Math.random() * winMessages.length)];
        
        // Fade out effect
        currencyWinners.style.opacity = '0';
        
        setTimeout(() => {
            // Update content
            currencyWinners.innerHTML = `<i class="fas fa-trophy"></i> ${randomWinner.name} (${randomWinner.city}): ${randomWinner.amount} on ${randomWinner.game}`;
            
            // Fade in effect
            currencyWinners.style.opacity = '1';
        }, 300);
    }
    
    // Add transition to winners section
    currencyWinners.style.transition = 'opacity 0.3s ease-in-out';
    
    // Update win notification periodically
    setInterval(showWinNotification, 8000);
    setInterval(updateCurrencyBarWinner, 5000);
    
    // Initial notification
    showWinNotification();
}

// Game hover effects
function initGameHoverEffects() {
    const gameCards = document.querySelectorAll('.game-card');
    
    gameCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const playBtn = card.querySelector('.btn-play');
            playBtn.style.transform = 'scale(1.1)';
            
            // Add shimmer effect
            const title = card.querySelector('.game-title');
            if (title) {
                title.classList.add('shimmer');
            }
        });
        
        card.addEventListener('mouseleave', () => {
            const playBtn = card.querySelector('.btn-play');
            playBtn.style.transform = 'scale(1)';
            
            // Remove shimmer effect
            const title = card.querySelector('.game-title');
            if (title) {
                title.classList.remove('shimmer');
            }
        });
    });
}

// Mobile menu initialization - simplified and more direct approach
function initMobileMenu() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (!menuToggle || !mainNav) return;
    
    // Direct click handler
    menuToggle.onclick = function() {
        const isOpen = mainNav.classList.contains('show');
        
        // Toggle navigation
        mainNav.classList.toggle('show');
        
        // Change icon
        this.innerHTML = isOpen ? 
            '<i class="fas fa-bars"></i>' : 
            '<i class="fas fa-times"></i>';
        
        // Toggle body scroll
        document.body.style.overflow = isOpen ? '' : 'hidden';
    };
    
    // Close menu when clicking navigation links
    const navLinks = document.querySelectorAll('.main-nav a');
    navLinks.forEach(link => {
        link.onclick = function() {
            if (mainNav.classList.contains('show')) {
                mainNav.classList.remove('show');
                document.body.style.overflow = '';
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        };
    });
}

// Add currency exchange animation
const currencies = document.querySelectorAll('.currency-item');

function initCurrencyAnimation() {
    // Initial setup - add light animation to currency values
    currencies.forEach(currency => {
        const value = currency.innerHTML;
        const icon = value.substring(0, value.indexOf('</i>') + 4);
        const text = value.substring(value.indexOf('</i>') + 4);
        
        // Replace with formatted content
        currency.innerHTML = `${icon}<span class="currency-value">${text}</span>`;
    });
    
    // Apply staggered animation to each currency
    currencies.forEach((currency, index) => {
        setTimeout(() => {
            animateCurrency(currency);
        }, index * 300); // Stagger start time
    });
    
    // Set up interval for repeating the animation
    setInterval(() => {
        currencies.forEach((currency, index) => {
            setTimeout(() => {
                animateCurrency(currency);
            }, index * 300); // Staggered animation
        });
    }, 10000);
}

function animateCurrency(currency) {
    // Get the value text element
    const valueElement = currency.querySelector('.currency-value');
    const originalValue = valueElement.textContent;
    
    // Add animation classes
    currency.classList.add('pulse-currency');
    valueElement.style.opacity = '0';
    
    // Generate new "random" value for animation effect (not actual value change)
    setTimeout(() => {
        // Show new "animated" value for a moment
        const currentValue = parseFloat(originalValue.match(/[\d.]+/)[0]);
        const direction = Math.random() > 0.5 ? 1 : -1;
        const change = Math.random() * 0.5 * direction;
        const newValue = (currentValue + change).toFixed(2);
        
        // Just visually update the text value
        const currencySymbol = originalValue.replace(/[\d.]+/, '').trim();
        valueElement.textContent = ` ${currencySymbol}${newValue}`;
        valueElement.style.opacity = '1';
        valueElement.style.color = direction > 0 ? '#4CAF50' : '#F44336';
    }, 300);
    
    // Reset back to original value
    setTimeout(() => {
        valueElement.style.opacity = '0';
        
        setTimeout(() => {
            valueElement.textContent = originalValue;
            valueElement.style.color = '';
            valueElement.style.opacity = '1';
            currency.classList.remove('pulse-currency');
        }, 300);
    }, 1500);
}

// Add style for currency animation
const currencyStyle = document.createElement('style');
currencyStyle.textContent = `
    .pulse-currency {
        animation: pulse-currency 0.5s ease-in-out;
    }
    
    .currency-value {
        display: inline-block;
        transition: opacity 0.3s ease, color 0.3s ease;
    }
    
    @keyframes pulse-currency {
        0% {
            transform: scale(1);
            box-shadow: none;
        }
        50% {
            transform: scale(1.05);
            box-shadow: 0 0 10px rgba(255, 193, 7, 0.5);
        }
        100% {
            transform: scale(1);
            box-shadow: none;
        }
    }
`;
document.head.appendChild(currencyStyle);

// Add smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 100,
                behavior: 'smooth'
            });
        }
    });
});

// Add dynamic countdown timer for bonuses
function createCountdownTimer() {
    const timerContainer = document.createElement('div');
    timerContainer.classList.add('bonus-countdown');
    
    // Set end time to 24 hours from now
    const endTime = new Date();
    endTime.setHours(endTime.getHours() + 24);
    
    // Create timer elements
    const timerDisplay = document.createElement('div');
    timerDisplay.classList.add('timer-display');
    
    const timerLabel = document.createElement('span');
    timerLabel.classList.add('timer-label');
    timerLabel.textContent = 'Bonus Ends In:';
    
    const timeValue = document.createElement('span');
    timeValue.classList.add('time-value');
    
    timerDisplay.appendChild(timerLabel);
    timerDisplay.appendChild(timeValue);
    timerContainer.appendChild(timerDisplay);
    
    // Insert before the action buttons
    const actionButtons = document.querySelector('.action-buttons');
    if (actionButtons) {
        actionButtons.parentNode.insertBefore(timerContainer, actionButtons);
    }
    
    // Update the countdown every second
    function updateCountdown() {
        const now = new Date();
        const distance = endTime - now;
        
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        timeValue.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        if (distance < 0) {
            clearInterval(countdownInterval);
            timeValue.textContent = '00:00:00';
        }
    }
    
    // Initial call
    updateCountdown();
    
    // Update every second
    const countdownInterval = setInterval(updateCountdown, 1000);
    
    // Add styles
    const countdownStyles = document.createElement('style');
    countdownStyles.textContent = `
        .bonus-countdown {
            margin: 2rem auto;
            text-align: center;
        }
        
        .timer-display {
            background: rgba(0, 0, 0, 0.5);
            border-radius: 10px;
            padding: 1rem;
            display: inline-block;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
            border: 1px solid var(--primary);
        }
        
        .timer-label {
            display: block;
            color: var(--primary);
            font-weight: 600;
            margin-bottom: 0.5rem;
            font-size: 1rem;
        }
        
        .time-value {
            font-size: 2rem;
            font-weight: 700;
            color: white;
            font-family: 'Courier New', monospace;
            background: linear-gradient(to right, var(--primary), #ff9800);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
    `;
    document.head.appendChild(countdownStyles);
}

// Call the function to create countdown timer
createCountdownTimer();

// Create animated coins on background
function createAnimatedCoins() {
    const coinsContainer = document.getElementById('coins-container');
    const numberOfCoins = 15;
    
    for (let i = 0; i < numberOfCoins; i++) {
        const coin = document.createElement('div');
        coin.classList.add('coin');
        
        // Random positioning
        coin.style.left = `${Math.random() * 100}%`;
        coin.style.top = `${Math.random() * 100}%`;
        
        // Random size
        const size = 20 + Math.random() * 20;
        coin.style.width = `${size}px`;
        coin.style.height = `${size}px`;
        coin.style.background = 'linear-gradient(145deg, #ffd700, #ffb300)';
        coin.style.borderRadius = '50%';
        coin.style.boxShadow = '0 0 10px rgba(255, 215, 0, 0.5)';
        coin.style.opacity = '0.15';
        coin.style.zIndex = '-1';
        
        // Add dollar sign
        const dollarSign = document.createElement('span');
        dollarSign.textContent = '$';
        dollarSign.style.position = 'absolute';
        dollarSign.style.top = '50%';
        dollarSign.style.left = '50%';
        dollarSign.style.transform = 'translate(-50%, -50%)';
        dollarSign.style.color = '#fff';
        dollarSign.style.fontWeight = 'bold';
        dollarSign.style.fontSize = '16px';
        
        coin.appendChild(dollarSign);
        
        // Random animation duration
        const duration = 15 + Math.random() * 20;
        
        // Apply animation
        coin.style.animation = `coin-float ${duration}s linear infinite`;
        
        // Random animation delay
        coin.style.animationDelay = `${Math.random() * 10}s`;
        
        coinsContainer.appendChild(coin);
    }
    
    // Add animation keyframes
    const coinAnimationStyle = document.createElement('style');
    coinAnimationStyle.textContent = `
        @keyframes coin-float {
            0% {
                transform: translateY(0) rotate(0deg) scale(1);
            }
            25% {
                transform: translateY(-100px) rotate(90deg) scale(0.8);
            }
            50% {
                transform: translateY(-200px) rotate(180deg) scale(1);
            }
            75% {
                transform: translateY(-100px) rotate(270deg) scale(0.8);
            }
            100% {
                transform: translateY(0) rotate(360deg) scale(1);
            }
        }
    `;
    document.head.appendChild(coinAnimationStyle);
}

// Category filter functionality
function initCategoryFilter() {
    const searchInput = document.querySelector('.search-box input');
    const menuItems = document.querySelectorAll('.menu-categories li');
    const resetButton = document.getElementById('reset-filter');
    
    if (!searchInput || !menuItems.length) return;
    
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase().trim();
        
        menuItems.forEach(item => {
            const categoryText = item.querySelector('span').textContent.toLowerCase();
            
            if (searchTerm === '' || categoryText.includes(searchTerm)) {
                item.style.display = 'block';
                
                // Highlight matching text if there's a search term
                if (searchTerm !== '') {
                    const span = item.querySelector('span');
                    const text = span.textContent;
                    const index = text.toLowerCase().indexOf(searchTerm);
                    
                    if (index >= 0) {
                        span.innerHTML = text.substring(0, index) + 
                                        '<span class="highlight">' + 
                                        text.substring(index, index + searchTerm.length) + 
                                        '</span>' + 
                                        text.substring(index + searchTerm.length);
                    }
                } else {
                    // Reset highlight
                    const span = item.querySelector('span');
                    span.innerHTML = span.textContent;
                }
            } else {
                item.style.display = 'none';
            }
        });
        
        // Show "no results" message if all items are hidden
        let allHidden = true;
        menuItems.forEach(item => {
            if (item.style.display !== 'none') {
                allHidden = false;
            }
        });
        
        // Create or update "no results" message
        let noResults = document.querySelector('.no-results-message');
        if (allHidden && searchTerm !== '') {
            if (!noResults) {
                noResults = document.createElement('div');
                noResults.classList.add('no-results-message');
                document.querySelector('.menu-categories').appendChild(noResults);
            }
            noResults.textContent = `No categories found for "${searchTerm}"`;
            noResults.style.display = 'block';
        } else if (noResults) {
            noResults.style.display = 'none';
        }
    });
    
    // Add click event to categories
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all items
            menuItems.forEach(i => i.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
            
            // Get category value from the span
            const category = this.querySelector('span').textContent.toLowerCase();
            
            // You can add filtering logic here for the main content based on the selected category
            filterGamesByCategory(category);
        });
    });
    
    // Reset filter button
    if (resetButton) {
        resetButton.addEventListener('click', function() {
            // Clear search input
            searchInput.value = '';
            
            // Show all categories
            menuItems.forEach(item => {
                item.style.display = 'block';
                item.classList.remove('active');
                
                // Reset highlight
                const span = item.querySelector('span');
                span.innerHTML = span.textContent;
            });
            
            // Hide no results message
            const noResults = document.querySelector('.no-results-message');
            if (noResults) {
                noResults.style.display = 'none';
            }
            
            // Reset game cards
            resetGameFilters();
            
            // Add animation effect
            resetButton.classList.add('btn-active');
            setTimeout(() => {
                resetButton.classList.remove('btn-active');
            }, 300);
        });
    }
}

// Reset game filters
function resetGameFilters() {
    const gameCards = document.querySelectorAll('.game-card');
    
    if (!gameCards.length) return;
    
    // Show animation for resetting
    const content = document.querySelector('.content');
    if (content) {
        content.classList.add('filtering');
        setTimeout(() => {
            content.classList.remove('filtering');
        }, 500);
    }
    
    // Show all game cards with animation
    gameCards.forEach(card => {
        card.style.display = 'block';
        card.classList.add('highlight-animation');
        setTimeout(() => {
            card.classList.remove('highlight-animation');
        }, 1000);
    });
}

// Filter games by category
function filterGamesByCategory(category) {
    const gameCards = document.querySelectorAll('.game-card');
    
    if (!gameCards.length) return;
    
    // Show animation for filtering
    const content = document.querySelector('.content');
    if (content) {
        content.classList.add('filtering');
        setTimeout(() => {
            content.classList.remove('filtering');
        }, 500);
    }
    
    // For demonstration, we'll just log the category
    console.log(`Filtering by category: ${category}`);
    
    // In a real implementation, you would filter the game cards based on their categories
    // This is a simplified example that just adds a highlight effect
    gameCards.forEach(card => {
        // For demo purposes, we'll randomly show/hide cards
        // In a real implementation, you would check if the card belongs to the selected category
        const randomBelongs = Math.random() > 0.3;
        
        if (category === 'trending' || category === 'all' || randomBelongs) {
            card.style.display = 'block';
            card.classList.add('highlight-animation');
            setTimeout(() => {
                card.classList.remove('highlight-animation');
            }, 1000);
        } else {
            card.style.display = 'none';
        }
    });
}

// Add mobile menu and other missing styles
const generalStyles = document.createElement('style');
generalStyles.textContent = `
    .shimmer {
        position: relative;
        overflow: hidden;
    }
    
    .shimmer::after {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
        animation: shimmer 2s infinite;
    }
    
    @keyframes shimmer {
        100% {
            left: 100%;
        }
    }

    .mobile-menu-toggle {
        display: none;
    }
    
    @media (max-width: 992px) {
        .mobile-menu-toggle {
            display: block;
            background: none;
            border: none;
            color: var(--light);
            font-size: 1.5rem;
            cursor: pointer;
        }
        
        .main-nav {
            display: none;
            width: 100%;
            flex-direction: column;
            align-items: center;
        }
        
        .main-nav.show {
            display: flex;
        }
        
        .main-nav a {
            margin: 0.5rem 0;
        }
    }
`;
document.head.appendChild(generalStyles); 