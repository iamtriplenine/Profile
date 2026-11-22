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
        glassThickness: 60,
        bezelWidth: 22,
        refractiveIndex: 1.9,
        scaleRatio: 1,
        blur: 0.4,
        specularOpacity: 0.45,
        specularSaturation: 2,
        innerShadowColor: 'rgba(255, 150, 60, 0.35)',
        innerShadowBlur: 18,
        innerShadowSpread: -6,
        tintColor: '#0a0a0a',
        tintOpacity: 0.4,
        outerShadowBlur: 30,
        fallbackBlur: 14,
        interactive: false // false = le scroll tactile n'est jamais bloqué
    };

    const presets = {
        hero:   { radius: 28, bezelWidth: 26, refractiveIndex: 2.1 },
        social: { radius: 22, bezelWidth: 16, refractiveIndex: 1.8, tintOpacity: 0.45 },
        chip:   { radius: 20, bezelWidth: 10, refractiveIndex: 2.4, tintOpacity: 0.25, glassThickness: 40 },
        // le dock est la seule pièce « gélatine » : elle gonfle et rebondit au toucher
        dock:   { radius: 999, bezelWidth: 20, refractiveIndex: 2.2, tintOpacity: 0.35, interactive: true, pressScale: 1.05 }
    };

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
