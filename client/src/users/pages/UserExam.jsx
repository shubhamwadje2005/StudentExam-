import React, { useEffect, useState } from 'react'
import { useGetExamTimeQuery, useGetUserExamPaperQuery, useLazyGetUserExamPaperQuery, useUserExamCheckMutation } from '../../redux/api/user.api'
import { useSelector } from 'react-redux'
import { toast } from "react-toastify"
import Loading from '../../admin/components/Loading'
import { useNavigate, useParams } from 'react-router-dom'
import { useRef } from 'react'
import { useExamNameQuery } from '../../redux/api/admin.api'

const UserExam = () => {
    const { examId } = useParams()
    // const [examId, setExamId] = useState(null)

    const navigate = useNavigate()
    const { data: examName } = useExamNameQuery()

    const currentUserId = useSelector(state => state.auth.user.id)
    const [userExamData, { isSuccess, isLoading, isError, error }] = useUserExamCheckMutation()

    const [paperData, setPaperData] = useState([])
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
    const [answer, setAnswer] = useState([])
    // const { data } = useGetUserExamPaperQuery()
    const [fetchPaper, { data }] = useLazyGetUserExamPaperQuery()

    const { data: examTime } = useGetExamTimeQuery()
    const currentQuestion = paperData[currentQuestionIndex]

    const answerRef = useRef([]);
    const hasSubmittedRef = useRef(false);
    const [timeLeft, setTimeLeft] = useState('');


    // useEffect(() => {
    //     if (!examTime?.setTime?.[0] || paperData.length === 0) return;

    //     const start = new Date(examTime.setTime[0].startTime).getTime();
    //     const end = new Date(examTime.setTime[0].endTime).getTime();
    //     const now = new Date().getTime();

    //     if (now < start) {
    //         setTimeLeft('Exam has not started yet!');
    //         navigate("/"); // 👈 Send back to home
    //         return;
    //     }

    //     if (now > end) {
    //         setTimeLeft('Exam time is over!');
    //         navigate("/"); // 👈 Send back to home
    //         return;
    //     }

    //     // start timer
    //     const interval = setInterval(() => {
    //         const now = new Date().getTime();

    //         if (now > end) {
    //             if (!hasSubmittedRef.current) {
    //                 handleSubmit();
    //                 hasSubmittedRef.current = true;
    //             }
    //             clearInterval(interval);
    //             setTimeLeft('Time is up!');
    //         } else {
    //             const diff = end - now;
    //             const h = Math.floor(diff / (1000 * 60 * 60) % 24);
    //             const mins = Math.floor(diff / 1000 / 60);
    //             const secs = Math.floor((diff / 1000) % 60);
    //             setTimeLeft(`${h}houre ${mins} min ${secs < 10 ? '0' + secs : secs} sec`);
    //         }
    //     }, 1000);

    //     return () => clearInterval(interval);
    // }, [examTime, paperData]);


    useEffect(() => {
        if (!examTime?.setTime || examTime.setTime.length === 0 || paperData.length === 0) return;

        const now = new Date().getTime();

        // Find the currently running exam
        const currentExam = examTime.setTime.find((exam) => {
            const start = new Date(exam.startTime).getTime();
            const end = new Date(exam.endTime).getTime();
            return now >= start && now <= end;
        });

        if (!currentExam) {
            setTimeLeft('No active exam found or exam not started!');
            navigate("/");
            return;
        }

        const end = new Date(currentExam.endTime).getTime();

        const interval = setInterval(() => {
            const now = new Date().getTime();

            if (now > end) {
                if (!hasSubmittedRef.current) {
                    handleSubmit();
                    hasSubmittedRef.current = true;
                }
                clearInterval(interval);
                setTimeLeft('Time is up!');
            } else {
                const diff = end - now
                const h = Math.floor(diff / (1000 * 60 * 60) % 24);
                const mins = Math.floor(diff / 1000 / 60);
                const secs = Math.floor((diff / 1000) % 60);
                setTimeLeft(`${h} hours ${mins} min ${secs < 10 ? '0' + secs : secs} sec`);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [examTime, paperData]);


    useEffect(() => {
        if (examId) {
            fetchPaper(examId)
        }
    }, [examId])


    useEffect(() => {
        console.log(currentQuestionIndex);
    }, []);


    useEffect(() => {
        if (data && data.result) {
            const processedData = data.result.map(item => {
                const options = [
                    item.firstoption,
                    item.secondoption,
                    item.thirdoption,
                    item.fourthoption
                ]
                return { ...item, options }
            })
            setPaperData(processedData)
        }
    }, [data])

    const handleOptionSelect = value => {
        const answer = {
            userId: currentUserId,
            questionId: currentQuestion._id,
            question: currentQuestion.question,
            selectedOption: value
        }

        setAnswer(previous => {
            const updated = previous.filter(a => a.questionId !== currentQuestion._id)
            const final = [...updated, answer]
            answerRef.current = final;
            return final;
        })
    }


    const handleSubmit = async () => {
        if (hasSubmittedRef.current) return;

        const finalAnswers = paperData.map(question => {
            const existingAnswer = answerRef.current.find(ans => ans.questionId === question._id);
            return {
                userId: currentUserId,
                questionId: question._id,
                question: question.question,
                selectedOption: existingAnswer?.selectedOption || "Not Attempted"
            };
        });

        const paperDataUser = {
            userId: currentUserId,
            answers: finalAnswers
        };

        await userExamData({ ...paperDataUser, exam: examId });
        hasSubmittedRef.current = true;
    };



    useEffect(() => {
        if (isSuccess) {
            navigate("/usersuccess")
        }
    }, [isSuccess])

    useEffect(() => {
        if (isError) {
            toast.error(error.data.message || "unable to submit exam")
        }
    }, [isError])

    if (isLoading) {
        return <Loading />
    }

    return <>
        {/* <select class="form-select mb-5" onChange={e => setExamId(e.target.value)}>
            <option value="" selected disabled>Select Exam Name</option>
            {
                examName && examName.result.map(item =>
                    <option
                        value={item._id}
                        id={item._id}>
                        {item.examName}
                    </option>)
            }
        </select> */}
        <div className="container">
            <div class="card">
                <div className="card-header bg-primary text-light fs-4 text-center">
                    Exam Paper
                    <h5 className="text-center text-light mt-3">⏳ Time Left: {timeLeft}</h5>
                </div>
                <div class="card-body">
                    <div className="container">
                        <div class="card">
                            {currentQuestion && (
                                <div className="card-body p-5">
                                    <div className='d-flex justify-content-end'>
                                        <p><strong>Total Marks : {data.result.length * currentQuestion.marks}</strong></p>
                                    </div>
                                    <h5>Q{currentQuestionIndex + 1}. {currentQuestion.question}</h5>
                                    {currentQuestion.options.map((item, i) => (

                                        <div className="form-check" key={i}>
                                            <input
                                                onChange={(e) => handleOptionSelect(e.target.value)}
                                                className="form-check-input"
                                                type="radio"
                                                value={item}
                                                name={`question-${currentQuestion._id}`}
                                                checked={answer.some(a => a.questionId === currentQuestion._id && a.selectedOption === item)}
                                                id={`options-${i}`}
                                            />
                                            <label className="form-check-label">
                                                {item}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            )}
                            <div className='d-flex justify-content-between align-item-center m-3 '>
                                <button disabled={currentQuestionIndex === 0} onClick={e => setCurrentQuestionIndex(currentQuestionIndex - 1)} type="button" class="btn btn-primary"><i class="bi bi-chevron-double-left"></i> Previous</button>
                                <button disabled={currentQuestionIndex === paperData.length - 1} onClick={e => setCurrentQuestionIndex(currentQuestionIndex + 1)} type="button" class="btn btn-primary">Next <i class="bi bi-chevron-double-right"></i></button>
                            </div>
                        </div>
                        <div className='text-center'>
                            <button disabled={hasSubmittedRef.current} onClick={handleSubmit} type="submit" class="btn btn-primary w-50  mt-3">Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default UserExam