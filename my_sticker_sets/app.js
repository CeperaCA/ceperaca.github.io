// ====== ИНИЦИАЛИЗАЦИЯ MAX BRIDGE ======
const webApp = window.WebApp;
if (webApp) {
    webApp.ready?.();
    webApp.expand?.();
} else {
    console.warn("MAX Bridge не обнаружен. Работаем в обычном браузере.");
}

// ====== ЗАГРУЗКА ДАННЫХ ======
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

// ====== РЕНДЕР КАТАЛОГА ======
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

// ====== ОТКРЫТИЕ ССЫЛКИ ======
function openSet(url) {
    const wa = window.WebApp;
    // openLink открывает ссылку во внешнем браузере и НЕ закрывает мини-приложение
    if (wa && typeof wa.openLink === 'function') {
        wa.openLink(url);
    } else {
        // Фолбэк для обычного браузера
        window.open(url, '_blank');
    }
}

// ====== СТАРТ ======
(async () => {
    const ok = await loadSets();
    if (ok) renderCatalog();
})();