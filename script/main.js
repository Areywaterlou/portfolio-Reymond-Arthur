/* ==============================
   PORTFOLIO – ARTHUR REYMOND
   main.js
   ============================== */

// ========== MODALES ==========
function openModal(id) {
    const modal = document.getElementById(id);
    if (!modal) return;
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(() => requestAnimationFrame(() => modal.classList.add('modal--open')));
    const closeBtn = modal.querySelector('.close');
    if (closeBtn) closeBtn.focus();
}

function closeModal(id) {
    const modal = document.getElementById(id);
    if (!modal) return;
    modal.classList.remove('modal--open');
    modal.addEventListener('transitionend', () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }, { once: true });
}

window.addEventListener('click', e => {
    if (e.target.classList.contains('modal')) closeModal(e.target.id);
});

window.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal').forEach(m => {
            if (m.style.display === 'flex') closeModal(m.id);
        });
    }
});

// ========== FILTRES SEMESTRE ==========
document.addEventListener('DOMContentLoaded', () => {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const cards   = document.querySelectorAll('.project-card');

    // Au chargement : toutes les cartes visibles, sans classes reveal/hidden parasites
    cards.forEach(card => {
        card.classList.remove('reveal'); // on retire la classe reveal pour les project-cards
        card.style.opacity    = '1';
        card.style.transform  = 'none';
        card.style.display    = 'flex';
    });

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Mise à jour des boutons actifs
            tabBtns.forEach(b => {
                b.classList.remove('active');
                b.setAttribute('aria-selected', 'false');
            });
            btn.classList.add('active');
            btn.setAttribute('aria-selected', 'true');

            const filter = btn.dataset.filter;

            cards.forEach((card, i) => {
                const match = filter === 'all' || card.dataset.semester === filter;

                if (match) {
                    card.style.display = 'flex';
                    card.style.transitionDelay = `${i * 40}ms`;
                    // Forcer le reflow pour que la transition se déclenche bien
                    void card.offsetWidth;
                    card.style.opacity   = '1';
                    card.style.transform = 'translateY(0) scale(1)';
                } else {
                    card.style.transitionDelay = '0ms';
                    card.style.opacity   = '0';
                    card.style.transform = 'translateY(10px) scale(0.96)';
                    card.addEventListener('transitionend', () => {
                        if (card.style.opacity === '0') card.style.display = 'none';
                    }, { once: true });
                }
            });
        });
    });

    // ========== SCROLL REVEAL (hors project-cards) ==========
    const revealObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el    = entry.target;
                const delay = parseInt(el.dataset.delay || 0);
                setTimeout(() => el.classList.add('revealed'), delay);
                revealObserver.unobserve(el);
            }
        });
    }, { threshold: 0.1 });

    // On observe les éléments .reveal qui NE SONT PAS des project-cards
    document.querySelectorAll('.reveal').forEach(el => {
        revealObserver.observe(el);
    });
});