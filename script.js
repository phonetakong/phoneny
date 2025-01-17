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
