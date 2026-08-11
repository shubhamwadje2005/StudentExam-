import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from "formik"
import { GoogleLogin } from "@react-oauth/google"
import * as yup from "yup"
import HandleClasses from '../../admin/components/HandleClasses'
import { useUserLoginMutation } from '../../redux/api/auth.api'
import { toast } from 'react-toastify'
import Loading from '../../admin/components/Loading'

const UserLogin = () => {

    const navigate = useNavigate()
    const [signin, { isSuccess, isLoading, isError, error }] = useUserLoginMutation()

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
            signin(values)
            resetForm()
        }
    })

    // useEffect(() => {
    //     if (isSuccess) {
    //         toast.success("User Login Successfully")
    //         navigate("userexam")
    //     }
    // }, [isSuccess])
    useEffect(() => {
        if (isSuccess) {
            toast.success("User Login Successfully")
            navigate("examinfo")
        }
    }, [isSuccess])

    useEffect(() => {
        if (isError) {
            toast.error(error.data.message || "unable to Login")
        }
    }, [isError])

    if (isLoading) {
        return <Loading />
    }

    return <>
        <div class="container">
            <div class="row">
                <div class="col-sm-6 offset-sm-3">
                    <div class="card">
                        <div class="card-header bg-primary text-light fs-4 text-center">Signin</div>
                        <form onSubmit={formik.handleSubmit}>
                            <div class="card-body">
                                <div class="mt-2">
                                    <label for="email" class="form-label">Enter Email</label>
                                    <input
                                        {...formik.getFieldProps("email")}
                                        type="email"
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
                                        type="text"
                                        class={HandleClasses(formik, "password")}
                                        id="password"
                                        placeholder="Enter Your Password"
                                    />
                                    <div class="valid-feedback">Looks good!</div>
                                    <div class="invalid-feedback">{formik.errors.password}</div>
                                </div>
                                <button type="submit" class="btn btn-primary w-100 mt-3">
                                    Signin
                                </button>
                                <p class="text-center mt-3">
                                    Don't Have Account? <Link to="/register">Create Account</Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>


        <div class="d-flex justify-content-center align-content-center m-3">
            <GoogleLogin
                onSuccess={data => {
                    signin(data)
                }}
                onError={err => {
                    console.log(err)
                }}
            />
        </div>

    </>
}

export default UserLogin