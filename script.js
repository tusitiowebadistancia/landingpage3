// Calcula la altura real del header para posicionar el menú mobile debajo
function updateHeaderHeight() {
    const header = document.querySelector('.main-header');
    if (!header) return;
    const height = header.offsetHeight;
    document.documentElement.style.setProperty('--header-height', height + 'px');
}

// Controla la apertura/cierre del menú mobile y el scroll del body
function setupMobileMenu() {
    const toggle = document.querySelector('.menu-toggle');
    const mobileNav = document.getElementById('mobileNav');

    if (!toggle || !mobileNav) return;

    function closeMenu() {
        mobileNav.classList.remove('open');
        document.body.classList.remove('no-scroll');
    }

    toggle.addEventListener('click', () => {
        const isOpen = mobileNav.classList.toggle('open');
        document.body.classList.toggle('no-scroll', isOpen);
    });

    // Cerrar menú al hacer click en un enlace
    mobileNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            closeMenu();
        });
    });
}

// Scroll suave para botones que tengan data-scroll-to
function setupSmoothScrollButtons() {
    document.querySelectorAll('[data-scroll-to]').forEach(btn => {
        btn.addEventListener('click', () => {
            const targetSelector = btn.getAttribute('data-scroll-to');
            const target = document.querySelector(targetSelector);
            if (!target) return;

            const header = document.querySelector('.main-header');
            const headerHeight = header ? header.offsetHeight : 0;
            const rect = target.getBoundingClientRect();
            const offset = rect.top + window.scrollY - (headerHeight + 16);

            window.scrollTo({
                top: offset,
                behavior: 'smooth'
            });
        });
    });
}

// Año dinámico en el footer
function setupYear() {
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    updateHeaderHeight();
    setupMobileMenu();
    setupSmoothScrollButtons();
    setupYear();
});

window.addEventListener('resize', () => {
    updateHeaderHeight();
});
