# 🚀 Codex Backend  
### **Node.js + Express + MongoDB + Judge0**

A powerful backend for a LeetCode-style coding platform.  
Codex provides APIs for problem management, code execution, editorial content, authentication, and submission tracking.

---

## 🌟 Features

### 🧩 Problem Management
- Admin-only problem creation  
- Update/Delete problems  
- Fetch problems with:  
  - **Starter Code**  
  - **Reference Solution**  
  - **Constraints**  
  - **Testcases**  
- Fully structured MongoDB Schema for problems  

### ⚡ Code Execution (Judge0)
- Run user code in real-time  
- Handle multiple languages  
- Submit solutions  
- Store submissions per user  

### 👤 User System
- JWT authentication  
- Password hashing with bcrypt.js  
- Track solved problems  
- Maintain submission history  

### 🎥 Editorial System
- Fetch secure Cloudinary URLs  
- Add explanations & resources to problems  

---

## 🛠 Tech Stack

| Technology | Purpose |
|-----------|---------|
| **Node.js + Express** | REST API backend |
| **MongoDB + Mongoose** | Database & ORM |
| **Judge0 API** | Code execution |
| **JWT** | Auth & user session |
| **Cloudinary** | Editorial video hosting |
| **bcrypt.js** | Password hashing |

---

## 📁 Folder Structure

```
codex-backend/
│── controllers/
│── models/
│── routes/
│── middlewares/
│── utils/
│── config/
│── index.js
│── package.json
│── .env
```

---

## 🔐 Environment Variables (.env)

Create a `.env` file:

```env
PORT=5000

# MongoDB
MONGO_URI=your_mongodb_connection

# Auth
JWT_SECRET=your_secret_key

# Judge0
JUDGE0_API_URL=https://judge0-ce.p.rapidapi.com
JUDGE0_API_KEY=your_rapidapi_key

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

---

## ▶️ Installation & Setup

### 1️⃣ Clone the Repo
```bash
git clone https://github.com/yourusername/codex-backend.git
cd codex-backend
```

### 2️⃣ Install Dependencies
```bash
npm install
```

### 3️⃣ Start the Server
```bash
npm start
```

Server runs at:

```
http://localhost:5000
```

---

## 📡 API Endpoints (Summary)

### 🔐 Auth
- `POST /api/auth/register`
- `POST /api/auth/login`

### 🧩 Problems
- `POST /api/problems` (Admin)
- `GET /api/problems`
- `GET /api/problems/:id`
- `PUT /api/problems/:id` (Admin)
- `DELETE /api/problems/:id` (Admin)

### ⚡ Execution
- `POST /api/execute`
- `POST /api/submit`

### 🎥 Editorial
- `GET /api/editorial/:problemId`

---

## 🚀 Future Enhancements
- Contest module  
- Leaderboard  
- User discussions  
- Custom testcases UI  
- Execution time & memory stats  

---
