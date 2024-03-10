# Node.js API Demo

ตัวอย่างการสร้าง API อย่างง่ายๆด้วย Node.js ทดสอบเรียกใช้งาน API โดยใช้ Ajax จากไฟล์ HTML รองรับ CORS


## การติดตั้ง

1.  สร้างไฟล์ `.env` จากไฟล์ตัวอย่าง `.env.demo` โดยใส่ข้อมูลการเชื่อมต่อฐานข้อมูลให้ถูกต้อง เบื้องต้นไม่แนะนำให้เปลี่ยน SECRET_KEY เนื่องจากมันเป็นข้อมูลตัวอย่างในฐานข้อมูล
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_DATABASE=chatroom
USER_TABLE=users

SECRET_KEY=your-secret-key

PORT=3000
```
2.  สร้างฐานข้อมูลตามที่กำหนดโดย `DB_NAME` และนำเข้าข้อมูลจากไฟล์ `chatroom.sql`

3.  ติดตั้ง Node.js และ npm ให้เรียบร้อย

4.  ติดตั้ง node_modules โดยพิมพ์คำสั่ง `npm install`

5.  Run Node โดยพิมพ์คำสั่ง `node app.js`

6.  เปิดบราวเซอร์ ที่ `index.html` เพื่อทดสอบการทำงานของ API

## ข้อมูลตัวอย่าง ใช้ในการขอ Token และทดสอบใช้งาน API

1. Username : admin และ Password : admin (ID : 1)

2. Username : user1 และ Password : user1 (ID : 2)


## หากต้องการสนับสนุนผู้เขียน สามารถบริจาคช่วยเหลือค่า Server ได้ที่

```
ธนาคาร กสิกรไทย สาขากาญจนบุรี
เลขที่บัญชี 221-2-78341-5
ชื่อบัญชี กรกฎ วิริยะ
```
