// import express from 'express'
// import dotenv from 'dotenv'
// dotenv.config();
// import cookieParser from 'cookie-parser'
// import authRouter from './routes/AuthRoutes.js'
// import noteRouter from './routes/NoteRoute.js';
// import main from './config/db.js';
// import redisClient from './config/redis.js';
// import cors from 'cors'
// const app = express();



// app.use(
//   cors({
//     origin: (origin, cb) => {
//       if (!origin || origin.endsWith(".netlify.app")) {
//         cb(null, true);
//       } else {
//         cb(null, false);
//       }
//     },
//     credentials: true,
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//   })
// );

// // ✅ PRE-FLIGHT handled globally
// app.options("*", cors());



// app.use(express.json())
// app.use(cookieParser())


// app.use('/api/auth', authRouter)
// app.use("/notes", noteRouter);



// const InitializeConnection = async ()=>{

//     try {

//         await Promise.all([main(), redisClient.connect()])
//         console.log('DB connected successfully.')
       

//         app.listen(process.env.PORT, ()=>{
//             console.log('Listening at PORT', process.env.PORT)
//         })
        
//     } catch (error) {

//         console.log(error.message)
//     }
// }


// InitializeConnection()








import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRouter from "./routes/AuthRoutes.js";
import noteRouter from "./routes/NoteRoute.js";

import main from "./config/db.js";
import redisClient from "./config/redis.js";

dotenv.config();

const app = express();

/* =======================
   CORS (MUST BE FIRST)
======================= */
app.use(
  cors({
    origin: (origin, callback) => {
      // allow Netlify preview + prod + Postman
      if (!origin || origin.endsWith(".netlify.app")) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Preflight (IMPORTANT)
app.options("*", cors());

/* =======================
   Middlewares
======================= */
app.use(express.json());
app.use(cookieParser());

/* =======================
   Routes
======================= */
app.get("/", (req, res) => {
  res.send("NotepadPro Backend is running 🚀");
});

app.use("/api/auth", authRouter);
app.use("/notes", noteRouter);

/* =======================
   Server + DB Init
======================= */
const PORT = process.env.PORT || 5000;

const initializeConnection = async () => {
  try {
    await Promise.all([
      main(),                // Mongo / DB
      redisClient.connect(), // Redis
    ]);

    console.log("✅ DB & Redis connected");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Startup error:", error.message);
    process.exit(1);
  }
};

initializeConnection();
