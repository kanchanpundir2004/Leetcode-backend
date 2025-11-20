🚀 LeetCode-Clone Backend (Node.js + Express + MongoDB + Judge0)

This backend powers a full coding-platform similar to LeetCode/CodeStudio, including:

✔ Problem Creation (Admin Only)
✔ Problem Update/Delete
✔ Problem Fetch with Start Code, Reference Solution
✔ Run Code (Judge0)
✔ Submit Code & Save Submissions
✔ Editorial Video Fetch (Cloudinary Secure URL)
✔ User Authentication
✔ Track Solved Problems
✔ Testcase Handling
✔ Fully MongoDB-Based Problem Schema



⚙️ Tech Stack
Technology	Usage
Node.js + Express	Backend REST API
MongoDB + Mongoose	Database
Judge0 API	Code execution
JWT Auth	User authentication
Cloudinary	Editorial video hosting
bcrypt.js	Password hashing
🔐 Environment Variables (.env)

Create a .env file:

PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key

JUDGE0_API_URL=https://judge0-ce.p.rapidapi.com
JUDGE0_API_KEY=your_rapidapi_key

CLOUDINARY_CLOUD_NAME=xxxx
CLOUDINARY_API_KEY=xxxx
CLOUDINARY_API_SECRET=xxxx


