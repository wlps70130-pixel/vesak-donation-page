# วันวิสาขบูชา 2569

Landing Page / Web App สำหรับประชาสัมพันธ์งานวันวิสาขบูชาและเชิญร่วมทอดผ้าป่าสามัคคี โดยดึงข้อมูลจาก Google Sheet

## Run local

```bash
npm install
npm run dev
```

## Deploy บน Cloudflare Pages

- ใช้ค่าเดิมแบบไม่ build ได้: Output directory `/`
- หรือใช้แบบ Vite: Build command `npm run build`, Output directory `dist`

คำสั่ง `npm run build` จะสร้างไฟล์ใน `dist` และ sync ไฟล์ production กลับมาที่ root เพื่อรองรับ Cloudflare Pages ที่ยังตั้งค่า Output เป็น `/`

## Google Sheet

หน้าเว็บอ่านข้อมูลจากชีต `วันวิสาขบูชา2569` โดยใช้คอลัมน์หลักดังนี้

- `A:D` ตารางรายชื่อผู้ทำบุญ
- `F:G` ตั้งค่าข้อความ รูปหน้าปก โลโก้ QR บัญชี และข้อมูลติดต่อ
- `I:J` กำหนดการ
- `L:N` กิจกรรมและลิงก์รูปกิจกรรม
- `P:R` วัตถุประสงค์และไอคอน
- `T:U` อานิสงส์และไอคอน
