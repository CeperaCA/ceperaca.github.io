const AUTHOR_URL = "https://max.ru/u/f9LHodD0cOLRILY8hP7b2JKCvhjMraaup_FpnIWKTSAePC2ox04kt8nNsb8";

const webApp = window.WebApp;
if (webApp) {
    webApp.ready?.();
    if (webApp.platform !== 'desktop') {
        webApp.expand?.();
    }
}

const appContainer = document.getElementById('app');
let STICKER_SETS = [];

async function loadSets() {
    try {
        const res = await fetch('sets.json', { cache: 'no-cache' });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        STICKER_SETS = await res.json();
    } catch (e) {
        console.error('Не удалось загрузить sets.json:', e);
        appContainer.innerHTML = '<p class="error">Не удалось загрузить наборы. Попробуйте позже.</p>';
        return false;
    }
    return true;
}

function renderCatalog() {
    appContainer.innerHTML = STICKER_SETS.map((set, i) => `
        <div class="set-card" data-index="${i}">
            <img src="${set.cover}" alt="${set.name}" loading="lazy">
            <div class="set-name">${set.name}</div>
        </div>
    `).join('');

    document.querySelectorAll('.set-card').forEach(card => {
        card.addEventListener('click', () => {
            const set = STICKER_SETS[Number(card.dataset.index)];
            openSet(set.link);
        });
    });
}

function openSet(url) {
    const wa = window.WebApp;
    if (!wa) {
        window.open(url, '_blank');
        return;
    }

    if (wa.platform === 'desktop' && typeof wa.openMaxLink === 'function') {
        wa.openMaxLink(url);
        return;
    }

    if (typeof wa.openLink === 'function') {
        wa.openLink(url);
    } else {
        window.open(url, '_blank');
    }
}

function setupAuthorLink() {
    const link = document.getElementById('authorLink');
    if (!link) return;
    link.addEventListener('click', (e) => {
        e.preventDefault();
        openSet(AUTHOR_URL);
    });
}

(async () => {
    setupAuthorLink();
    const ok = await loadSets();
    if (ok) renderCatalog();
})();