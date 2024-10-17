export const setLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
};

export const getLocalStorage = (key) => {
    const value = localStorage.getItem(key);
    if (value) return JSON.parse(value);
    return null;
};

export const removeLocalStorage = (key) => {
    localStorage.removeItem(key);
};

export const convertToEmbedUrl = (watchUrl) => {
    const url = new URL(watchUrl);
    const videoId = url.searchParams.get('v');
    return `https://www.youtube.com/embed/${videoId}`;
}