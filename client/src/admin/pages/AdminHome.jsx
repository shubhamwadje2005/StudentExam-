import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import { useDeleteExamMutation, useExamNameQuery, useLazyGetPaperQuery } from '../../redux/api/admin.api'
import Loading from '../components/Loading'
import { toast } from 'react-toastify'
import { useParams } from 'react-router-dom'


const AdminHome = () => {
    const { examId } = useParams()

    // const [examId, setExamId] = useState(null)

    const navigate = useNavigate()
    // const { data: examNameData } = useExamNameQuery()

    const [paperData, setPaperData] = useState([])
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)

    const currentQuestion = paperData[currentQuestionIndex]

    const optionLabels = ['A', 'B', 'C', 'D']

    const [fetchPaper, { data }] = useLazyGetPaperQuery()

    const [examDelete, { isSuccess: deleteIsSuccess, isLoading: deleteIsLoading, isError: deleteIsError, error: deleteError }] = useDeleteExamMutation()


    useEffect(() => {
        if (examId) {
            fetchPaper(examId)
        }
    }, [examId])

    useEffect(() => {
        setCurrentQuestionIndex(pre => 0)
    }, [deleteIsSuccess])

    useEffect(() => {
        if (data && data.result) {
            const processedData = data.result.map(item => {
                const options = [
                    item.firstoption,
                    item.secondoption,
                    item.thirdoption,
                    item.fourthoption,
                ]
                return { ...item, options }
            })
            setPaperData(processedData)
        }
    }, [data])

    useEffect(() => {
        if (deleteIsSuccess) {
            toast.success("Exam Delete Successfully")
        }
    }, [deleteIsSuccess])

    useEffect(() => {
        if (deleteIsError) {
            toast.error(deleteError.data.message || "unable to Delete")
        }
    }, [deleteIsError])

    if (deleteIsLoading) {
        return <Loading />
    }

    return <>
        {/* <select class="form-select mb-5" onChange={e => setExamId(e.target.value)}>
            <option value="" selected disabled>Select Exam Name</option>
            {
                examNameData && examNameData.result.map(item =>
                    <option
                        value={item._id}
                        id={item._id}>
                        {item.examName}
                    </option>)
            }
        </select> */}
        <div className="container">
            <div class="card">
                <div class="card-header bg-primary text-light fs-4 text-center">Exam Paper</div>
                <div class="card-body">
                    <div className="container">
                        <div class="card">
                            {
                                currentQuestion && (
                                    <div className="card-body p-4">
                                        <div className='d-flex justify-content-end'>
                                            <p><strong>Total Marks : {data.result.length * currentQuestion.marks}</strong></p>
                                        </div>
                                        <h5>Q{currentQuestionIndex + 1}. {currentQuestion.question}</h5>
                                        {currentQuestion.options.map((item, i) => (
                                            <p><strong>{optionLabels[i]}. </strong> {item}</p>
                                        ))}
                                        <h5><span>✅</span> {currentQuestion.correctAnswer}</h5>
                                    </div>
                                )
                            }

                            <div className='ms-auto mb-3 me-4'>
                                <button onClick={() => navigate("/admin/adminexam", { state: currentQuestion })} type="button" class="btn btn-warning me-3 text-light"><i class="bi bi-pencil-fill"></i></button>
                                <button onClick={e => examDelete(currentQuestion._id)} type="button" class="btn btn-danger"><i class="bi bi-trash-fill"></i></button>
                            </div>
                        </div>

                        <div className='d-flex justify-content-between align-item-center mt-3'>
                            <button disabled={currentQuestionIndex === 0} onClick={e => setCurrentQuestionIndex(currentQuestionIndex - 1)} type="button" class="btn btn-primary"><i class="bi bi-chevron-double-left"></i> Previous</button>
                            <button disabled={currentQuestionIndex === paperData.length - 1} onClick={e => setCurrentQuestionIndex(currentQuestionIndex + 1)} type="button" class="btn btn-primary">Next <i class="bi bi-chevron-double-right"></i></button>
                        </div>

                    </div>
                </div>
            </div>
        </div >
    </>
}

export default AdminHome