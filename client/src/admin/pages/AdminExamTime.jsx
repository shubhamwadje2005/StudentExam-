// import React, { useEffect } from 'react'
// import Loading from '../components/Loading'
// import { useFormik } from 'formik'
// import * as yup from "yup"
// import { toast } from "react-toastify"
// import HandleClasses from '../components/HandleClasses'
// import { useLocation, useNavigate } from 'react-router-dom'
// import { parse, format } from "date-fns"
// import { useCreateTimeMutation, useUpdateTimeExamMutation } from '../../redux/api/admin.api'


// const AdminExamTime = () => {

//     const location = useLocation()
//     const updateTime = location.state


//     const navigate = useNavigate()

//     const [setTime, { isSuccess, isLoading, isError, error }] = useCreateTimeMutation()
//     const [timeUpdate, { isSuccess: updateIsSuccess, isLoading: updateIsLoading, isError: updateIsError, error: updateError }] = useUpdateTimeExamMutation()

//     const formik = useFormik({
//         enableReinitialize: true,
//         // initialValues: {
//         //     examName: updateTime ? updateTime.examName : "",
//         //     startTime: updateTime ? format(new Date(updateTime.startTime), "HH:mm") : "",
//         //     endTime: updateTime ? format(new Date(updateTime.endTime), "HH:mm") : "",
//         //     examDate: updateTime ? format(new Date(updateTime.examDate), "yyyy-MM-dd") : "",
//         // },

//         initialValues: {
//             examName: updateTime ? updateTime.examName : "",
//             startTime: updateTime && updateTime.startTime
//                 ? format(new Date(updateTime.startTime), "HH:mm")
//                 : "",
//             endTime: updateTime && updateTime.endTime
//                 ? format(new Date(updateTime.endTime), "HH:mm")
//                 : "",
//             examDate: updateTime && updateTime.examDate
//                 ? format(new Date(updateTime.examDate), "yyyy-MM-dd")
//                 : "",
//         },

//         validationSchema: yup.object({
//             examName: yup.string().required(),
//             startTime: yup.string().required(),
//             endTime: yup.string().required(),
//             examDate: yup.string().required(),
//         }),
//         onSubmit: (values, { resetForm }) => {
//             if (updateTime) {
//                 const startDateTime = parse(
//                     `${values.examDate} ${values.startTime}`,
//                     'yyyy-MM-dd HH:mm',
//                     new Date()
//                 );

//                 const endDateTime = parse(
//                     `  ${values.examDate} ${values.endTime}`,
//                     'yyyy-MM-dd HH:mm',
//                     new Date()
//                 );

//                 timeUpdate({
//                     examName: values.examName,
//                     examDate: values.examDate,
//                     startTime: startDateTime,
//                     endTime: endDateTime,
//                     _id: updateTime._id
//                 })
//             } else {
//                 const startDateTime = parse(
//                     `${values.examDate} ${values.startTime}`,
//                     'yyyy-MM-dd HH:mm',
//                     new Date()
//                 );

//                 const endDateTime = parse(
//                     `${values.examDate} ${values.endTime}`,
//                     'yyyy-MM-dd HH:mm',
//                     new Date()
//                 );

//                 setTime({
//                     examName: values.examName,
//                     examDate: values.examDate,
//                     startTime: startDateTime,
//                     endTime: endDateTime,
//                 });
//             }

//             resetForm();
//         }
//     })


//     useEffect(() => {
//         if (isSuccess) {
//             toast.success("Exam Time set Successfully")
//             navigate("/admin/adminexam")
//         }
//     }, [isSuccess])


//     useEffect(() => {
//         if (updateIsSuccess) {
//             toast.success("Exam time updated successfully")
//             navigate("/admin/")
//         }
//     }, [updateIsSuccess])


//     useEffect(() => {
//         if (isError) {
//             toast.error("unable to set exam time")
//         }
//     }, [isError])

//     useEffect(() => {
//         if (updateIsError) {
//             toast.error(updateError.data.message || "unable to update")
//         }
//     }, [updateIsError])

//     if (isLoading || updateIsLoading) {
//         return <Loading />
//     }

//     return <>
//         <div class="container">
//             <div class="row">
//                 <div class="col-sm-6 offset-sm-3">
//                     <div class="card">
//                         <div class="card-header bg-primary text-light fs-4 text-center">Exam Time Form</div>
//                         <form onSubmit={formik.handleSubmit}>
//                             <div class="card-body">
//                                 <div class="mt-2">
//                                     <label for="examName" class="form-label">Enter Exam Name</label>
//                                     <input
//                                         {...formik.getFieldProps("examName")}
//                                         type="text"
//                                         class={HandleClasses(formik, "examName")}
//                                         id="examName"
//                                         placeholder="Enter Exam Name"
//                                     />
//                                     <div class="valid-feedback">Looks good!</div>
//                                     <div class="invalid-feedback">{formik.errors.examName}</div>
//                                 </div>
//                                 <div class="mt-2">
//                                     <label for="startTime" class="form-label">Enter Start Time</label>
//                                     <input
//                                         {...formik.getFieldProps("startTime")}
//                                         type="time"
//                                         class={HandleClasses(formik, "startTime")}
//                                         id="startTime"
//                                         placeholder="Enter Start Time"
//                                     />
//                                     <div class="valid-feedback">Looks good!</div>
//                                     <div class="invalid-feedback">{formik.errors.startTime}</div>
//                                 </div>
//                                 <div class="mt-2">
//                                     <label for="endTime" class="form-label">Enter End Time</label>
//                                     <input
//                                         {...formik.getFieldProps("endTime")}
//                                         type="time"
//                                         class={HandleClasses(formik, "endTime")}
//                                         id="endTime"
//                                         placeholder="Enter End Time"
//                                     />
//                                     <div class="valid-feedback">Looks good!</div>
//                                     <div class="invalid-feedback">{formik.errors.endTime}</div>
//                                 </div>
//                                 <div class="mt-2">
//                                     <label for="examDate" class="form-label">Enter Exam Date</label>
//                                     <input
//                                         {...formik.getFieldProps("examDate")}
//                                         type="date"
//                                         class={HandleClasses(formik, "examDate")}
//                                         id="examDate"
//                                         placeholder="Enter Exam Date"
//                                     />
//                                     <div class="valid-feedback">Looks good!</div>
//                                     <div class="invalid-feedback">{formik.errors.examDate}</div>
//                                 </div>
//                                 {
//                                     updateTime
//                                         ? <button type="submit" class="btn btn-warning text-light w-100 mt-3">Update</button>
//                                         : <button type="submit" class="btn btn-primary w-100 mt-3">Submit</button>
//                                 }
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     </>
// }

// export default AdminExamTime







import React, { useEffect } from 'react'
import Loading from '../components/Loading'
import { useFormik } from 'formik'
import * as yup from "yup"
import { toast } from "react-toastify"
import HandleClasses from '../components/HandleClasses'
import { useLocation, useNavigate } from 'react-router-dom'
import { parse, format } from "date-fns"
import { useCreateTimeMutation, useUpdateTimeExamMutation } from '../../redux/api/admin.api'

const AdminExamTime = () => {
    const location = useLocation()
    const updateTime = location.state
    const navigate = useNavigate()

    const [setTime, { isSuccess, isLoading, isError }] = useCreateTimeMutation()
    const [timeUpdate, { isSuccess: updateIsSuccess, isLoading: updateIsLoading, isError: updateIsError, error: updateError }] = useUpdateTimeExamMutation()

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            examName: updateTime ? updateTime.examName : "",
            startTime: updateTime?.startTime ? format(new Date(updateTime.startTime), "HH:mm") : "",
            endTime: updateTime?.endTime ? format(new Date(updateTime.endTime), "HH:mm") : "",
            examDate: updateTime?.examDate ? format(new Date(updateTime.examDate), "yyyy-MM-dd") : "",
        },
        validationSchema: yup.object({
            examName: yup.string().required("Exam name is required"),
            startTime: yup.string().required("Start time is required"),
            endTime: yup.string().nullable(), // optional endTime
            examDate: yup.string().required("Exam date is required"),
        }),
        onSubmit: (values, { resetForm }) => {
            if (updateTime) {
                const startDateTime = parse(
                    `${values.examDate} ${values.startTime}`,
                    'yyyy-MM-dd HH:mm',
                    new Date()
                );

                const endDateTime = parse(
                    `${values.examDate} ${values.endTime}`,
                    'yyyy-MM-dd HH:mm',
                    new Date()
                );

                timeUpdate({
                    examName: values.examName,
                    examDate: values.examDate,
                    startTime: startDateTime,
                    endTime: endDateTime,
                    _id: updateTime._id
                })
            } else {
                const startDateTime = parse(
                    `${values.examDate} ${values.startTime}`,
                    'yyyy-MM-dd HH:mm',
                    new Date()
                );

                const endDateTime = parse(
                    `${values.examDate} ${values.endTime}`,
                    'yyyy-MM-dd HH:mm',
                    new Date()
                );

                setTime({
                    examName: values.examName,
                    examDate: values.examDate,
                    startTime: startDateTime,
                    endTime: endDateTime,
                });
            }

            resetForm();
        }
    });

    useEffect(() => {
        if (isSuccess) {
            toast.success("Exam time set successfully");
            navigate("/admin/adminexam");
        }
    }, [isSuccess]);

    useEffect(() => {
        if (updateIsSuccess) {
            toast.success("Exam time updated successfully");
            navigate("/admin/");
        }
    }, [updateIsSuccess]);

    useEffect(() => {
        if (isError) {
            toast.error("Unable to set exam time");
        }
    }, [isError]);

    useEffect(() => {
        if (updateIsError) {
            toast.error(updateError?.data?.message || "Unable to update exam time");
        }
    }, [updateIsError]);

    if (isLoading || updateIsLoading) {
        return <Loading />;
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-sm-6 offset-sm-3">
                    <div className="card">
                        <div className="card-header bg-primary text-light fs-4 text-center">
                            Exam Time Form
                        </div>
                        <form onSubmit={formik.handleSubmit}>
                            <div className="card-body">
                                <div className="mt-2">
                                    <label htmlFor="examName" className="form-label">Enter Exam Name</label>
                                    <input
                                        {...formik.getFieldProps("examName")}
                                        type="text"
                                        className={HandleClasses(formik, "examName")}
                                        id="examName"
                                        placeholder="Enter Exam Name"
                                    />
                                    <div className="invalid-feedback">{formik.errors.examName}</div>
                                </div>
                                <div className="mt-2">
                                    <label htmlFor="startTime" className="form-label">Enter Start Time</label>
                                    <input
                                        {...formik.getFieldProps("startTime")}
                                        type="time"
                                        className={HandleClasses(formik, "startTime")}
                                        id="startTime"
                                        placeholder="Enter Start Time"
                                    />
                                    <div className="invalid-feedback">{formik.errors.startTime}</div>
                                </div>
                                <div className="mt-2">
                                    <label htmlFor="endTime" className="form-label">Enter End Time (optional)</label>
                                    <input
                                        {...formik.getFieldProps("endTime")}
                                        type="time"
                                        className={HandleClasses(formik, "endTime")}
                                        id="endTime"
                                        placeholder="Enter End Time"
                                    />
                                    <div className="invalid-feedback">{formik.errors.endTime}</div>
                                </div>
                                <div className="mt-2">
                                    <label htmlFor="examDate" className="form-label">Enter Exam Date</label>
                                    <input
                                        {...formik.getFieldProps("examDate")}
                                        type="date"
                                        className={HandleClasses(formik, "examDate")}
                                        id="examDate"
                                        placeholder="Enter Exam Date"
                                    />
                                    <div className="invalid-feedback">{formik.errors.examDate}</div>
                                </div>
                                <button
                                    type="submit"
                                    className={`btn w-100 mt-3 ${updateTime ? 'btn-warning text-light' : 'btn-primary'}`}
                                >
                                    {updateTime ? "Update" : "Submit"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminExamTime;
