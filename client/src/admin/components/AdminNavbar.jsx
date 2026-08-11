import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from "react-toastify"
import { useAdminLogoutMutation } from '../../redux/api/auth.api'
import Loading from './Loading'

const AdminNavbar = () => {

    const { admin } = useSelector(state => state.auth)
    const [adminLogout] = useAdminLogoutMutation()


    return <>
        <nav class="navbar navbar-expand-lg bg-primary navbar-dark mb-5 sticky-top z-50">
            <div class="container">
                <Link to="/admin" class="navbar-brand">Admin Panel</Link>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div class="navbar-nav ms-auto gap-2">
                        <Link to="/admin" class="nav-link active">Exam Info</Link>
                        {/* <Link to="adminhome" class="nav-link active">Home</Link> */}
                        <Link to="userResults" class="nav-link active">Results</Link>
                        <Link to="examtime" class="nav-link active">Time</Link>
                        <Link to="adminexam" class="nav-link active">Exam</Link>
                    </div>
                </div>
                {
                    admin && <div class="dropdown">
                        <button class="btn btn-light dropdown-toggle ms-3" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" >
                            {admin.name}
                        </button>
                        <ul class="dropdown-menu">
                            <li><button onClick={adminLogout} class="dropdown-item text-danger">Logout</button></li>
                        </ul>
                    </div>
                }
            </div>
        </nav>
    </>
}

export default AdminNavbar