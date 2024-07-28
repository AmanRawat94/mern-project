require("dotenv").config();
const express = require("express");
const app = express();
const connectDb = require("./utils/db");
const authRoute = require("./routes/auth-route");
const userRoute = require("./routes/user-route");
const cors = require("cors");
// const errorMiddleware = require("./middlewares/error-middleware");
const cookieParser = require("cookie-parser");

// tackling cors
const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET, POST, PUT, PUTCH, DELETE, HEAD",
  credentials: true,
};

app.use(cookieParser());

app.use(cors(corsOptions));
app.use(express.json());
// app.use(cookieParser());

app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);

// app.use(errorMiddleware);

const PORT = 5000;
connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`server is running at port: ${PORT}`);
  });
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
