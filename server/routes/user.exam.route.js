const user = require("../controller/user.exam.controller")

const router = require("express").Router()

router
    .get("/user-exam-fetch", user.getUserExamPaper)
    .post("/user-exam-check", user.userExamChecking)
    .get("/result", user.getUserResult)
    .get("/get-exam-time", user.getExamTime)

module.exports = router