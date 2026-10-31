// YILDIZLI UZAY ARKA PLANI

const canvas = document.getElementById("spaceCanvas");
const ctx = canvas.getContext("2d");

let stars = [];
let width;
let height;

function resizeCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;

    stars = [];

    const count = Math.min(220, Math.floor(width * height / 5000));

    for (let i = 0; i < count; i++) {
        stars.push({
            x: Math.random() * width,
            y: Math.random() * height,
            size: Math.random() * 1.5 + 0.3,
            speed: Math.random() * 0.25 + 0.05,
            opacity: Math.random()
        });
    }
}

function animateStars() {
    ctx.clearRect(0, 0, width, height);

    stars.forEach(star => {
        star.y -= star.speed;

        if (star.y < 0) {
            star.y = height;
            star.x = Math.random() * width;
        }

        star.opacity += (Math.random() - 0.5) * 0.025;
        star.opacity = Math.max(0.2, Math.min(1, star.opacity));

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(220, 205, 255, ${star.opacity})`;
        ctx.fill();
    });

    requestAnimationFrame(animateStars);
}

resizeCanvas();
animateStars();

window.addEventListener("resize", resizeCanvas);


// ARAMA SİSTEMİ

const searchInput = document.getElementById("searchInput");
const cards = document.querySelectorAll(".card");
const noResults = document.getElementById("noResults");

searchInput.addEventListener("input", function () {
    const value = searchInput.value.toLocaleLowerCase("tr");
    let visibleCount = 0;

    cards.forEach(card => {
        const text = card.innerText.toLocaleLowerCase("tr");
        const matches = text.includes(value);

        card.style.display = matches ? "block" : "none";

        if (matches) visibleCount++;
    });

    noResults.style.display = visibleCount === 0 ? "block" : "none";
});


// GECE VE GÜNDÜZ TEMASI

const themeButton = document.getElementById("themeButton");

themeButton.addEventListener("click", function () {
    document.body.classList.toggle("light");

    themeButton.textContent =
        document.body.classList.contains("light") ? "☀" : "☾";
});