// แสดงภาพสลิปที่อัปโหลด
function previewReceipt(event) {
    const reader = new FileReader();
    reader.onload = function() {
        const output = document.getElementById('receiptPreview');
        output.src = reader.result;
    };
    reader.readAsDataURL(event.target.files[0]);
}

// ลบภาพสลิป
function deleteReceipt() {
    document.getElementById('receiptPreview').src = "";
    alert("Receipt has been deleted.");
}

// คำนวณหนี้ที่เหลือ
function calculateRemainingDebt() {
    const totalDebt = parseFloat(document.getElementById('totalDebt').value) || 0;
    const paidAmount = parseFloat(document.getElementById('paidAmount').value) || 0;

    if (paidAmount > totalDebt) {
        alert("Paid amount cannot exceed total debt!");
        return;
    }

    const remainingDebt = totalDebt - paidAmount;
    document.getElementById('remainingDebt').value = remainingDebt.toFixed(2);
}

// บันทึกข้อมูลบิล
function saveBill() {
    const billData = {
        date: document.getElementById('debtDate').value,
        totalDebt: document.getElementById('totalDebt').value,
        paidAmount: document.getElementById('paidAmount').value,
        remainingDebt: document.getElementById('remainingDebt').value,
        receipt: document.getElementById('receiptPreview').src || ""
    };

    // ดึงข้อมูลเก่าใน LocalStorage
    const existingBills = JSON.parse(localStorage.getItem("bills")) || [];
    existingBills.push(billData); // เพิ่มบิลใหม่เข้าไปในข้อมูลเก่า

    // บันทึกกลับไปที่ LocalStorage
    localStorage.setItem("bills", JSON.stringify(existingBills));

    alert("Bill saved successfully!");
    loadBills(); // โหลดข้อมูลใหม่หลังบันทึก
}

// โหลดข้อมูลบิลจาก LocalStorage
function loadBills() {
    const billTable = document.getElementById('billTableBody');
    billTable.innerHTML = ""; // ล้างข้อมูลเดิมในตาราง

    const bills = JSON.parse(localStorage.getItem("bills")) || []; // ดึงข้อมูลบิลจาก LocalStorage

    bills.forEach((bill, index) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${bill.date}</td>
            <td>${bill.totalDebt}</td>
            <td>${bill.paidAmount}</td>
            <td>${bill.remainingDebt}</td>
            <td>
                <img src="${bill.receipt}" alt="Receipt" style="width: 100px; height: auto;" />
            </td>
            <td>
                <button onclick="deleteBill(${index})">Delete</button>
            </td>
        `;

        billTable.appendChild(row);
    });
}

// ลบข้อมูลบิล
function deleteBill(index) {
    const bills = JSON.parse(localStorage.getItem("bills")) || [];

    if (index >= 0 && index < bills.length) {
        bills.splice(index, 1); // ลบข้อมูลตามตำแหน่งที่เลือก
        localStorage.setItem("bills", JSON.stringify(bills)); // บันทึกข้อมูลใหม่กลับไป
        alert("Bill deleted successfully!");
        loadBills(); // โหลดข้อมูลใหม่หลังลบ
    }
}

// โหลดข้อมูลเมื่อหน้าเว็บโหลด
window.onload = function() {
    loadBills(); // โหลดข้อมูลเมื่อเปิดหน้าเว็บ
};


document.addEventListener("DOMContentLoaded", () => {
    loadHistory(); // โหลดประวัติบิลตอนเปิดเว็บ
});

// ฟังก์ชันบันทึกบิล
function saveBill() {
    const date = document.getElementById('debtDate').value;
    const totalDebt = document.getElementById('totalDebt').value;
    const paidAmount = document.getElementById('paidAmount').value;
    const remainingDebt = document.getElementById('remainingDebt').value;
    const receipt = document.getElementById('receiptPreview').src;

    if (!date || !totalDebt || !paidAmount) {
        alert("Please fill in all fields!");
        return;
    }

    const bill = {
        date: date,
        totalDebt: parseFloat(totalDebt),
        paidAmount: parseFloat(paidAmount),
        remainingDebt: parseFloat(remainingDebt),
        receipt: receipt || null
    };

    // ดึงข้อมูลเก่าจาก Local Storage
    let bills = JSON.parse(localStorage.getItem("bills")) || [];
    bills.push(bill);

    // บันทึกกลับไปที่ Local Storage
    localStorage.setItem("bills", JSON.stringify(bills));
    alert("Bill saved successfully!");

    // อัปเดตตารางประวัติ
    updateHistoryTable();
}

// ฟังก์ชันโหลดประวัติจาก Local Storage
function loadHistory() {
    const bills = JSON.parse(localStorage.getItem("bills")) || [];
    if (bills.length > 0) {
        updateHistoryTable(bills);
    }
}

// ฟังก์ชันอัปเดตตารางประวัติ
function updateHistoryTable() {
    const bills = JSON.parse(localStorage.getItem("bills")) || [];
    const historyTable = document.getElementById("historyTableBody");
    historyTable.innerHTML = ""; // ล้างข้อมูลเดิม

    bills.forEach((bill, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${bill.date}</td>
            <td>${bill.totalDebt}</td>
            <td>${bill.paidAmount}</td>
            <td>${bill.remainingDebt}</td>
            <td><img src="${bill.receipt}" alt="Receipt" width="50"></td>
            <td><button onclick="deleteBill(${index})">Delete</button></td>
        `;
        historyTable.appendChild(row);
    });
}

// ฟังก์ชันลบประวัติบิล
function deleteBill(index) {
    let bills = JSON.parse(localStorage.getItem("bills")) || [];
    bills.splice(index, 1); // ลบรายการตาม index
    localStorage.setItem("bills", JSON.stringify(bills));
    updateHistoryTable();
    alert("Bill deleted successfully!");
}

// ฟังก์ชันบันทึกประวัติทั้งหมด
function saveHistory() {
    const bills = JSON.parse(localStorage.getItem("bills")) || [];
    if (bills.length === 0) {
        alert("No history to save!");
        return;
    }

    const blob = new Blob([JSON.stringify(bills, null, 2)], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "bills_history.json";
    link.click();

    alert("History saved as bills_history.json!");
}
