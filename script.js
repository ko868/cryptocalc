// DOM Elements
const cryptoSelect = document.getElementById('crypto-select');
const cryptoAmount = document.getElementById('crypto-amount');
const cryptoSymbol = document.getElementById('crypto-symbol');
const currencySelect = document.getElementById('currency-select');
const targetCryptoSelect = document.getElementById('target-crypto-select');
const resultDisplay = document.getElementById('result-display');
const currentPrice = document.getElementById('current-price');
const priceChange = document.getElementById('price-change');
const lastUpdate = document.getElementById('last-update');
const themeToggle = document.getElementById('theme-toggle');
const fiatModeBtn = document.getElementById('fiat-mode-btn');
const cryptoModeBtn = document.getElementById('crypto-mode-btn');
const swapButton = document.getElementById('swap-button');
const fiatSelectWrapper = document.getElementById('fiat-select-wrapper');
const cryptoSelectWrapper = document.getElementById('crypto-select-wrapper');
const targetLabel = document.getElementById('target-label');

// State
let cryptoData = {};
let updateInterval;
let conversionMode = 'fiat'; // 'fiat' or 'crypto'

// Theme Management
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);

    themeToggle.style.transform = 'scale(0.9) rotate(180deg)';
    setTimeout(() => {
        themeToggle.style.transform = '';
    }, 300);
}

// Mode Management
function switchMode(mode) {
    conversionMode = mode;

    if (mode === 'fiat') {
        fiatModeBtn.classList.add('active');
        cryptoModeBtn.classList.remove('active');
        fiatSelectWrapper.style.display = 'block';
        cryptoSelectWrapper.style.display = 'none';
        targetLabel.textContent = 'Convert To Currency';
        swapButton.style.display = 'none';
    } else {
        cryptoModeBtn.classList.add('active');
        fiatModeBtn.classList.remove('active');
        fiatSelectWrapper.style.display = 'none';
        cryptoSelectWrapper.style.display = 'block';
        targetLabel.textContent = 'Convert To Cryptocurrency';
        swapButton.style.display = 'flex';
    }

    fetchCryptoData();
}

// Swap cryptocurrencies
function swapCryptos() {
    const fromCrypto = cryptoSelect.value;
    const fromSymbol = cryptoSelect.options[cryptoSelect.selectedIndex].getAttribute('data-symbol');
    const toCrypto = targetCryptoSelect.value;
    const toSymbol = targetCryptoSelect.options[targetCryptoSelect.selectedIndex].getAttribute('data-symbol');

    // Swap values
    cryptoSelect.value = toCrypto;
    targetCryptoSelect.value = fromCrypto;

    // Update symbols
    updateCryptoSymbol();

    // Add animation
    swapButton.style.transform = 'translateY(-50%) rotate(180deg)';
    setTimeout(() => {
        swapButton.style.transform = 'translateY(-50%) rotate(0deg)';
    }, 300);

    // Recalculate
    fetchCryptoData();
}

// Initialize
function init() {
    initTheme();

    // Event Listeners
    themeToggle.addEventListener('click', toggleTheme);
    fiatModeBtn.addEventListener('click', () => switchMode('fiat'));
    cryptoModeBtn.addEventListener('click', () => switchMode('crypto'));
    swapButton.addEventListener('click', swapCryptos);

    cryptoSelect.addEventListener('change', () => {
        updateCryptoSymbol();
        fetchCryptoData();
    });

    currencySelect.addEventListener('change', () => {
        if (conversionMode === 'fiat') {
            calculateConversion();
        }
    });

    targetCryptoSelect.addEventListener('change', () => {
        if (conversionMode === 'crypto') {
            fetchCryptoData();
        }
    });

    cryptoAmount.addEventListener('input', () => {
        calculateConversion();
    });

    updateCryptoSymbol();
    fetchCryptoData();

    // Auto-update every 30 seconds
    updateInterval = setInterval(fetchCryptoData, 30000);
}

// Update crypto symbol display
function updateCryptoSymbol() {
    const selectedOption = cryptoSelect.options[cryptoSelect.selectedIndex];
    const symbol = selectedOption.getAttribute('data-symbol');
    cryptoSymbol.textContent = symbol;
}

// Fetch cryptocurrency data from CoinGecko API
async function fetchCryptoData() {
    try {
        const crypto = cryptoSelect.value;

        // Show loading state
        resultDisplay.innerHTML = '<div class="loading"><span class="loading-spinner">⏳</span>Calculating...</div>';

        if (conversionMode === 'fiat') {
            // Fetch fiat conversion data
            const currency = currencySelect.value;
            const response = await fetch(
                `https://api.coingecko.com/api/v3/simple/price?ids=${crypto}&vs_currencies=${currency}&include_24hr_change=true`
            );

            if (!response.ok) {
                throw new Error('API request failed');
            }

            const data = await response.json();
            cryptoData = data[crypto];

            calculateConversion();
            updatePriceInfo();
        } else {
            // Fetch crypto-to-crypto conversion data
            const targetCrypto = targetCryptoSelect.value;
            const response = await fetch(
                `https://api.coingecko.com/api/v3/simple/price?ids=${crypto},${targetCrypto}&vs_currencies=usd&include_24hr_change=true`
            );

            if (!response.ok) {
                throw new Error('API request failed');
            }

            const data = await response.json();
            cryptoData = {
                from: data[crypto],
                to: data[targetCrypto]
            };

            calculateCryptoConversion();
            updateCryptoPriceInfo();
        }

        updateLastUpdateTime();

    } catch (error) {
        console.error('Error fetching crypto data:', error);
        resultDisplay.innerHTML = '<div class="loading">⚠️ Error occurred. Please try again.</div>';
        currentPrice.textContent = 'Unable to load data';
        priceChange.textContent = '-';
    }
}

// Calculate and display fiat conversion
function calculateConversion() {
    const amount = parseFloat(cryptoAmount.value) || 0;
    const currency = currencySelect.value;

    if (!cryptoData || !cryptoData[currency]) {
        return;
    }

    const rate = cryptoData[currency];
    const result = amount * rate;

    const currencyOption = currencySelect.options[currencySelect.selectedIndex];
    const currencySymbol = currencyOption.getAttribute('data-symbol');

    const formattedResult = formatCurrency(result, currency, currencySymbol);
    resultDisplay.textContent = formattedResult;
}

// Calculate and display crypto-to-crypto conversion
function calculateCryptoConversion() {
    const amount = parseFloat(cryptoAmount.value) || 0;

    if (!cryptoData || !cryptoData.from || !cryptoData.to) {
        return;
    }

    const fromUSD = cryptoData.from.usd;
    const toUSD = cryptoData.to.usd;
    const rate = fromUSD / toUSD;
    const result = amount * rate;

    const targetOption = targetCryptoSelect.options[targetCryptoSelect.selectedIndex];
    const targetSymbol = targetOption.getAttribute('data-symbol');

    const formattedResult = formatCryptoAmount(result, targetSymbol);
    resultDisplay.textContent = formattedResult;
}

// Update price information for fiat conversion
function updatePriceInfo() {
    const currency = currencySelect.value;
    const currencyOption = currencySelect.options[currencySelect.selectedIndex];
    const currencySymbol = currencyOption.getAttribute('data-symbol');

    if (!cryptoData || !cryptoData[currency]) {
        return;
    }

    const price = cryptoData[currency];
    currentPrice.textContent = formatCurrency(price, currency, currencySymbol);

    const changeKey = `${currency}_24h_change`;
    if (cryptoData[changeKey] !== undefined) {
        const change = cryptoData[changeKey];
        const changeFormatted = change.toFixed(2);
        const changeSymbol = change >= 0 ? '+' : '';

        priceChange.textContent = `${changeSymbol}${changeFormatted}%`;
        priceChange.className = 'price-change';

        if (change >= 0) {
            priceChange.classList.add('positive');
        } else {
            priceChange.classList.add('negative');
        }
    } else {
        priceChange.textContent = '-';
        priceChange.className = 'price-change';
    }
}

// Update price information for crypto conversion
function updateCryptoPriceInfo() {
    if (!cryptoData || !cryptoData.from || !cryptoData.to) {
        return;
    }

    const fromUSD = cryptoData.from.usd;
    const toUSD = cryptoData.to.usd;
    const rate = fromUSD / toUSD;

    const targetOption = targetCryptoSelect.options[targetCryptoSelect.selectedIndex];
    const targetSymbol = targetOption.getAttribute('data-symbol');
    const fromOption = cryptoSelect.options[cryptoSelect.selectedIndex];
    const fromSymbol = fromOption.getAttribute('data-symbol');

    currentPrice.textContent = `1 ${fromSymbol} = ${formatCryptoAmount(rate, targetSymbol)}`;

    // Show USD prices in 24h change field
    if (cryptoData.from.usd_24h_change !== undefined) {
        const change = cryptoData.from.usd_24h_change;
        const changeFormatted = change.toFixed(2);
        const changeSymbol = change >= 0 ? '+' : '';

        priceChange.textContent = `${changeSymbol}${changeFormatted}%`;
        priceChange.className = 'price-change';

        if (change >= 0) {
            priceChange.classList.add('positive');
        } else {
            priceChange.classList.add('negative');
        }
    } else {
        priceChange.textContent = '-';
        priceChange.className = 'price-change';
    }
}

// Format fiat currency
function formatCurrency(value, currency, symbol) {
    let decimals = 2;

    if (currency === 'krw' || currency === 'jpy') {
        decimals = 0;
    } else if (value < 0.01 && value > 0) {
        decimals = 6;
    } else if (value < 1 && value > 0) {
        decimals = 4;
    }

    const formattedNumber = value.toLocaleString('en-US', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
    });

    if (currency === 'usd' || currency === 'aud' || currency === 'cad') {
        return `${symbol}${formattedNumber}`;
    } else if (currency === 'eur' || currency === 'gbp' || currency === 'chf') {
        return `${symbol}${formattedNumber}`;
    } else {
        return `${formattedNumber} ${symbol}`;
    }
}

// Format crypto amount
function formatCryptoAmount(value, symbol) {
    let decimals = 8;

    if (value >= 1000) {
        decimals = 2;
    } else if (value >= 1) {
        decimals = 4;
    } else if (value >= 0.01) {
        decimals = 6;
    }

    const formattedNumber = value.toLocaleString('en-US', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
    });

    return `${formattedNumber} ${symbol}`;
}

// Update last update time
function updateLastUpdateTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
    });
    lastUpdate.textContent = `⏱️ Last updated: ${timeString}`;
}

// Add smooth loading animation
function showLoading() {
    resultDisplay.innerHTML = `
        <div class="loading">
            <span class="loading-spinner">⏳</span>
            Calculating...
        </div>
    `;
}

// Handle page visibility change
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        clearInterval(updateInterval);
    } else {
        fetchCryptoData();
        updateInterval = setInterval(fetchCryptoData, 30000);
    }
});

// Clean up on page unload
window.addEventListener('beforeunload', () => {
    clearInterval(updateInterval);
});

// Start the application
init();

// Add keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.key === 'r' || e.key === 'R') {
        if (!e.target.matches('input, select')) {
            fetchCryptoData();
        }
    }

    if (e.key === 't' || e.key === 'T') {
        if (!e.target.matches('input, select')) {
            toggleTheme();
        }
    }

    if (e.key === 's' || e.key === 'S') {
        if (!e.target.matches('input, select') && conversionMode === 'crypto') {
            swapCryptos();
        }
    }
});

// Add touch-friendly interactions for mobile
if ('ontouchstart' in window) {
    document.body.classList.add('touch-device');
}

// Error handling for network issues
window.addEventListener('online', () => {
    console.log('Connection restored');
    fetchCryptoData();
});

window.addEventListener('offline', () => {
    console.log('Connection lost');
    resultDisplay.innerHTML = '<div class="loading">🌐 Please check your internet connection</div>';
});

// Add smooth scroll behavior
document.documentElement.style.scrollBehavior = 'smooth';

// Console message
console.log('%c🚀 Crypto Calculator ', 'background: #6366f1; color: white; font-size: 16px; padding: 10px; border-radius: 5px;');
console.log('%cPowered by CoinGecko API', 'color: #94a3b8; font-size: 12px;');
