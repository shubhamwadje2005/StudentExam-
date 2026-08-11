// import React, { useEffect, useState } from 'react'
// import { useFormik } from 'formik'
// import * as yup from 'yup'
// import HandleClasses from '../components/HandleClasses'
// import { useCreateExamMutation, useExamNameQuery, useUpdateExamMutation } from '../../redux/api/admin.api'
// import Loading from '../components/Loading'
// import { toast } from "react-toastify"
// import { useLocation, useNavigate } from 'react-router-dom'


// const AdminExam = () => {
//     const [examId, setExamId] = useState()
//     const navigate = useNavigate()

//     const location = useLocation()
//     const updateData = location.state

//     const [examCreate, { isSuccess, isLoading, isError, error }] = useCreateExamMutation()
//     const [examUpdate, { isSuccess: updateIsSuccess, isLoading: updateIsLoading, isError: updateIsError, error: updateError }] = useUpdateExamMutation()
//     const { data } = useExamNameQuery()

//     const formik = useFormik({
//         enableReinitialize: true,
//         initialValues: {
//             question: updateData ? updateData.question : "",
//             firstoption: updateData ? updateData.firstoption : "",
//             secondoption: updateData ? updateData.secondoption : "",
//             thirdoption: updateData ? updateData.thirdoption : "",
//             fourthoption: updateData ? updateData.fourthoption : "",
//             correctAnswer: updateData ? updateData.correctAnswer : "",
//             marks: updateData ? updateData.marks : "",
//         },
//         validationSchema: yup.object({
//             question: yup.string().required(),
//             firstoption: yup.string().required(),
//             secondoption: yup.string().required(),
//             thirdoption: yup.string().required(),
//             fourthoption: yup.string().required(),
//             correctAnswer: yup.string().required(),
//         }),
//         onSubmit: (values, { resetForm }) => {
//             if (updateData) {
//                 examUpdate({ ...values, _id: updateData._id })
//             } else {
//                 examCreate(values)
//             }
//             resetForm()
//         }
//     })

//     useEffect(() => {
//         if (isSuccess) {
//             toast.success("Exam Create Successfully")
//             // navigate("/admin")
//         }
//     }, [isSuccess])

//     useEffect(() => {
//         if (updateIsSuccess) {
//             toast.success("Exam Update Successfully")
//             navigate("/admin")
//         }
//     }, [updateIsSuccess])


//     useEffect(() => {
//         if (isError) {
//             toast.error(error.data.message || "unable to Create")
//         }
//     }, [isError])

//     useEffect(() => {
//         if (updateIsError) {
//             toast.error(updateError.data.message || "unable to Update")
//         }
//     }, [updateIsError])

//     if (isLoading || updateIsLoading) {
//         return <Loading />
//     }

//     return <>
//         <div class="container dropdown d-flex justify-content-end mb-4">
//             <button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" >
//                 Exam Name
//             </button>
//             <ul class="dropdown-menu">
//                 {
//                     data && data.result.map(item => <li key={item._id}>
//                         <button onClick={e => setExamId(item._id)} class="dropdown-item" id={item._id}>{item.examName}</button>
//                     </li>)
//                 }
//             </ul>
//         </div>

//         <div class="container mb-5">
//             <div class="row">
//                 <div class="col-sm-6 offset-sm-3">
//                     <div class="card">
//                         <div class="card-header bg-primary text-light fs-5 text-center">Exam Panel</div>
//                         <form onSubmit={formik.handleSubmit} autoComplete='off'>
//                             <div class="card-body">
//                                 <div>
//                                     <label for="qusetion" class="form-label">Enter Question</label>
//                                     <input
//                                         {...formik.getFieldProps("question")}
//                                         type="text"
//                                         class={HandleClasses(formik, "question")}
//                                         id="question"
//                                         placeholder="Enter Your Question"
//                                     />
//                                     <div class="valid-feedback">Looks good!</div>
//                                     <div class="invalid-feedback">{formik.errors.question}</div>
//                                 </div>

//                                 <div>
//                                     <label for="firstoption" class="form-label">Enter First Answer</label>
//                                     <input
//                                         {...formik.getFieldProps("firstoption")}
//                                         type="text"
//                                         class={HandleClasses(formik, "firstoption")}
//                                         id="firstoption"
//                                         placeholder="Enter First Answer"
//                                     />
//                                     <div class="valid-feedback">Looks good!</div>
//                                     <div class="invalid-feedback">{formik.errors.firstoption}</div>
//                                 </div>

//                                 <div>
//                                     <label for="secondoption" class="form-label">Enter Second Answer </label>
//                                     <input
//                                         {...formik.getFieldProps("secondoption")}
//                                         type="text"
//                                         class={HandleClasses(formik, "secondoption")}
//                                         id="secondoption"
//                                         placeholder="Enter Second Answer"
//                                     />
//                                     <div class="valid-feedback">Looks good!</div>
//                                     <div class="invalid-feedback">{formik.errors.secondoption}</div>
//                                 </div>

//                                 <div>
//                                     <label for="thirdoption" class="form-label">Enter Third Answer</label>
//                                     <input
//                                         {...formik.getFieldProps("thirdoption")}
//                                         type="text"
//                                         class={HandleClasses(formik, "thirdoption")}
//                                         id="thirdoption"
//                                         placeholder="Enter Third Answer"
//                                     />
//                                     <div class="valid-feedback">Looks good!</div>
//                                     <div class="invalid-feedback">{formik.errors.thirdoption}</div>
//                                 </div>

//                                 <div>
//                                     <label for="fourthoption" class="form-label">Enter Fourth Answer</label>
//                                     <input
//                                         {...formik.getFieldProps("fourthoption")}
//                                         type="text"
//                                         class={HandleClasses(formik, "fourthoption")}
//                                         id="fourthoption"
//                                         placeholder="Enter Fourth Answer"
//                                     />
//                                     <div class="valid-feedback">Looks good!</div>
//                                     <div class="invalid-feedback">{formik.errors.fourthoption}</div>
//                                 </div>


//                                 <div>
//                                     <label for="correctAnswer" class="form-label">Enter Correct Answer</label>
//                                     <input
//                                         {...formik.getFieldProps("correctAnswer")}
//                                         type="text"
//                                         class={HandleClasses(formik, "correctAnswer")}
//                                         id="correctAnswer"
//                                         placeholder="Enter Correct Answer"
//                                     />
//                                     <div class="valid-feedback">Looks good!</div>
//                                     <div class="invalid-feedback">{formik.errors.correctAnswer}</div>
//                                 </div>


//                                 <div>
//                                     <label for="marks" class="form-label">Enter Marks</label>
//                                     <input
//                                         {...formik.getFieldProps("marks")}
//                                         type="text"
//                                         class={HandleClasses(formik, "marks")}
//                                         id="marks"
//                                         placeholder="Enter Marks"
//                                     />
//                                     <div class="valid-feedback">Looks good!</div>
//                                     <div class="invalid-feedback">{formik.errors.marks}</div>
//                                 </div>
//                                 <button
//                                     type="submit"
//                                     className={`btn ${updateData ? 'btn-warning' : 'btn-primary'} w-100 mt-3`}
//                                     disabled={!examId && !updateData}
//                                 >
//                                     {updateData ? 'Update' : 'Submit'}
//                                 </button>


//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     </>
// }
// // {
// // updateData
// //     ? <button type="submit" class="btn btn-warning text-light w-100 mt-3">Update</button>
// //     : <button type="submit" class="btn btn-primary w-100 mt-3">Submit</button>
// // }

// export default AdminExam





import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import HandleClasses from '../components/HandleClasses'
import { useCreateExamMutation, useExamNameQuery, useUpdateExamMutation } from '../../redux/api/admin.api'
import Loading from '../components/Loading'
import { toast } from "react-toastify"
import { useLocation, useNavigate } from 'react-router-dom'

const AdminExam = () => {
    const [examId, setExamId] = useState(null)
    const navigate = useNavigate()
    const location = useLocation()
    const updateData = location.state

    const [examCreate, { isSuccess, isLoading, isError, error }] = useCreateExamMutation()
    const [examUpdate, { isSuccess: updateIsSuccess, isLoading: updateIsLoading, isError: updateIsError, error: updateError }] = useUpdateExamMutation()
    const { data } = useExamNameQuery()


    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            question: updateData ? updateData.question : "",
            firstoption: updateData ? updateData.firstoption : "",
            secondoption: updateData ? updateData.secondoption : "",
            thirdoption: updateData ? updateData.thirdoption : "",
            fourthoption: updateData ? updateData.fourthoption : "",
            correctAnswer: updateData ? updateData.correctAnswer : "",
            marks: updateData ? updateData.marks : "",

        },
        validationSchema: yup.object({
            question: yup.string().required(),
            firstoption: yup.string().required(),
            secondoption: yup.string().required(),
            thirdoption: yup.string().required(),
            fourthoption: yup.string().required(),
            correctAnswer: yup.string().required(),
            marks: yup.number().required(),
        }),
        onSubmit: (values, { resetForm }) => {
            if (updateData) {
                examUpdate({ ...values, _id: updateData._id })
            } else {
                if (!examId) {
                    toast.error("Please select an Exam Name before submitting.")
                    return
                }
                examCreate({ exam: examId, ...values })
            }
            resetForm()
        }
    })

    useEffect(() => {
        if (isSuccess) {
            navigate("/admin")
            toast.success("Question added successfully")
        }
    }, [isSuccess])

    useEffect(() => {
        if (updateIsSuccess) {
            toast.success("Exam question updated successfully")
            navigate("/admin/")
        }
    }, [updateIsSuccess])

    useEffect(() => {
        if (isError) {
            toast.error(error?.data?.message || "Unable to create question")
        }
    }, [isError])

    useEffect(() => {
        if (updateIsError) {
            toast.error(updateError?.data?.message || "Unable to update question")
        }
    }, [updateIsError])

    if (isLoading || updateIsLoading) {
        return <Loading />
    }

    return (
        <>
            <select class="form-select mb-5" onChange={e => setExamId(e.target.value)}>
                <option value="" selected disabled>Select Exam Name</option>
                {
                    data && data.result.map(item =>
                        <option
                            value={item._id}
                            id={item._id}>
                            {item.examName}
                        </option>)
                }
            </select>

            <div className="container mb-5">
                <div className="row">
                    <div className="col-sm-6 offset-sm-3">
                        <div className="card">
                            <div className="card-header bg-primary text-light fs-5 text-center">Exam Panel</div>
                            <form onSubmit={formik.handleSubmit} autoComplete='off'>
                                <div className="card-body">

                                    {/* Question Input */}
                                    <div>
                                        <label htmlFor="question" className="form-label">Enter Question</label>
                                        <input
                                            {...formik.getFieldProps("question")}
                                            type="text"
                                            className={HandleClasses(formik, "question")}
                                            id="question"
                                            placeholder="Enter Your Question"
                                        />
                                        <div className="invalid-feedback">{formik.errors.question}</div>
                                    </div>

                                    {/* Options */}
                                    {["firstoption", "secondoption", "thirdoption", "fourthoption"].map((field, idx) => (
                                        <div key={field}>
                                            <label htmlFor={field} className="form-label">{`Enter ${field.charAt(0).toUpperCase() + field.slice(1).replace("option", " Answer")}`}</label>
                                            <input
                                                {...formik.getFieldProps(field)}
                                                type="text"
                                                className={HandleClasses(formik, field)}
                                                id={field}
                                                placeholder={`Enter ${field}`}
                                            />
                                            <div className="invalid-feedback">{formik.errors[field]}</div>
                                        </div>
                                    ))}

                                    {/* Correct Answer */}
                                    <div>
                                        <label htmlFor="correctAnswer" className="form-label">Enter Correct Answer</label>
                                        <input
                                            {...formik.getFieldProps("correctAnswer")}
                                            type="text"
                                            className={HandleClasses(formik, "correctAnswer")}
                                            id="correctAnswer"
                                            placeholder="Enter Correct Answer"
                                        />
                                        <div className="invalid-feedback">{formik.errors.correctAnswer}</div>
                                    </div>

                                    {/* Marks */}
                                    <div>
                                        <label htmlFor="marks" className="form-label">Enter Marks</label>
                                        <input
                                            {...formik.getFieldProps("marks")}
                                            type="number"
                                            className={HandleClasses(formik, "marks")}
                                            id="marks"
                                            placeholder="Enter Marks"
                                        />
                                        <div className="invalid-feedback">{formik.errors.marks}</div>
                                    </div>

                                    {/* Submit Button */}
                                    <button
                                        type="submit"
                                        className={`btn ${updateData ? 'btn-warning' : 'btn-primary'} w-100 mt-3`}
                                        disabled={!examId && !updateData}
                                    >
                                        {updateData ? 'Update' : 'Submit'}
                                    </button>

                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminExam
