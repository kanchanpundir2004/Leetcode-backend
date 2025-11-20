// const express = require("express");
// const app = express();
// require("dotenv").config();
// const main = require("./config/db");
// const cookieParser = require("cookie-parser");
// const authRouter = require("./routes/userAuth");
// const redisClient = require("./config/redis");
// const problemRouter = require("./routes/problemCreator");
// const submitRouter = require("./routes/submit");
// const aiRouter = require("./routes/aiChatting");
// const videoRouter = require("./routes/videoCreator");
// const cors = require("cors");

// // ✅ Allow cookies from Frontend + Postman
// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     credentials: true,
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//   })
// );

// app.use(express.json());
// app.use(cookieParser());

// app.use("/user", authRouter);
// app.use("/problem", problemRouter);
// app.use("/submission", submitRouter);
// app.use("/ai", aiRouter);
// app.use("/video", videoRouter);

// const InitalizeConnection = async () => {
//   try {
//     await Promise.all([main(), redisClient.connect()]);
//     console.log("DB Connected");

//     app.listen(process.env.PORT, () => {
//       console.log("Server listening at port number: " + process.env.PORT);
//     });
//   } catch (err) {
//     console.log("Error: " + err);
//   }
// };

// InitalizeConnection();

const express = require("express");
const app = express();
require("dotenv").config();
const main = require("./config/db");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/userAuth");
const redisClient = require("./config/redis");
const problemRouter = require("./routes/problemCreator");
const submitRouter = require("./routes/submit");
const aiRouter = require("./routes/aiChatting");
const videoRouter = require("./routes/videoCreator");
const cors = require("cors");

// 🔴 ALWAYS FIRST → JSON PARSER
app.use(express.json());

// 🔴 SECOND → COOKIE PARSER
app.use(cookieParser());

// 🔴 THIRD → CORS (Must come after json & cookieParser)
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ROUTES
app.use("/user", authRouter);
app.use("/problem", problemRouter);
app.use("/submission", submitRouter);
app.use("/ai", aiRouter);
app.use("/video", videoRouter);

// INIT DB + REDIS + SERVER
const InitalizeConnection = async () => {
  try {
    await Promise.all([main(), redisClient.connect()]);
    console.log("DB Connected");

    app.listen(process.env.PORT, () => {
      console.log("Server listening at port: " + process.env.PORT);
    });
  } catch (err) {
    console.log("Error: " + err);
  }
};

InitalizeConnection();
