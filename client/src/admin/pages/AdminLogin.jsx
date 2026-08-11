import React, { useEffect } from 'react'
import { useFormik } from "formik"
import { Link, useNavigate } from 'react-router-dom'
import * as yup from "yup"
import { toast } from "react-toastify"
import { useAdminLoginMutation } from '../../redux/api/auth.api'
import Loading from '../components/Loading'
import HandleClasses from '../components/HandleClasses'

const AdminLogin = () => {

    const navigate = useNavigate()
    const [adminLogin, { isSuccess, isLoading, isError, error }] = useAdminLoginMutation()

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: yup.object({
            email: yup.string().required().email(),
            password: yup.string().required(),
        }),
        onSubmit: (values, { resetForm }) => {
            adminLogin(values)
            resetForm()
        }
    })

    useEffect(() => {
        if (isSuccess) {
            toast.success("Admin Login Successfully")
            navigate("/admin")
        }
    }, [isSuccess])

    useEffect(() => {
        if (isError) {
            toast.error(error?.data?.message || "unable to register")
        }
    }, [isError])

    if (isLoading) {
        return <Loading />
    }

    return <>
        <div class="container m-5">
            <div class="row">
                <div class="col-sm-6 offset-sm-3">
                    <div class="card">
                        <div class="card-header bg-primary text-light fs-4 text-center">Login</div>
                        <form onSubmit={formik.handleSubmit} autoComplete='off'>
                            <div class="card-body">
                                <div>
                                    <label for="email" class="form-label">Enter Email</label>
                                    <input
                                        {...formik.getFieldProps("email")}
                                        autoComplete='off'
                                        type="text"
                                        class={HandleClasses(formik, "email")}
                                        id="email"
                                        placeholder="Enter Your Email"
                                    />
                                    <div class="valid-feedback">Looks good!</div>
                                    <div class="invalid-feedback">{formik.errors.email}</div>
                                </div>
                                <div class="mt-2">
                                    <label for="password" class="form-label">Enter Password</label>
                                    <input
                                        {...formik.getFieldProps("password")}
                                        autoComplete='new-password'
                                        type="password"
                                        class={HandleClasses(formik, "password")}
                                        id="password"
                                        placeholder="Enter Your Password"
                                    />
                                    <div class="valid-feedback">Looks good!</div>
                                    <div class="invalid-feedback">{formik.errors.password}</div>
                                </div>
                                <button type="submit" class="btn btn-primary w-100 mt-3">
                                    Login
                                </button>
                                <p class="text-center mt-3">
                                    {/* Dont Have Account? <Link>Create Account</Link> */}
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default AdminLogin