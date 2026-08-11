const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// ✅ Update with your correct MongoDB connection string
mongoose.connect("mongodb+srv://shubham:Etiycs7Bdi6yhEiH@cluster0.bqy8u.mongodb.net/student-exam");

const Admin = mongoose.model("admin", new mongoose.Schema({
    name: String,
    email: String,
    password: String
}));

(async () => {
    const name = "Shubham Wadje";
    const email = "sw@gmail.com";
    const plainPassword = "sw@2005";

    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    await Admin.create({
        name,
        email: email.trim().toLowerCase(),
        password: hashedPassword
    });

    console.log("✅ Admin inserted successfully");
    mongoose.disconnect();
})();