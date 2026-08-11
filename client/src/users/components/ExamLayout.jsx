import React from 'react'
import ExamNavbar from './ExamNavbar'
import { Outlet } from 'react-router-dom'

const ExamLayout = () => {
    return <>
        <ExamNavbar />
        <Outlet />
    </>
}

export default ExamLayout