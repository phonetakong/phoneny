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
    const paidAmount = parseFloat(document.getElementById('paidAmount').value) || 0;
    const remainingDebt = totalDebt - paidAmount;
    document.getElementById('remainingDebt').value = remainingDebt.toFixed(2);
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
    });
}
