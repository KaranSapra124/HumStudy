const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const cookieParser = require("cookie-parser");
const compression = require("compression");
const app = express();

app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
); // cors middleware

app.use(compression());

app.use(express.static(path.join(__dirname, "uploads")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const adminRoute = require("./routes/admin/authRoute");
const { adminAuth, userAuth } = require("./middlewares/authMiddleware");
const errorFallback = require("./utils/errorFallback");

// Admin Routes
app.use(
  "/api/v1/admin/university",
  // adminAuth,
  require("./routes/admin/universityRoutes")
);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/admin/account", adminRoute);
app.use("/api/v1/admin/course", require("./routes/admin/courseRoutes"));
app.use("/api/v1/admin/loan", require("./routes/admin/loanRoutes"));
app.use(
  "/api/v1/admin/loan-application",

  require("./routes/admin/loanApplicationRoutes")
);
app.use(
  "/api/v1/admin/payments",
  adminAuth,
  require("./routes/admin/paymentRoutes")
);
app.use("/api/v1/admin/users", adminAuth, require("./routes/admin/userRoutes"));

app.use("/api/v1/admin/flight", require("./routes/admin/flightRoutes"));

app.use(
  "/api/v1/admin/support",
  adminAuth,
  require("./routes/admin/supportRoute")
);

app.use("/api/v1/admin/blog", require("./routes/admin/blogsRoute"));

app.use("/api/v1/admin/visa", require("./routes/admin/visaRoute"));

app.use("/api/v1/admin/plans", require("./routes/admin/planRoutes"));
app.use("/api/v1/admin/users", adminAuth, require("./routes/admin/userRoutes"));
app.use(
  "/api/v1/admin/applications",
  adminAuth,
  require("./routes/admin/applicationRoute")
);

//user routes
app.use("/api/v1/user", userAuth, require("./routes/userRoutes"));

app.use("/api/v1", userRoutes);
//user routes
// app.use("/api/v1/user", userAuth, require("./routes/userRoutes"));

app.use("/api/v1", userRoutes);

app.use(errorFallback);

module.exports = app;
