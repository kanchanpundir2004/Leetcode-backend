🚀 Codex Backend — Node.js + Express + MongoDB + Judge0

This is the backend for Codex, an online coding platform similar to LeetCode / CodeStudio.
It provides APIs for problem management, code execution, submissions tracking, editorial handling, and authentication.

✨ Features
🧩 Problem Management

✔️ Create coding problems (Admin Only)

✔️ Update/Delete problems

✔️ Fetch problems with starter code & reference solution

✔️ Testcase management

✔️ MongoDB-driven problem schema

⚡ Code Execution (Judge0)

✔️ Run user code via Judge0 API

✔️ Submit solutions

✔️ Store user submissions in MongoDB

🎥 Editorial Section

✔️ Fetch editorial video URLs (Cloudinary Secure Access)

👤 User System

✔️ JWT Authentication

✔️ Secure Password Hashing (bcrypt.js)

✔️ Track solved problems

🛠 Tech Stack
Technology	Usage
Node.js + Express	Backend REST API
MongoDB + Mongoose	Database & models
Judge0 API	Code execution engine
JWT Auth	User authentication
Cloudinary	Editorial video hosting
bcrypt.js	Password hashing
🔐 Environment Variables (.env)

Create a .env file in the root directory:

PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key

# Judge0 API
JUDGE0_API_URL=https://judge0-ce.p.rapidapi.com
JUDGE0_API_KEY=your_rapidapi_key

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

▶️ Run the Server
npm install
npm start


Server will start at:

http://localhost:5000
CLOUDINARY_CLOUD_NAME=xxxx
CLOUDINARY_API_KEY=xxxx
CLOUDINARY_API_SECRET=xxxx


