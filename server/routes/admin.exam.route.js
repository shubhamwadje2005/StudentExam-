const admin = require("../controller/admin.exam.controller")

const router = require("express").Router()

router
    .get("/exam-fetch", admin.getExamPaper)
    .get("/exam-name", admin.getExamName)
    .post("/exam-create", admin.examPaperCreate)
    .patch("/exam-update/:eid", admin.updateExamPaper)
    .delete("/exam-delete/:eid", admin.deleteExamPaper)


    .get("/get-time-details", admin.getTimeDetails)
    .get("/user-results/:examId", admin.getResults)
    .post("/exam-time", admin.createExamTime)



    .delete("/delete-exam-time/:tid", admin.deleteExamTime)
    .patch("/update-exam-time/:tid", admin.UpdateExamTime)

module.exports = router