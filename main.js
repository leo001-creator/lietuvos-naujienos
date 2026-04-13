let news = JSON.parse(localStorage.getItem("news")) || [
    {
        id: 1,
        title: "Sveiki atvykę į Lietuvos Naujienas",
        image: "https://picsum.photos/600/400",
        category: "Lietuva",
        content: "Tai demonstracinis straipsnis."
    }
];

function saveNews() {
    localStorage.setItem("news", JSON.stringify(news));
}

function displayNews(list) {
    const container = document.getElementById("newsContainer");
    if (!container) return;

    container.innerHTML = "";
    list.forEach(n => {
        container.innerHTML += `
            <div class="news-card">
                <img src="${n.image}" alt="">
                <h3>${n.title}</h3>
                <p>${n.category}</p>
                <a href="article.html?id=${n.id}">Skaityti daugiau</a>
            </div>
        `;
    });
}

function filtruoti(category) {
    if (category === "Visos") {
        displayNews(news);
    } else {
        displayNews(news.filter(n => n.category === category));
    }
}

const searchInput = document.getElementById("search");
if (searchInput) {
    searchInput.addEventListener("input", () => {
        const value = searchInput.value.toLowerCase();
        displayNews(news.filter(n =>
            n.title.toLowerCase().includes(value)
        ));
    });
}

function loadArticle() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    if (!id) return;

    const article = news.find(n => n.id == id);
    if (!article) return;

    document.getElementById("title").textContent = article.title;
    document.getElementById("image").src = article.image;
    document.getElementById("content").textContent = article.content;
}

const themeToggle = document.getElementById("themeToggle");
if (themeToggle) {
    themeToggle.onclick = () => {
        document.body.classList.toggle("dark-mode");
    };
}

displayNews(news);
loadArticle();
saveNews();
