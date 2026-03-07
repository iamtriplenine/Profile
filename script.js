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

function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(showToast.timer);
    showToast.timer = setTimeout(() => {
        toast.classList.remove('show');
    }, 2200);
}

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
    const now = new Date();
    liveClock.textContent = now.toLocaleTimeString('fr-FR');
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

function applyFilters() {
    const activeFilter = document.querySelector('.filter-btn.active')?.dataset.filter || 'all';
    const searchValue = searchInput.value.toLowerCase().trim();

    productCards.forEach(card => {
        const category = card.dataset.category;
        const name = card.dataset.name.toLowerCase();
        const filterMatch = activeFilter === 'all' || category === activeFilter;
        const searchMatch = name.includes(searchValue);

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

updateClock();
setInterval(updateClock, 1000);
animateVisitors();
