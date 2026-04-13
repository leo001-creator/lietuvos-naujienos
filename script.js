let naujienos = [];

// Užkrauti naujienas
fetch("data/news.json")
    .then(res => res.json())
    .then(data => {
        naujienos = data;
        rodytiNaujienas(data);
        rodytiStraipsni();
    });

// Rodyti naujienas
function rodytiNaujienas(sarasas) {
    const konteineris = document.getElementById("naujienuKonteineris");
    if (!konteineris) return;

    konteineris.innerHTML = "";
    sarasas.forEach(n => {
        konteineris.innerHTML += `
            <div class="kortele">
                <img src="${n.image}" alt="${n.title}">
                <h3>${n.title}</h3>
                <p>${n.description}</p>
                <a href="article.html?id=${n.id}">Skaityti daugiau</a>
            </div>
        `;
    });
}

// Filtruoti
function filtruotiNaujienas(kategorija) {
    if (kategorija === "Visos") {
        rodytiNaujienas(naujienos);
    } else {
        const filtruotos = naujienos.filter(n => n.category === kategorija);
        rodytiNaujienas(filtruotos);
    }
}

// Paieška
document.addEventListener("DOMContentLoaded", () => {
    const paieska = document.getElementById("paieska");
    if (paieska) {
        paieska.addEventListener("input", () => {
            const tekstas = paieska.value.toLowerCase();
            const rezultatai = naujienos.filter(n =>
                n.title.toLowerCase().includes(tekstas)
            );
            rodytiNaujienas(rezultatai);
        });
    }
});

// Straipsnio rodymas
function rodytiStraipsni() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    if (!id) return;

    fetch("data/news.json")
        .then(res => res.json())
        .then(data => {
            const straipsnis = data.find(n => n.id == id);
            if (!straipsnis) return;

            document.getElementById("pavadinimas").textContent = straipsnis.title;
            document.getElementById("nuotrauka").src = straipsnis.image;
            document.getElementById("turinys").textContent = straipsnis.content;
        });
}

// Tamsus režimas
document.addEventListener("DOMContentLoaded", () => {
    const mygtukas = document.getElementById("temosMygtukas");
    if (mygtukas) {
        mygtukas.addEventListener("click", () => {
            document.body.classList.toggle("tamsus");
        });
    }
});

// Prenumerata
function prenumeruoti() {
    const elPastas = document.getElementById("elPastas").value;
    const zinute = document.getElementById("zinute");

    if (elPastas.includes("@")) {
        zinute.textContent = "Sėkmingai prenumeruota!";
        zinute.style.color = "green";
    } else {
        zinute.textContent = "Įveskite teisingą el. paštą!";
        zinute.style.color = "red";
    }
}

// Mygtukas „Į viršų“
window.onscroll = function () {
    const mygtukas = document.getElementById("virsus");
    if (mygtukas) {
        mygtukas.style.display =
            document.documentElement.scrollTop > 200 ? "block" : "none";
    }
};

function iViršu() {
    window.scrollTo({ top: 0, behavior: "smooth" });
}
