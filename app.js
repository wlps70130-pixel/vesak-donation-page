const SHEET_CSV_URL =
  "https://docs.google.com/spreadsheets/d/1SUxJaPWNNUWT2H1l0jgulf9ITJWhfOl97lvfKjttoAQ/export?format=csv&gid=1389131251";

const defaultHeaders = ["ลำดับ", "ประเภทเจ้าภาพ", "ชื่อ / คณะ", "ยอดทำบุญ"];

const tableHead = document.querySelector("#donor-table-head");
const tableBody = document.querySelector("#donor-table-body");
const tableStatus = document.querySelector("#table-status");
const refreshButton = document.querySelector("#refresh-donors");

function parseCsv(csvText) {
  const rows = [];
  let currentRow = [];
  let currentCell = "";
  let insideQuotes = false;

  for (let index = 0; index < csvText.length; index += 1) {
    const char = csvText[index];
    const nextChar = csvText[index + 1];

    if (char === '"' && nextChar === '"' && insideQuotes) {
      currentCell += '"';
      index += 1;
    } else if (char === '"') {
      insideQuotes = !insideQuotes;
    } else if (char === "," && !insideQuotes) {
      currentRow.push(currentCell.trim());
      currentCell = "";
    } else if ((char === "\n" || char === "\r") && !insideQuotes) {
      if (char === "\r" && nextChar === "\n") {
        index += 1;
      }
      currentRow.push(currentCell.trim());
      rows.push(currentRow);
      currentRow = [];
      currentCell = "";
    } else {
      currentCell += char;
    }
  }

  if (currentCell || currentRow.length) {
    currentRow.push(currentCell.trim());
    rows.push(currentRow);
  }

  return rows.filter((row) => row.some((cell) => cell));
}

function renderHeaders(headers) {
  const headerRow = document.createElement("tr");
  tableHead.replaceChildren(headerRow);

  headers.forEach((header) => {
    const th = document.createElement("th");
    th.textContent = header || "-";
    headerRow.appendChild(th);
  });
}

function renderRows(headers, rows) {
  tableBody.replaceChildren();

  rows.forEach((row) => {
    const tr = document.createElement("tr");

    headers.forEach((_, index) => {
      const td = document.createElement("td");
      td.textContent = row[index] || "-";
      tr.appendChild(td);
    });

    tableBody.appendChild(tr);
  });
}

function renderEmpty(message) {
  renderHeaders(defaultHeaders);

  const tr = document.createElement("tr");
  const td = document.createElement("td");
  td.className = "empty-cell";
  td.colSpan = defaultHeaders.length;
  td.textContent = message;
  tr.appendChild(td);
  tableBody.replaceChildren(tr);
}

async function loadDonors() {
  tableStatus.textContent = "กำลังโหลดข้อมูลจาก Google Sheet...";
  refreshButton.disabled = true;

  try {
    const response = await fetch(`${SHEET_CSV_URL}&cacheBust=${Date.now()}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Google Sheet ตอบกลับสถานะ ${response.status}`);
    }

    const csvText = await response.text();
    const rows = parseCsv(csvText);

    if (!rows.length) {
      renderEmpty("ยังไม่มีข้อมูลใน Google Sheet");
      tableStatus.textContent = "ชีตเชื่อมต่อแล้ว แต่ยังไม่มีข้อมูล";
      return;
    }

    const headers = rows[0].map((header, index) => header || `คอลัมน์ ${index + 1}`);
    const dataRows = rows.slice(1);

    if (!dataRows.length) {
      renderEmpty("พบเฉพาะหัวตาราง ยังไม่มีรายชื่อผู้ทำบุญ");
      tableStatus.textContent = "ชีตเชื่อมต่อแล้ว รอข้อมูลรายชื่อ";
      return;
    }

    renderHeaders(headers);
    renderRows(headers, dataRows);
    tableStatus.textContent = `โหลดข้อมูลแล้ว ${dataRows.length} รายการ`;
  } catch (error) {
    renderEmpty("โหลดข้อมูลจาก Google Sheet ไม่สำเร็จ กรุณาตรวจสอบการเผยแพร่ชีตหรือการเชื่อมต่ออินเทอร์เน็ต");
    tableStatus.textContent = error.message;
  } finally {
    refreshButton.disabled = false;
  }
}

refreshButton.addEventListener("click", loadDonors);
loadDonors();
