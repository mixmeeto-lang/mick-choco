// นำ Web App URL ที่ได้จากการ Deploy Google Apps Script มาวางแทนที่ข้อความด้านล่างนี้
const GOOGLE_SCRIPT_URL = "วาง_WEB_APP_URL_จาก_GOOGLE_APPS_SCRIPT_ที่นี่";

function calculateTotal() {
  const qty1 = parseInt(document.getElementById('sku1').value) || 0;
  const qty2 = parseInt(document.getElementById('sku2').value) || 0;
  const total = (qty1 * 180) + (qty2 * 195);
  document.getElementById('totalDisplay').innerText = total.toLocaleString() + " บาท";
  return total;
}

document.getElementById('orderForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const qty1 = parseInt(document.getElementById('sku1').value) || 0;
  const qty2 = parseInt(document.getElementById('sku2').value) || 0;
  const total = calculateTotal();

  if (qty1 + qty2 === 0) {
    alert("กรุณาเลือกสินค้าอย่างน้อย 1 แท่งครับ");
    return;
  }

  if (GOOGLE_SCRIPT_URL.includes("วาง_WEB_APP_URL")) {
    alert("กรุณาใส่ลิงก์ GOOGLE_SCRIPT_URL ในไฟล์ script.js ก่อนทดสอบสั่งซื้อครับ");
    return;
  }

  const btn = document.getElementById('submitBtn');
  btn.disabled = true;
  btn.innerText = "กำลังบันทึกคำสั่งซื้อ...";

  const payload = {
    name: document.getElementById('name').value,
    phone: document.getElementById('phone').value,
    address: document.getElementById('address').value,
    sku1_qty: qty1,
    sku2_qty: qty2,
    total_price: total,
    slip_ref: document.getElementById('slip_ref').value
  };

  fetch(GOOGLE_SCRIPT_URL, {
    method: 'POST',
    body: JSON.stringify(payload)
  })
  .then(res => res.json())
  .then(data => {
    alert("สั่งซื้อสำเร็จ! รหัสคำสั่งซื้อของคุณคือ: " + data.order_id);
    document.getElementById('orderForm').reset();
    calculateTotal();
  })
  .catch(err => {
    alert("เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง");
    console.error(err);
  })
  .finally(() => {
    btn.disabled = false;
    btn.innerText = "ยืนยันการสั่งซื้อ";
  });
});
