const API_KEY_STORAGE_KEY = 'api_key';

function storeApiKey(apiKey) {
    if (typeof apiKey !== 'string' || apiKey.trim() === '') {
        throw new Error('Invalid API key');
    }
    sessionStorage.setItem(API_KEY_STORAGE_KEY, apiKey);
}

function getApiKey() {
    return sessionStorage.getItem(API_KEY_STORAGE_KEY);
}

function clearApiKey() {
    sessionStorage.removeItem(API_KEY_STORAGE_KEY);
}

// Example usage:
// storeApiKey('your-api-key-here');
// const apiKey = getApiKey();
// console.log(apiKey);
// clearApiKey();