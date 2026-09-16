let CONFIG = null;

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
  theadEl.innerHTML = "";
  tbodyEl.innerHTML = "";

  const trh = document.createElement("tr");
  headers.forEach(h => {
    const th = document.createElement("th");
    th.textContent = h;
    trh.appendChild(th);
  });
  theadEl.appendChild(trh);

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
      td.textContent = r[i] ?? "";
      tr.appendChild(td);
    }
    tbodyEl.appendChild(tr);
  });
}

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