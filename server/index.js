const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const { userProtected, adminProtected } = require("./middlware/auth.middleware")
require("dotenv").config()
const path = require("path");

const app = express()
app.use(express.json())
// app.use(express.static("dist"));
// app.use(cors({ origin: "https://studentexam.onrender.com", credentials: true }))
app.use(cors({ origin: "http://localhost:5173", credentials: true }))
app.use(cookieParser())

app.use("/api/auth", require("./routes/auth.route"))
app.use("/api/admin", adminProtected, require("./routes/admin.exam.route"))
app.use("/api/user", userProtected, require("./routes/user.exam.route"))

app.use("*", (req, res) => {
    // res.sendFile(path.join(__dirname, "dist", "index.html"));
    res.json({
        message: "Student Exam Backend is running",
    });
});

app.use((err, req, res, next) => {
    console.log(err)
    res.status(500).json({ message: "server error" })
})

mongoose.connect(process.env.MONGO_URL)

mongoose.connection.once("open", () => {
    console.log("db connected")
    app.listen(process.env.PORT || 5000, console.log(`Server Running... ${process.env.PORT || 5000}`))
})

module.exports = app