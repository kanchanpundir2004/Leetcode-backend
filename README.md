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

🧠 Key Features
✔ Create Problem (Admin Only)

Includes:

Start Code by Language

Visible Test Cases

Hidden Test Cases

Reference Solution Validate via Judge0

Problem Creator Tracking

Optional Editorial Video

✔ Run & Submit Code (Judge0)

User can:

🟦 Run Code

Uses visible testcases only

Returns runtime, memory, output comparison

🟩 Submit Code

Uses both visible & hidden testcases

Saves submission in MongoDB

Updates user’s solved list

✔ Editorial Video

Each problem can have:

secureUrl      → Video URL (Cloudinary)
thumbnailUrl   → Video thumbnail
duration       → Duration in seconds


Auto-attached when fetching problem.

🗂 API Endpoints
🔐 Authentication
Method	Endpoint	Access
POST	/user/register	Public
POST	/user/login	Public
🧩 Problem APIs
➤ POST /problem/create

Admin only
Creates a new problem.

➤ PUT /problem/update/:id

Admin only
Updates any problem field.

➤ DELETE /problem/delete/:id

Admin only
Deletes a problem.

➤ GET /problem/problemById/:id

Fetch problem with:

description

difficulty

tags

visible testcases

start code

reference solution

editorial video

➤ GET /problem/all

Return all problems (title, difficulty, tag).

🏁 Code Execution & Submission
➤ POST /submission/run/:id

Runs code using visible testcases.

➤ POST /submission/submit/:id

Runs all (visible + hidden) testcases, saves record.

➤ GET /submission/history/:id

Fetch user’s submissions for a problem.

👤 User Problem Tracking
➤ GET /problem/solvedByUser

Return all solved problems for authenticated user.

🧩 MongoDB Schema Highlights
✔ Problem Schema

title

description

difficulty (enum)

tags (enum)

start code array

reference solutions

visible testcases

hidden testcases

problemCreator

editorial video auto-fetching

✔ Submission Schema

userId

problemId

code

language

runtime

memory

✔ User Schema

email

password (hashed via bcrypt)

problemSolved (array of ObjectId)

⚠️ Important Behavior
✔ Problem not showing in frontend?

Your controller already handles:

startCode: []
referenceSolution: []
visibleTestCases: []


Meaning frontend ALWAYS receives arrays.

If description/editorial not showing → frontend tabs are correct but Problem model must include the fields you SELECT.

Your fixed controller already does this. ✔

▶ How to Run Backend
npm install
npm start


or with nodemon:

npm run dev
