export function saveToLS(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.error('Error saving to LocalStorage:', error)
    }
}

export function loadFromLS(key) {
    const data = localStorage.getItem(key);

    try {
        return JSON.parse(data);
    } catch (error) {
        console.error('Error loading from LocalStorage:', error);
        return null;
    }
}