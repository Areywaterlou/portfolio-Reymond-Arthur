/* PORTFOLIO – ARTHUR REYMOND · main.js */

// ===== MODALES =====
function openModal(id) {
    const m = document.getElementById(id);
    if (!m) return;
    m.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(() => requestAnimationFrame(() => m.classList.add('modal--open')));
    const btn = m.querySelector('.close');
    if (btn) btn.focus();
}
function closeModal(id) {
    const m = document.getElementById(id);
    if (!m) return;
    m.classList.remove('modal--open');
    m.addEventListener('transitionend', () => {
        m.style.display = 'none';
        document.body.style.overflow = 'auto';
    }, { once: true });
}
window.addEventListener('click', e => { if (e.target.classList.contains('modal')) closeModal(e.target.id); });
window.addEventListener('keydown', e => {
    if (e.key === 'Escape') document.querySelectorAll('.modal').forEach(m => { if (m.style.display === 'flex') closeModal(m.id); });
});

// ===== FILTRES =====
function initFilters() {
    const tabs  = document.querySelectorAll('.tab-btn');
    const cards = document.querySelectorAll('.project-card');

    if (!tabs.length || !cards.length) return;

    // Toutes les cartes visibles au départ
    cards.forEach(c => { c.style.display = 'flex'; });

    tabs.forEach(btn => {
        btn.addEventListener('click', () => {
            tabs.forEach(b => { b.classList.remove('active'); b.setAttribute('aria-selected', 'false'); });
            btn.classList.add('active');
            btn.setAttribute('aria-selected', 'true');

            const filter = btn.dataset.filter;
            let idx = 0;
            cards.forEach(card => {
                if (filter === 'all' || card.dataset.semester === filter) {
                    card.style.display = 'flex';
                    card.style.animationDelay = `${idx++ * 50}ms`;
                    card.classList.remove('card-enter');
                    void card.offsetWidth; // reflow
                    card.classList.add('card-enter');
                } else {
                    card.style.display = 'none';
                    card.classList.remove('card-enter');
                }
            });
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initFilters();

    // ===== SCROLL REVEAL skill-cards (JS only, zéro CSS) =====
    document.querySelectorAll('.skill-main-card').forEach(el => {
        el.style.cssText += 'opacity:0;transform:translateY(28px);transition:opacity .6s ease,transform .6s ease;';
        const delay = parseInt(el.dataset.delay || 0);
        new IntersectionObserver(([entry], obs) => {
            if (!entry.isIntersecting) return;
            setTimeout(() => { el.style.opacity = '1'; el.style.transform = 'none'; }, delay);
            obs.disconnect();
        }, { threshold: 0.15 }).observe(el);
    });
});