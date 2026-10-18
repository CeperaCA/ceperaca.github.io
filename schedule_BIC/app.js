let CONFIG = null;

const BELL_SCHEDULE = {
  weekdays: [
    { firstStart: "08:00", firstEnd: "08:45", secondStart: "08:50", secondEnd: "09:35" },
    { firstStart: "09:45", firstEnd: "10:30", secondStart: "10:35", secondEnd: "11:20" },
    { firstStart: "12:20", firstEnd: "13:05", secondStart: "13:10", secondEnd: "13:55" },
    { firstStart: "14:05", firstEnd: "14:50", secondStart: "14:55", secondEnd: "15:40" },
    { firstStart: "15:50", firstEnd: "16:35", secondStart: "16:40", secondEnd: "17:25" },
    { firstStart: "17:35", firstEnd: "18:20", secondStart: "18:25", secondEnd: "19:10" }
  ],

  saturday: [
    { firstStart: "08:00", firstEnd: "08:45", secondStart: "08:50", secondEnd: "09:35" },
    { firstStart: "09:45", firstEnd: "10:30", secondStart: "10:35", secondEnd: "11:20" },
    { firstStart: "11:30", firstEnd: "12:15", secondStart: "12:20", secondEnd: "13:05" },
    { firstStart: "13:15", firstEnd: "14:00", secondStart: "14:05", secondEnd: "14:50" },
    { firstStart: "15:00", firstEnd: "15:45", secondStart: "15:55", secondEnd: "16:40" },
    { firstStart: "16:50", firstEnd: "17:35", secondStart: "17:40", secondEnd: "18:25" }
  ]
};

const tabsEl  = document.getElementById("tabs");
const stateEl = document.getElementById("state");
const wrapEl  = document.getElementById("table-wrap");
const tableEl = document.getElementById("table");
const theadEl = tableEl.querySelector("thead");
const tbodyEl = tableEl.querySelector("tbody");

let currentSheetIndex = 0;

function initMaxBridge() {
  if (window.MaxBridge && typeof window.MaxBridge.ready === "function") {
    try { window.MaxBridge.ready(); } catch (e) {}
    return;
  }
  const s = document.createElement("script");
  s.src = "https://static.max.ru/bridge/bridge.js";
  s.async = true;
  s.onload = () => {
    if (window.MaxBridge && typeof window.MaxBridge.ready === "function") {
      try { window.MaxBridge.ready(); } catch (e) {}
    }
  };
  s.onerror = () => {
    console.warn("MAX Bridge не загрузился — мини-приложение работает без него.");
  };
  document.head.appendChild(s);
}

async function loadConfig() {
  const res = await fetch("config.json", { cache: "no-store" });
  if (!res.ok) throw new Error("HTTP " + res.status);
  return res.json();
}

function buildGvizUrl(sheet) {
  const base = `https://docs.google.com/spreadsheets/d/${CONFIG.spreadsheetId}/gviz/tq`;
  const params = new URLSearchParams();
  params.set("tqx", "out:json");
  params.set("headers", "1");
  params.set("gid", sheet.gid);
  return `${base}?${params.toString()}`;
}

function parseGviz(text) {
  const start = text.indexOf("{");
  const end   = text.lastIndexOf("}");
  if (start === -1 || end === -1) throw new Error("Некорректный ответ Google");
  return JSON.parse(text.slice(start, end + 1));
}

function normalize(data) {
  const cols = (data.table && data.table.cols) || [];
  const rows = (data.table && data.table.rows) || [];

  const headers = cols.map((c, i) => (c && (c.label || c.id)) || `Колонка ${i + 1}`);

  const out = rows.map(r => (r.c || []).map(cell => {
    if (!cell) return "";
    if (typeof cell.f === "string" && cell.f.length) return cell.f;
    if (cell.v === null || cell.v === undefined) return "";
    if (typeof cell.v === "object") return "";
    return String(cell.v);
  }));

  return { headers, rows: out };
}

function renderTabs() {
  tabsEl.innerHTML = "";
  CONFIG.sheets.forEach((s, i) => {
    const btn = document.createElement("button");
    btn.className = "tab" + (i === currentSheetIndex ? " active" : "");
    btn.textContent = s.name;
    btn.addEventListener("click", () => {
      if (i === currentSheetIndex) return;
      currentSheetIndex = i;
      renderTabs();
      loadSheet();
    });
    tabsEl.appendChild(btn);
  });
}

function showState(msg, isError = false) {
  stateEl.textContent = msg;
  stateEl.className = "state" + (isError ? " error" : "");
  stateEl.style.display = "";
  wrapEl.style.display = "none";
}

function showTable() {
  stateEl.style.display = "none";
  wrapEl.style.display = "";
}

function renderTable({ headers, rows }) {
  // Заголовок таблицы (A, B, C и т. д.) не показываем.
  theadEl.innerHTML = "";
  tbodyEl.innerHTML = "";

  if (rows.length === 0) {
    const tr = document.createElement("tr");
    const td = document.createElement("td");
    td.colSpan = Math.max(1, headers.length);
    td.textContent = "Лист пуст";
    td.style.textAlign = "center";
    td.style.color = "var(--muted)";
    tr.appendChild(td);
    tbodyEl.appendChild(tr);
    return;
  }

  rows.forEach(r => {
    const tr = document.createElement("tr");
    for (let i = 0; i < headers.length; i++) {
      const td = document.createElement("td");
      const value = r[i] ?? "";

      // В первой колонке показываем день недели и дату двумя строками: "ВТ" / "06.10".
      if (i === 0 && value) {
        const normalized = String(value).replace(/\s*\n\s*/g, " ").trim();
        const match = normalized.match(/^([А-ЯЁA-Z]{2,3})\s+(\d{1,2}\.\d{1,2}(?:\.\d{2,4})?)$/i);
        if (match) {
          td.innerHTML = `<span class="day-week">${match[1]}</span><span class="day-date">${match[2]}</span>`;
        } else {
          td.textContent = value;
        }
        td.classList.add("date-cell");
      } else {
        td.textContent = value;
      }
      tr.appendChild(td);
    }
    tbodyEl.appendChild(tr);
  });

  mergeDayCells();
}

const bellsModal = document.getElementById("bells-modal");
const bellsTitle = document.getElementById("bells-title");
const bellsSubtitle = document.getElementById("bells-subtitle");
const bellsList = document.getElementById("bells-list");


function openBellsModal(dayText, pairNumber) {
  
const isSaturday = /СБ/i.test(dayText.replace(/\s+/g, " ").trim());

  const schedule = isSaturday
    ? BELL_SCHEDULE.saturday
    : BELL_SCHEDULE.weekdays;

  bellsTitle.textContent = "Звонки";
  bellsSubtitle.textContent = "";
  bellsList.replaceChildren();
  
schedule.slice(0, 6).forEach((pair, index) => {
  const item = document.createElement("div");
  item.className = "bells-item";

  if (index + 1 === pairNumber) {
    item.classList.add("active");
  }

  const number = document.createElement("span");
  number.className = "bells-number";
  number.textContent = `${index + 1}-я пара`;

  const times = document.createElement("div");
  times.className = "bells-times";

  const first = document.createElement("div");
  first.className = "bells-half";
  first.textContent = `${pair.firstStart}–${pair.firstEnd}`;

  const second = document.createElement("div");
  second.className = "bells-half";
  second.textContent = `${pair.secondStart}–${pair.secondEnd}`;

  times.append(first, second);
  item.append(number, times);
  bellsList.appendChild(item);
});

  bellsModal.classList.add("is-open");
  bellsModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function getBreakMinutes(end, start) {
  const toMinutes = time => {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
  };

  return toMinutes(start) - toMinutes(end);
}

function closeBellsModal() {
  bellsModal.classList.remove("is-open");
  bellsModal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

bellsModal.querySelectorAll("[data-close-bells]").forEach(el => {
  el.addEventListener("click", closeBellsModal);
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape" &&
      bellsModal.classList.contains("is-open")) {
    closeBellsModal();
  }
});

// Обработчик общий: работает и после переключения вкладок
tbodyEl.addEventListener("click", event => {
  const row = event.target.closest("tr");
  if (!row || !tbodyEl.contains(row)) return;

  const cells = row.querySelectorAll("td");
  if (cells.length < 2) return;

  // Ищем обозначение дня в текущей или предыдущих строках.
  let currentRow = row;
  let dayText = "";

  while (currentRow && tbodyEl.contains(currentRow)) {
    const currentCells = currentRow.querySelectorAll("td");

    if (currentCells.length >= 2) {
      const candidate = currentCells[0].textContent
        .replace(/\s+/g, " ")
        .trim();

      if (candidate) {
        dayText = candidate;
        break;
      }
    }

    currentRow = currentRow.previousElementSibling;
  }

  const isSaturday = /СБ/i.test(dayText);

  const pairText = cells[1].textContent.trim();
  const match = pairText.match(/\d+/);

  if (!match) return;

  const pairNumber = Number(match[0]);
  if (pairNumber < 1 || pairNumber > 6) return;

  // Передаём день в том же формате, который ожидает функция.
  openBellsModal(isSaturday ? "СБ" : dayText, pairNumber);
});

async function loadSheet() {
  const sheet = CONFIG.sheets[currentSheetIndex];
  showState("Загрузка…");

  try {
    const url = buildGvizUrl(sheet);
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const text = await res.text();
    const json = parseGviz(text);
    const normalized = normalize(json);
    renderTable(normalized);
    showTable();
  } catch (e) {
    console.error(e);
    showState(
      "Не удалось загрузить лист.\n" +
      "Проверьте, что таблица доступна по ссылке " +
      "(Файл → Поделиться → Все, у кого есть ссылка → Читатель) " +
      "и что в config.json верно указаны ID таблицы и gid листов.",
      true
    );
  }
}

function mergeDayCells() {
  const rows = tbodyEl.querySelectorAll("tr");

  // Убираем старые отметки перед повторным объединением
  rows.forEach(row => {
    const cell = row.cells[0];
    if (cell) {
      cell.classList.remove("last-merged-cell");
    }
  });

  for (let i = 0; i < rows.length; i += 6) {
    const firstCell = rows[i].cells[0];
    if (!firstCell) continue;

    const count = Math.min(6, rows.length - i);
    firstCell.rowSpan = count;

    // Скрываем первые ячейки в следующих пяти строках
    for (let j = 1; j < count; j++) {
      const cell = rows[i + j].cells[0];
      if (cell) cell.style.display = "none";
    }

    // Запоминаем последнюю объединённую ячейку
    if (i + count >= rows.length) {
      firstCell.classList.add("last-merged-cell");
    }
  }
}

async function main() {
  initMaxBridge();
  showState("Загрузка…");
  try {
    CONFIG = await loadConfig();
  } catch (e) {
    console.error(e);
    showState("Не удалось загрузить config.json", true);
    return;
  }
  renderTabs();
  loadSheet();
}

main();
