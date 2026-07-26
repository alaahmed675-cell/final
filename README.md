# مشروع Todo App — React + Node.js

مشروع صغير بيتكون من:
- **Backend**: Node.js + Express (REST API بيخزن المهام في الذاكرة)
- **Frontend**: React (باستخدام Vite)

## هيكل المشروع
```
todo-app/
  backend/     -> Express API (بورت 4000)
  frontend/    -> React app (بورت 5173)
```

## طريقة التشغيل

### 1. شغّل الـ Backend
```bash
cd backend
npm install
npm start
```
هيشتغل على: http://localhost:4000

### 2. شغّل الـ Frontend (في terminal تاني)
```bash
cd frontend
npm install
npm run dev
```
هيشتغل على: http://localhost:5173

افتح المتصفح على الرابط بتاع الـ frontend وهتلاقي التطبيق شغال.

## الـ API endpoints
| Method | Endpoint          | الوظيفة                  |
|--------|-------------------|---------------------------|
| GET    | /api/todos        | جلب كل المهام             |
| POST   | /api/todos        | إضافة مهمة `{ text }`     |
| PUT    | /api/todos/:id    | تعديل مهمة `{ text?, done? }` |
| DELETE | /api/todos/:id    | حذف مهمة                  |

## ملاحظات
- البيانات متخزنة في الذاكرة (array)، يعني هتتصفر لو عملت restart للسيرفر. لو عايز تخزين دائم، ممكن نضيف SQLite أو MongoDB لاحقًا.
- الـ frontend بيكلم الـ backend على `http://localhost:4000` — لو غيرت البورت لازم تعدل ده في `frontend/src/App.jsx`.
