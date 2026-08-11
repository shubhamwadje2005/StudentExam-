import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { format } from 'date-fns'
import { useGetExamTimeQuery } from '../../redux/api/user.api'

const ExamInfo = () => {

    const navigate = useNavigate()
    const { data } = useGetExamTimeQuery()

    return <>
        <div className="container-fluid mb-5">
            <div className="row justify-content-center gap-5">
                {data && data.setTime.map(item =>
                    <div className="col-md-4 mb-5">
                        <div class="card text-center">
                            <div class="card-header bg-primary text-light fs-3">{item.examName}</div>
                            <div class="card-body">
                                <p>Start Time:-{format(new Date(item.startTime), 'hh:mm a')}</p>
                                <p>End Time:-{format(new Date(item.endTime), 'hh:mm a')}</p>
                                <p>Exam Date:-{format(item.examDate, "EEEE dd MMMM yyyy")}</p>
                            </div>
                            <div className="card-footer d-flex justify-content-between align-items-center ">
                                <div>
                                    <button onClick={e => navigate(`/userexam/${item._id}`)} type="button" class="btn btn-primary">View Question</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    </>
}

export default ExamInfo