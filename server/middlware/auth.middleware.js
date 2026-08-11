const asyncHandler = require("express-async-handler")
const jwt = require("jsonwebtoken")

// exports.userProtected = asyncHandler(async (req, res, next) => {
//     const token = req.cookies.USER
//     if (!token) {
//         return res.status(400).json({ message: "no cookie found" })
//     }
//     jwt.verify(token, process.env.JWT_KEY, (err, data) => {
//         if (err) {
//             console.log(err);
//             return res.status(401).json({ message: "invalid token", err: err.message })
//         }
//         req.user = data._id
//         next()
//     })
// })

// exports.adminProtected = asyncHandler(async (req, res, next) => {
//     const token = req.cookies.ADMIN
//     if (!token) {
//         res.status(401).json({ message: "no cookie found" })
//     }
//     jwt.verify(token, process.env.JWT_KEY, (err, data) => {
//         if (err) {
//             console.log(err)
//             return res.status(401).json({ message: "invalid token", err: err.message })
//         }
//         req.admin = data._id
//         next()
//     })
// })



// User middleware
const userProtected = asyncHandler(async (req, res, next) => {
    const token = req.cookies.USER;
    if (!token) {
        return res.status(400).json({ message: "no cookie found" });
    }

    try {
        const data = jwt.verify(token, process.env.JWT_KEY);
        req.user = data._id;
        next();
    } catch (err) {
        console.log(err);
        return res.status(401).json({ message: "invalid token", err: err.message });
    }
});

// Admin middleware
const adminProtected = asyncHandler(async (req, res, next) => {
    const token = req.cookies.ADMIN;
    if (!token) {
        return res.status(401).json({ message: "no cookie found" });
    }

    try {
        const data = jwt.verify(token, process.env.JWT_KEY);
        req.admin = data._id;
        next();
    } catch (err) {
        console.log(err);
        return res.status(401).json({ message: "invalid token", err: err.message });
    }
});

// Export both properly
module.exports = {
    userProtected,
    adminProtected
};


