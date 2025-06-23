require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const chalk = require("chalk");
const connectDB = require("./config/db");

const app = express();

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || '*',
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json());

// DB Connection
connectDB();

// Routes
const authRoutes = require('./routes/authRoutes');
const userDetailsRoutes = require('./routes/userDetailsRoutes');
const expenseRoutes = require('./routes/expenseRoutes');
const changePasswordRoutes = require('./routes/changePasswordRoutes');
const incomeRoutes = require('./routes/incomeRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const calenderRoutes = require('./routes/calenderRoutes');
const reportRoutes = require('./routes/reportRoutes');

app.use('/auth', authRoutes);
app.use('/user', userDetailsRoutes);
app.use('/expense', expenseRoutes);
app.use('/income', incomeRoutes);
app.use('/password', changePasswordRoutes);
app.use('/dashboard', dashboardRoutes);
app.use('/calender', calenderRoutes);
app.use('/report', reportRoutes);

// Server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(chalk.green(`Server running on port ${PORT}`)));
