const asyncHandler = require("express-async-handler")
const UserAnswer = require("../models/UserAnswer")
const User = require("../models/User")
const Time = require("../models/Time")
const Exam = require("../models/Exam")

exports.getExamName = asyncHandler(async (req, res) => {
    const result = await Time.find()
    res.json({ message: "Paper Fetch Successfully", result })
})

exports.getExamPaper = asyncHandler(async (req, res) => {
    const { examId } = req.query

    const result = await Exam.find({ exam: examId }).select()
    res.json({ message: "Paper Fetch Successfully", result })
})

exports.examPaperCreate = asyncHandler(async (req, res) => {

    const { exam, question, firstoption, secondoption, thirdoption, fourthoption, correctAnswer, marks } = req.body

    // result.push({ question, firstoption, secondoption, thirdoption, fourthoption, correctAnswer, marks })

    await Exam.create({ exam, question, firstoption, secondoption, thirdoption, fourthoption, correctAnswer, marks })

    res.status(201).json({ message: "Exam Create Successfully" })
})


exports.updateExamPaper = asyncHandler(async (req, res) => {
    await Exam.findByIdAndUpdate(req.params.eid, req.body)
    res.json({ message: "Paper Update Successfully" })
})

exports.deleteExamPaper = asyncHandler(async (req, res) => {
    const { eid } = req.params
    await Exam.findByIdAndDelete(eid)
    res.json({ message: "Paper Delete Successfully" })
})

exports.getResults = asyncHandler(async (req, res) => {
    const userResult = await UserAnswer.find({ exam: req.params.examId })
    res.json({ message: "Result Fetch Successfully", userResult })
})



exports.createExamTime = asyncHandler(async (req, res) => {

    const { startTime, endTime, examDate, examName } = req.body

    if (!startTime || !endTime || !examDate || !examName) {
        res.status(400)
        throw new Error("Please provide startTime, endTime, examName and examDate");
    }

    const examTime = await Time.create({ startTime, endTime, examDate, examName })

    res.json({ message: "Exam Time Set Successfully", examTime })
})
exports.getTimeDetails = asyncHandler(async (req, res) => {

    const result = await Time.find()

    res.json({ message: "user Exam Time Fetch Successfully", result })
})


exports.deleteExamTime = asyncHandler(async (req, res) => {
    const { tid } = req.params
    await Time.findByIdAndDelete(tid)

    res.json({ message: "delete Exam Time  Successfully" })
})
exports.UpdateExamTime = asyncHandler(async (req, res) => {
    await Time.findByIdAndUpdate(req.params.tid, req.body)
    // const { tid } = req.params;
    // const { examName, examDate, startTime, endTime } = req.body;

    // const updated = await Time.findByIdAndUpdate(id, {
    //     examName,
    //     examDate,
    //     startTime,
    //     endTime,
    // });
    // console.log(updated);


    res.json({ message: "update Exam Time  Successfully" })
})
