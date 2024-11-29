require("dotenv").config();

const express = require("express");

const app = express();
const cors = require("cors");

const authRouter = require("./router/auth-router");
const contactRouter = require("./router/contact-router");
const adminRouter = require("./router/admin-route");
const todoRouter = require("./router/todo-route");
const tagRouter = require("./router/tag-route");

const connectWithDb = require("./utils/db");
const errorMiddleware = require("./middlewares/error-middleware");

const corsOptions = {
  // origin: "http://localhost:5173",
  // origin: "https://fleco.onrender.com", // Updated URL
  // origin: "https://fleco-o6akink10-vishals-projects-b7b3f36c.vercel.app", // Vercel frontend URL
origin:"https://fleco-phi.vercel.app/",
  methods: "GET,POST,PATCH,DELETE,HEAD,PUT",
  credentials: true,
};

//express.json() middleware for handle the incoming json requests
app.use(express.json());
app.use(cors(corsOptions));
app.use("/api/auth", authRouter);
app.use("/api/form", contactRouter);
app.use("/admin/route", adminRouter);
app.use("/api/todos", todoRouter);
app.use("/api/tags", tagRouter);

app.use(errorMiddleware);

const PORT = 5000;
connectWithDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} `);
  });
});
