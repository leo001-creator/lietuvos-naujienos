let news = JSON.parse(localStorage.getItem("news")) || [];

function saveNews() {
    localStorage.setItem("news", JSON.stringify(news));
}

function addNews() {
    const title = document.getElementById("title").value;
    const image = document.getElementById("image").value;
    const category = document.getElementById("category").value;
    const content = document.getElementById("content").value;

    if (!title || !content) {
        alert("Užpildykite visus laukus!");
        return;
    }

    const article = {
        id: Date.now(),
        title,
        image,
        category,
        content
    };

    news.push(article);
    saveNews();
    renderAdminNews();
    alert("Naujiena pridėta!");
}

function deleteNews(id) {
    news = news.filter(n => n.id !== id);
    saveNews();
    renderAdminNews();
}

function renderAdminNews() {
    const container = document.getElementById("adminNews");
    container.innerHTML = "";

    news.forEach(n => {
        container.innerHTML += `
            <div class="news-card">
                <h3>${n.title}</h3>
                <button onclick="deleteNews(${n.id})">Ištrinti</button>
            </div>
        `;
    });
}

renderAdminNews();
