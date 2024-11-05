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

export const getRankSuffix = (rank) => {
    const j = rank % 10;
    const k = rank % 100;
    if (j === 1 && k !== 11) {
        return 'st';
    }
    if (j === 2 && k !== 12) {
        return 'nd';
    }
    if (j === 3 && k !== 13) {
        return 'rd';
    }
    return 'th';
}
