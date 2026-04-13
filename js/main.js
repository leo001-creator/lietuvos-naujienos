// news.js

// Functionality for news filtering, search, and theme switching

const newsItems = [
    { title: 'Local News 1', theme: 'local' },
    { title: 'Sports News 1', theme: 'sports' },
    { title: 'Technology News 1', theme: 'technology' },
    // Add more news items here
];

function filterNewsByTheme(theme) {
    return newsItems.filter(item => item.theme === theme);
}

function searchNews(query) {
    return newsItems.filter(item => item.title.toLowerCase().includes(query.toLowerCase()));
}

function switchTheme(theme) {
    document.body.className = theme;
}

// Example of how to use the functions
console.log(filterNewsByTheme('local'));
console.log(searchNews('sports'));
// Call switchTheme('dark') or switchTheme('light') as needed