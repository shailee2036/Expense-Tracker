<img width="2560" height="1440" alt="Banner" src="https://github.com/user-attachments/assets/0fc7fbc5-9ba4-4401-b479-5978cdd4ae41" />


# 💰 Expense Tracker Application  
![License](https://img.shields.io/badge/license-MIT-blue)  
![React](https://img.shields.io/badge/Frontend-ReactJS-blue)  
![NodeJS](https://img.shields.io/badge/Backend-NodeJS-green)  
![MongoDB](https://img.shields.io/badge/Database-MongoDB-brightgreen)  
![Vite](https://img.shields.io/badge/Bundler-Vite-yellow)  

A full-stack **Expense Tracker** built with **React** (frontend) and **Node.js/Express** (backend), connected to **MongoDB** for secure data storage. This application allows users to track income & expenses, view insightful statistics, and export reports.  

---

## 📂 Folder Structure  

```
project-root/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   ├── .env
│   ├── expense_details.xlsx
│   ├── income_details.xlsx
│   ├── package.json
│   └── server.js
│
└── frontend/
    └── expense-tracker/
        ├── public/
        ├── src/
        │   ├── assets/
        │   ├── components/
        │   ├── context/
        │   ├── hooks/
        │   ├── pages/
        │   ├── utils/
        │   ├── App.css
        │   ├── App.jsx
        │   ├── index.css
        │   └── main.jsx
        ├── package.json
        ├── vite.config.js
        └── index.html
```

---

## 🚀 Getting Started  

Follow these steps to set up and run the project locally.  

---

### **1️⃣ Clone the Repository**
```bash
git clone <repository-url>
cd project-root
```

---

### **2️⃣ Backend Setup**
```bash
cd backend
npm install
```
**Create `.env` file inside `backend/`**  
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```
- Replace `your_mongodb_connection_string` with your MongoDB URI.  
- Replace `your_jwt_secret_key` with any secure random string.  

**Start Backend**
```bash
npm start
```

---

### **3️⃣ Frontend Setup**
```bash
cd ../frontend/expense-tracker
npm install
npm run dev
```
**Access Frontend** → `http://localhost:5173`  
**Access Backend API** → `http://localhost:5000`

---

## 🛠 Tech Stack  

**Frontend:**  
- ⚛️ React (Vite)  
- 🎨 CSS Modules  
- 🪝 Context API & Hooks  

**Backend:**  
- 🟢 Node.js & Express  
- 🍃 MongoDB + Mongoose  
- 🔑 JWT Authentication  

**Other Tools:**  
- 📄 XLSX for data export  
- 📤 Multer for file uploads  

---

## 📈 Future Plans  

### ☁ **Cloud Migration**  
- Migrate the local React-based expense tracker to AWS Cloud to enhance scalability & performance.  
- Transition from MongoDB to **AWS DynamoDB** for optimized data retrieval.  
- Deploy backend & frontend on **AWS EC2** for reliable hosting.    

### 🤖 **AI & LLM Integration**  
- AI-based financial insights for **expense optimization**.  
- **Voice-based expense logging**.  
- **Automated categorization** of expenses using AI.  

---

## 📜 License  
This project is licensed under the **[MIT License](LICENSE)**.  
