import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDeleteTimeExamMutation, useExamNameQuery, useLazyGetPaperQuery, useUpdateTimeExamMutation } from '../../redux/api/admin.api'
import { format } from 'date-fns'
import { useState } from 'react'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import Loading from '../components/Loading'

const AdminExamInfo = () => {
    const [examId, setExamId] = useState(null)
    const [fetchPaper, { data: exampaper }] = useLazyGetPaperQuery()
    const navigate = useNavigate()
    const { data } = useExamNameQuery()
    const [timeexam, { isSuccess, isError, error, isLoading }] = useDeleteTimeExamMutation()
    const [updateexam, { isSuccess: updateIsSuccess, isError: updateIsError, error: updateError, isLoading: updateIsLoading }] = useUpdateTimeExamMutation()

    useEffect(() => {
        if (examId) {
            fetchPaper(examId)
        }
    }, [examId])

    useEffect(() => {
        if (updateIsSuccess) {
            toast.success("exam update success")
        }
    }, [updateIsSuccess])

    useEffect(() => {
        if (updateIsError) {
            toast.warn(updateError.data.message || "unable to update")
        }
    }, [updateIsError])


    useEffect(() => {
        if (isSuccess) {
            toast.success("exam delete success")
        }
    }, [isSuccess])

    useEffect(() => {
        if (isError) {
            toast.error(error.data.message || "unable to delete")
        }
    }, [isError])

    if (isLoading || updateIsLoading) {
        return <Loading />
    }
    return <>
        <div className='container-fluid mb-5'>
            {
                data && <table class="table table-bordered table-light table-striped table-hover text-center">
                    <thead>
                        <tr>
                            <th>No.Sr</th>
                            <th>Exam Name</th>
                            <th>Start Time</th>
                            <th>End Time</th>
                            <th>Exam Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>{
                        data.result.map((item, i) => <tr key={item._id}>
                            <td>{i + 1}</td>
                            <td>{item.examName}</td>
                            <td>{format(new Date(item.startTime), 'hh:mm a')}</td>
                            <td>{format(new Date(item.endTime), 'hh:mm a')}</td>
                            <td>{format(item.examDate, "EEEE dd MMMM yyyy")}</td>
                            <td>
                                <button onClick={e => navigate("/admin/examtime", { state: item })} type="button" class="btn btn-warning me-3 text-light"><i class="bi bi-pencil-fill"></i></button>
                                <button onClick={e => timeexam(item._id)} type="button" class="btn btn-danger me-3"><i class="bi bi-trash-fill"></i></button>
                                <button onClick={e => navigate(`/admin/adminhome/${item._id}`)} type="button" class="btn btn-primary"><i class="bi bi-eye-fill"></i></button>
                            </td>
                        </tr>)}
                    </tbody>
                </table>
            }
        </div >
    </>
}

export default AdminExamInfo
