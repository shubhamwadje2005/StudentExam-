const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// ✅ Update with your correct MongoDB connection string
mongoose.connect("mongodb://shubham:zxSzcB5E65BaOM0a@cluster0-shard-00-00.bqy8u.mongodb.net:27017,cluster0-shard-00-01.bqy8u.mongodb.net:27017,cluster0-shard-00-02.bqy8u.mongodb.net:27017/my-portfolio?ssl=true&replicaSet=atlas-s7wm8k-shard-0&authSource=admin&appName=Cluster0/student-exam");

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