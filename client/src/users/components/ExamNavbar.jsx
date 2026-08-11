import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { useUserLogoutMutation } from '../../redux/api/auth.api'

const ExamNavbar = () => {

    const navigate = useNavigate()

    const [logout, { isSuccess }] = useUserLogoutMutation()
    const { user } = useSelector(state => state.auth)

    useEffect(() => {
        if (isSuccess) {
            toast.success("User Logout Successfully")
            navigate("/")
        }
    }, [isSuccess])

    return <>
        <nav class="navbar navbar-expand-lg bg-primary navbar-dark mb-5 sticky-top z-50">
            <div class="container">
                <Link to="/user" class="navbar-brand" href="#">User</Link>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div class="navbar-nav ms-auto gap-2">
                        {/* <Link to="/user" class="nav-link active">Exam</Link> */}
                        {/* <Link to="result" class="nav-link active">Result</Link> */}
                    </div>
                </div>
                <div class="dropdown">
                    {
                        user && <button class="btn btn-light ms-3 dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" >
                            <img src={user.picture} referrerPolicy="no-referrer" width={40} height={40} className='rounded-5 me-2' alt="" />
                            {user.name}
                        </button>
                    }
                    <ul class="dropdown-menu">
                        <li><button onClick={logout} class="dropdown-item text-danger">Logout</button></li>
                    </ul>
                </div>
            </div>
        </nav>
    </>
}

export default ExamNavbar