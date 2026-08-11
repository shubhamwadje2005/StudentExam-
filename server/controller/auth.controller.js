const asyncHandler = require("express-async-handler")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const User = require("../models/User")
const { UserProfile } = require("../utils/uploader")
const cloud = require("../utils/cloudinary")
const path = require("path")
const { OAuth2Client } = require("google-auth-library")
const Admin = require("../models/Admin")
const { json } = require("stream/consumers")
const Time = require("../models/Time")
const sendEmail = require("../utils/email")
const { differenceInSeconds } = require("date-fns");
const genrateOTP = require("../utils/genrateOTP")


/* -------------------------------- user login start ---------------------------------- */

exports.UserRegister = asyncHandler(async (req, res) => {

    UserProfile(req, res, async (err) => {
        if (err) {
            console.log(err);
            return res.status(400).json({ message: "multer Error" })
        }

        const { email, password, name, mobile } = req.body

        const result = await User.findOne({ email })

        if (result) {
            return res.status(401).json({ message: "Email Already Exist" })
        }

        const hash = await bcrypt.hash(password, 10)
        // console.log(req.file);
        // console.log(req.body);

        const { secure_url } = await cloud.uploader.upload(req.file.path)

        await User.create({ name, email, mobile, password: hash, picture: secure_url })

        res.status(201).json({ message: "User Register Successfully" })
    })
})


exports.UserLogin = asyncHandler(async (req, res) => {

    const { email, password, credential } = req.body


    const examData = await Time.find({ startTime: { $lte: new Date() }, endTime: { $gte: new Date() } })

    if (examData.length === 0) {
        return res.status(401).json({ message: "no exam available" })
    }

    let result

    if (credential) {

        const client = new OAuth2Client({ clientId: process.env.GOOGLE_CLIENT_ID })

        const data = await client.verifyIdToken({ idToken: credential })

        if (!data) {
            return res.status(401).json({ message: "unable to process" })
        }

        const { payload } = data

        result = await User.findOne({ email: payload.email })

        if (!result) {
            result = await User.create({
                id: payload._id,
                name: payload.name,
                email: payload.email,
                picture: payload.picture || "",
                mobile: "",
                password: null,
                authType: "google"
            })
        }
    }

    else {
        const email = req.body.email.trim().toLowerCase()
        result = await User.findOne({ email })

        if (!result) {
            return res.status(401).json({ message: "Email Not Registered With Us" })
        }

        const verify = await bcrypt.compare(password, result.password)

        if (!verify) {
            return res.status(401).json({ message: "Invalid Password" })
        }
    }

    const token = jwt.sign({ _id: result._id, name: result.name }, process.env.JWT_KEY)

    res.cookie("USER", token, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true, secure: false })

    res.json({
        message: "User Login Successfully",
        id: result._id,
        name: result.name,
        email: result.email,
        picture: result.picture
    })
})


exports.UserLogout = asyncHandler(async (req, res) => {
    res.clearCookie("USER")
    res.json({ message: "User Logout Successfully" })
})

/* -------------------------------- user login end ---------------------------------- */

/* -------------------------------- admin login start ---------------------------------- */

exports.adminLogin = asyncHandler(async (req, res) => {

    const { email, password } = req.body
    console.log(email);

    const result = await Admin.findOne({ email })
    console.log(result);



    if (!result) {
        return res.status(401).json({ message: "Invalid Email" })
    }

    const verify = await bcrypt.compare(password, result.password)

    if (!verify) {
        return res.status(401).json({ message: "Invalid Password" });
    }

    const token = jwt.sign({ _id: result._id, name: result.name }, process.env.JWT_KEY)

    res.cookie("ADMIN", token, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true, secure: false })

    res.json({ message: "Admin Login Successfully", name: result.name })
})


exports.adminLogout = asyncHandler(async (req, res) => {
    res.clearCookie("ADMIN")
    res.json({ message: "Admin Logout Successfully" })
})

/* -------------------------------- admin login end ------------------------------------ */


/* ------------------------------ user mobile login start --------------------------- */

exports.UserMobileRegister = asyncHandler(async (req, res) => {
    await User.create(req.body)
    res.status(200).json({ message: "user mobile register success" })
})

// exports.otpsend = asyncHandler(async (req, res) => {
//     const { username } = req.body

//     const result = await User.findOne({
//         $or:
//             [
//                 { email: username },
//                 { mobile: username }
//             ]
//     })
//     // console.log(req.body);
//     // console.log(result);

//     if (!result) {
//         return res.status(401).json({ message: "invalid email or mobile" })
//     }

//     const otp = Math.floor(100000 + Math.random() * 900000)
//     console.log(otp)

//     await sendEmail({
//         to: result.email,
//         subject: "Login OTP",
//         message: `your Login OTP Is ${otp}`
//     })

//     await User.findByIdAndUpdate(result._id, { otp, otpSendon: new Date() })
//     res.status(200).json({ message: "otp send success" })
// })

// exports.UserMobileLogin = asyncHandler(async (req, res) => {
//     const { username, otp } = req.body
//     const result = await User.findOne
//         ({
//             $or:
//                 [
//                     { email: username },
//                     { mobile: username }
//                 ]
//         })

//     console.log(req.body);
//     console.log(result);

//     if (!result) {
//         return res.status(401).json({ message: "invalid email or mobile" })
//     }

//     if (result.otp != otp) {
//         return res.status(401).json({ message: "invalid otp" })
//     }

//     if (differenceInSeconds(new Date(), result.otpSendon) > 60) {
//         return res.status(401).json({ message: "otp expired" })
//     }

//     await User.findByIdAndUpdate(result._id, { otp: null })
//     const token = jwt.sign({ _id: result._id }, process.env.JWT_KEY)
//     res.cookie("USERMOBILE", token, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true, secure: false })
//     res.json({
//         message: "user mobile login success", result: {
//             name: result.name,
//             email: result.email,
//             mobile: result.mobile,
//             picture: result.picture,
//         }
//     })
// })


exports.otpsend = asyncHandler(async (req, res) => {
    const { username } = req.body
    const result = await User.findOne({ email: username })
    if (!result) {
        return res.status(401).json({ message: "Invalid Email or Mobile" })
    }

    const otp = genrateOTP()
    console.log(otp)

    await User.findByIdAndUpdate(result._id, { otp, otpSendon: new Date() })
    await sendEmail({ to: result.email, subject: "Verify your login OTP", message: `Your OTP is ${otp}` })
    res.json({ message: "mobile otp send Success" })
})




exports.UserMobileLogin = asyncHandler(async (req, res) => {
    const { username, otp } = req.body

    const result = await User.findOne({ email: username })

    if (!result) {
        return res.status(401).json({ message: "Invalid Email or Mobile" })
    }


    if (result.otp != otp) {
        return res.status(401).json({ message: "Invalid OTP" })
    }

    if (differenceInSeconds(new Date(), result.otpSendon) > 60) {
        return res.status(401).json({ message: "OTP expire" })
    }

    await User.findByIdAndUpdate(result._id, { otp: null, otpSendon: null })

    const token = jwt.sign({ _id: result._id, name: result.name }, process.env.JWT_KEY)
    res.cookie("USER", token, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true, secure: true })
    res.json({
        message: "user Login Success", result: {
            _id: result._id,
            name: result.name,
            email: result.email,
            mobile: result.mobile,
            picture: result.picture,
        }
    })
})

exports.UserMobileLogout = asyncHandler(async (req, res) => {
    res.clearCookie("USER")
    res.json({ message: "user mobile logout success" })
})

/* ------------------------------ user mobile login end ---------------------------- */