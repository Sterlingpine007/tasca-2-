// Fuentes y recursos consultados para implementar Fetch y tablas:
// - https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
// - https://developer.mozilla.org/en-US/docs/Web/API/Response/json
// - https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement
// - https://developer.mozilla.org/en-US/docs/Web/API/Element/textContent
// Dataset utilizado:
// - https://opendata-ajuntament.barcelona.cat/resources/bcn/EstadisticaPadro/pad/2023/2023_pad_m_cognom.json

const LOCAL_DATA_URL = './json';
const DATA_URL = 'https://opendata-ajuntament.barcelona.cat/resources/bcn/EstadisticaPadro/pad/2023/2023_pad_m_cognom.json';
const CORS_PROXY = 'https://api.allorigins.win/raw?url=';
const statusEl = document.getElementById('status');
const table = document.getElementById('data-table');
const tableHead = table.querySelector('thead');
const tableBody = table.querySelector('tbody');

async function loadDataset() {
    updateStatus('Cargando datos...');

    try {
        const data = await fetchDataset();

        if (!Array.isArray(data) || data.length === 0) {
            updateStatus('No se han encontrado datos o el formato no es válido.');
            return;
        }

        renderTable(data);
    } catch (error) {
        updateStatus(`Se produjo un error: ${error.message}`);
        console.error(error);
    }
}

async function fetchDataset() {
    try {
        return await fetchJson(LOCAL_DATA_URL);
    } catch (localError) {
        console.warn('Fetch local failed, using remote dataset', localError);
        updateStatus('No se pudo cargar el archivo local; intentando dataset remoto...');

        try {
            return await fetchJson(DATA_URL);
        } catch (remoteError) {
            console.warn('Remote fetch failed, using CORS proxy fallback', remoteError);
            updateStatus('Fetch remoto fallido; intentando proxy CORS...');
            return await fetchJson(CORS_PROXY + encodeURIComponent(DATA_URL));
        }
    }
}

async function fetchJson(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    return response.json();
}

function updateStatus(text) {
    statusEl.textContent = text;
}

function renderTable(data) {
    const maxRows = 100;
    const visibleRows = data.slice(0, maxRows);
    const keys = Object.keys(visibleRows[0]);

    tableHead.innerHTML = '';
    tableBody.innerHTML = '';

    const headerRow = document.createElement('tr');
    keys.forEach((key) => {
        const th = document.createElement('th');
        th.textContent = key;
        headerRow.appendChild(th);
    });
    tableHead.appendChild(headerRow);

    visibleRows.forEach((item) => {
        const row = document.createElement('tr');
        keys.forEach((key) => {
            const td = document.createElement('td');
            const value = item[key];
            td.textContent = formatValue(value);
            row.appendChild(td);
        });
        tableBody.appendChild(row);
    });

    const totalRows = data.length;
    if (totalRows > maxRows) {
        updateStatus(`S'han carregat ${visibleRows.length} entrades de ${totalRows}. Mostrant només les primeres ${maxRows} per rendiment.`);
    } else {
        updateStatus(`S'han carregat ${totalRows} entrades.`);
    }
}

function formatValue(value) {
    if (value === null || value === undefined) {
        return '-';
    }
    if (typeof value === 'object') {
        return JSON.stringify(value);
    }
    return String(value);
}

loadDataset();
