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

// ========== INIT ========== 
document.addEventListener('DOMContentLoaded', () => {

    // ---- SCROLL REVEAL pour skill-cards et autres éléments .reveal (PAS les project-cards) ----
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

    document.querySelectorAll('.reveal:not(.project-card)').forEach(el => {
        revealObserver.observe(el);
    });

    // ---- CARTES PROJETS : visibles d'emblée, pas de scroll reveal ----
    document.querySelectorAll('.project-card').forEach(card => {
        card.classList.remove('reveal');
        card.style.opacity   = '1';
        card.style.transform = 'none';
        card.style.display   = 'flex';
    });

    // ---- FILTRES SEMESTRE ----
    const tabBtns = document.querySelectorAll('.tab-btn');
    const cards   = document.querySelectorAll('.project-card');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => {
                b.classList.remove('active');
                b.setAttribute('aria-selected', 'false');
            });
            btn.classList.add('active');
            btn.setAttribute('aria-selected', 'true');

            const filter = btn.dataset.filter;
            let visibleIndex = 0;

            cards.forEach(card => {
                const match = filter === 'all' || card.dataset.semester === filter;

                if (match) {
                    card.style.display = 'flex';
                    const delay = visibleIndex * 60;
                    visibleIndex++;
                    // reflow avant la transition
                    void card.offsetWidth;
                    card.style.transitionDelay = `${delay}ms`;
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
});