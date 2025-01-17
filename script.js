document.addEventListener("DOMContentLoaded", () => {
    loadBills(); // โหลดข้อมูลเมื่อหน้าเว็บโหลด
});

// ฟังก์ชันสำหรับบันทึกบิล
function saveBill() {
    const billDate = document.getElementById("billDate").value;
    const totalDebt = parseFloat(document.getElementById("totalDebt").value);
    const amountPaid = parseFloat(document.getElementById("amountPaid").value);
    const billReceipt = document.getElementById("billReceipt").files[0];

    if (!billDate || isNaN(totalDebt) || isNaN(amountPaid)) {
        alert("กรุณากรอกข้อมูลให้ครบถ้วน");
        return;
    }

    const remainingDebt = totalDebt - amountPaid;

    const billData = {
        date: billDate,
        totalDebt: totalDebt.toFixed(2),
        amountPaid: amountPaid.toFixed(2),
        remainingDebt: remainingDebt.toFixed(2),
        receipt: billReceipt ? URL.createObjectURL(billReceipt) : null,
    };

    // บันทึกข้อมูลลง Local Storage
    let bills = JSON.parse(localStorage.getItem("bills")) || [];
    bills.push(billData);
    localStorage.setItem("bills", JSON.stringify(bills));

    // อัปเดตตาราง
    addBillToTable(billData);

    // รีเซ็ตฟอร์ม
    document.getElementById("billForm").reset();
    document.getElementById("remainingDebt").value = "";
}

// ฟังก์ชันเพิ่มข้อมูลบิลในตาราง
function addBillToTable(bill) {
    const tableBody = document.getElementById("billTableBody");
    const row = document.createElement("tr");

    row.innerHTML = `
        <td>${bill.date}</td>
        <td>${bill.totalDebt}</td>
        <td>${bill.amountPaid}</td>
        <td>${bill.remainingDebt}</td>
        <td>${bill.receipt ? `<a href="${bill.receipt}" target="_blank">View</a>` : "No Receipt"}</td>
        <td><button onclick="deleteBill(this)">ลบ</button></td>
    `;

    tableBody.appendChild(row);
}

// ฟังก์ชันลบบิล
function deleteBill(button) {
    const row = button.parentElement.parentElement;
    const index = Array.from(row.parentElement.children).indexOf(row);

    // ลบข้อมูลจาก Local Storage
    let bills = JSON.parse(localStorage.getItem("bills")) || [];
    bills.splice(index, 1);
    localStorage.setItem("bills", JSON.stringify(bills));

    // ลบแถวออกจากตาราง
    row.remove();
}

// ฟังก์ชันโหลดบิลจาก Local Storage
function loadBills() {
    const bills = JSON.parse(localStorage.getItem("bills")) || [];
    bills.forEach(addBillToTable);
}
