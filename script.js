const email = 'iamivanntresor999@gmail.com';
const toast = document.getElementById('toast');
const copyEmailBtn = document.getElementById('copyEmailBtn');
const shareBtn = document.getElementById('shareBtn');
const backTopBtn = document.getElementById('backTopBtn');
const liveClock = document.getElementById('liveClock');
const visitorCount = document.getElementById('visitorCount');
const searchInput = document.getElementById('searchInput');
const filterButtons = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('.product-card');

/* ---------- Toast ---------- */
function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(showToast.timer);
    showToast.timer = setTimeout(() => toast.classList.remove('show'), 2200);
}

/* ---------- Actions ---------- */
async function copyEmail() {
    try {
        await navigator.clipboard.writeText(email);
        showToast('Email copié avec succès');
    } catch (error) {
        showToast('Impossible de copier l’email');
    }
}

async function shareProfile() {
    const shareData = {
        title: 'Triple Nine',
        text: 'Retrouve tous mes liens et mes offres ici.',
        url: window.location.href
    };
    try {
        if (navigator.share) {
            await navigator.share(shareData);
            showToast('Profil partagé');
        } else {
            await navigator.clipboard.writeText(window.location.href);
            showToast('Lien du profil copié');
        }
    } catch (error) {
        showToast('Partage annulé');
    }
}

function updateClock() {
    liveClock.textContent = new Date().toLocaleTimeString('fr-FR');
}

function animateVisitors() {
    let current = 0;
    const target = 1400;
    const step = Math.ceil(target / 60);
    const interval = setInterval(() => {
        current += step;
        if (current >= target) {
            current = target;
            clearInterval(interval);
        }
        visitorCount.textContent = current.toLocaleString('fr-FR');
    }, 28);
}

/* ---------- Filtres / recherche ---------- */
function applyFilters() {
    const activeFilter = document.querySelector('.filter-btn.active')?.dataset.filter || 'all';
    const searchValue = searchInput.value.toLowerCase().trim();

    productCards.forEach(card => {
        const filterMatch = activeFilter === 'all' || card.dataset.category === activeFilter;
        const searchMatch = card.dataset.name.toLowerCase().includes(searchValue);
        card.classList.toggle('hidden', !(filterMatch && searchMatch));
    });
}

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        applyFilters();
    });
});

copyEmailBtn?.addEventListener('click', copyEmail);
shareBtn?.addEventListener('click', shareProfile);
backTopBtn?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
searchInput?.addEventListener('input', applyFilters);

/* ---------- Liquid Glass ---------- */
function initLiquidGlass() {
    if (!window.LiquidGlass) return;

    // Réglages communs : verre sombre, reflet orangé discret
    const base = {
        surface: 'convex_squircle',
        glassThickness: 80,
        bezelWidth: 40,
        refractiveIndex: 3.0,      // fort = vraie goutte d'eau
        scaleRatio: 1.6,
        blur: 0.3,                 // quasi aucun flou : on veut la déformation, pas le flou
        specularOpacity: 0.5,
        specularSaturation: 4,
        innerShadowColor: '#ffffff',
        innerShadowBlur: 20,
        innerShadowSpread: -5,
        tintColor: '#ffffff',
        tintOpacity: 0.06,         // verre presque invisible
        outerShadowBlur: 24,
        fallbackBlur: 14,
        interactive: false
    };

    const presets = {
        hero:    { radius: 36, bezelWidth: 36 },
        social:  { radius: 26, bezelWidth: 24 },
        product: { radius: 28, bezelWidth: 28 },
        chip:    { radius: 20, bezelWidth: 14, glassThickness: 50 },
        // le dock gonfle et rebondit au toucher
        dock:    { radius: 999, bezelWidth: 30, interactive: true, pressScale: 1.06 }
    };

    document.querySelectorAll('.product-card').forEach(c => c.dataset.glass = 'product');
    document.querySelectorAll('[data-glass]').forEach(el => {
        const preset = presets[el.dataset.glass] || {};
        LiquidGlass.apply(el, { ...base, ...preset });
    });
}

/* ---------- Démarrage ---------- */
updateClock();
setInterval(updateClock, 1000);
animateVisitors();
initLiquidGlass();
