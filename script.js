// script.js
window.onload = function() {
    if(localStorage.getItem("billData")) {
        const billData = JSON.parse(localStorage.getItem("billData"));
        document.getElementById('debtDate').value = billData.date;
        document.getElementById('totalDebt').value = billData.totalDebt;
        document.getElementById('paidAmount').value = billData.paidAmount;
        document.getElementById('remainingDebt').value = billData.remainingDebt;
        if (billData.receipt) {
            document.getElementById('receiptPreview').src = billData.receipt;
        }
    }
};

// คำนวณยอดหนี้ที่เหลือ
function calculateRemainingDebt() {
    const totalDebt = parseFloat(document.getElementById('totalDebt').value) || 0;
    const amountPaid = parseFloat(document.getElementById('amountPaid').value) || 0;

    if (totalDebt >= amountPaid) {
        const remainingDebt = totalDebt - amountPaid;
        document.getElementById('remainingDebt').value = remainingDebt.toFixed(2);
    } else {
        alert("จำนวนเงินที่ชำระไม่ควรมากกว่ายอดหนี้ทั้งหมด!");
        document.getElementById('amountPaid').value = ''; // Clear invalid input
        document.getElementById('remainingDebt').value = '';
}

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
    const billData = JSON.parse(localStorage.getItem("billData")) || {};
    billData.receipt = null;
    localStorage.setItem("billData", JSON.stringify(billData));
    alert("Receipt has been deleted.");
}

// บันทึกข้อมูลบิล
function saveData() {
    const billData = {
        date: document.getElementById('debtDate').value,
        totalDebt: document.getElementById('totalDebt').value,
        paidAmount: document.getElementById('paidAmount').value,
        remainingDebt: document.getElementById('remainingDebt').value,
        receipt: document.getElementById('receiptPreview').src || null
    };
    localStorage.setItem("billData", JSON.stringify(billData));
    alert("Bill data and receipt saved!");
}

// สร้างลิงค์สำหรับแชร์
function generateLink() {
    const billData = {
        date: document.getElementById('debtDate').value,
        totalDebt: document.getElementById('totalDebt').value,
        paidAmount: document.getElementById('paidAmount').value,
        remainingDebt: document.getElementById('remainingDebt').value,
        receipt: document.getElementById('receiptPreview').src || null
    };

    const receiptParam = billData.receipt ? encodeURIComponent(billData.receipt) : '';

    const link = window.location.href.split('?')[0] + 
                `?date=${billData.date}&totalDebt=${billData.totalDebt}&paidAmount=${billData.paidAmount}&remainingDebt=${billData.remainingDebt}&receipt=${receiptParam}`;
    
    navigator.clipboard.writeText(link).then(function() {
        alert('Link copied to clipboard: ' + link);
    }, function(err) {
        alert('Error copying link: ' + err);
        // โหลดข้อมูลจาก Local Storage
function loadData() {
    const billData = JSON.parse(localStorage.getItem("billData"));
    if (billData) {
        document.getElementById('debtDate').value = billData.date || '';
        document.getElementById('totalDebt').value = billData.totalDebt || '';
        document.getElementById('paidAmount').value = billData.paidAmount || '';
        document.getElementById('remainingDebt').value = billData.remainingDebt || '';
        document.getElementById('receiptPreview').src = billData.receipt || '';
    }
}

// โหลดข้อมูลจาก URL
function loadFromURL() {
    const params = new URLSearchParams(window.location.search);
    document.getElementById('debtDate').value = params.get('date') || '';
    document.getElementById('totalDebt').value = params.get('totalDebt') || '';
    document.getElementById('paidAmount').value = params.get('paidAmount') || '';
    document.getElementById('remainingDebt').value = params.get('remainingDebt') || '';
    const receipt = params.get('receipt');
    document.getElementById('receiptPreview').src = receipt ? decodeURIComponent(receipt) : '';
}

// เรียกโหลดข้อมูลเมื่อหน้าเว็บเปิด
window.onload = function () {
    loadData();
    loadFromURL();
};
    });
}
