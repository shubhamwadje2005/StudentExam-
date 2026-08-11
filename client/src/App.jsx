import React, { lazy, Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { Route, Routes, useLocation } from 'react-router-dom'
import { ToastContainer } from "react-toastify"
import "react-toastify/ReactToastify.css"

const UserProtected = lazy(() => import("./users/components/UserProtected"))
const AdminProtected = lazy(() => import("./admin/components/AdminProtected"))
const Success = lazy(() => import("./users/pages/Sucess"))
const UserResults = lazy(() => import("./admin/pages/UserResults"))
const Result = lazy(() => import("./users/pages/Result"))
const AdminExamTime = lazy(() => import("./admin/pages/AdminExamTime"))
const AdminHome = lazy(() => import("./admin/pages/AdminHome"))
const AdminLayout = lazy(() => import("./admin/components/AdminLayout"))
const AdminLogin = lazy(() => import("./admin/pages/AdminLogin"))
const AdminExam = lazy(() => import("./admin/pages/AdminExam"))
const UserExam = lazy(() => import("./users/pages/UserExam"))
const Login = lazy(() => import("./users/pages/UserLogin"))
const Register = lazy(() => import("./users/pages/UserRegister"))
const Layout = lazy(() => import("./users/components/Layout"))
const ExamInfo = lazy(() => import("./users/pages/ExamInfo"))
const AdminExamInfo = lazy(() => import("./admin/pages/AdminExamInfo"))

const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return <>
    <h1>{error.message}</h1>
    <button onClick={resetErrorBoundary}>Retry</button>
  </>
}

const App = () => {

  const location = useLocation()
  const Fallback = () => <h1>Loading...</h1>

  const PUBLIC_ROUETS = [
    { path: "/", element: <Login /> },
    { path: "register", element: <Register /> },
    { path: "examinfo", element: <UserProtected><ExamInfo /></UserProtected> },
    { path: "userexam/:examId", element: <UserProtected><UserExam /></UserProtected> },
    { path: "result", element: <UserProtected><Result /></UserProtected > },
    { path: "usersuccess", element: <Success /> },
  ]

  const ADMIN_ROUETS = [
    { path: "", element: <AdminExamInfo /> },
    { path: "adminhome/:examId", element: <AdminHome /> },
    { path: "userResults", element: <UserResults /> },
    { path: "examtime", element: <AdminExamTime /> },
    { path: "adminexam", element: <AdminExam /> },
  ]

  return <>
    <ToastContainer />

    <Routes>
      <Route path='/' element={<><Layout /></>}>
        {
          PUBLIC_ROUETS.map((item, index) => <Route
            key={index}
            path={item.path}
            element={
              <ErrorBoundary resetKeys={[location.pathname]} FallbackComponent={ErrorFallback}>
                <Suspense fallback={<Fallback />}>
                  {item.element}
                </Suspense>
              </ErrorBoundary>
            }
          />)
        }
      </Route>

      <Route path='/admin-login' element={<AdminLogin />} />

      <Route path='/admin' element={<AdminProtected><AdminLayout /></AdminProtected>}>
        {
          ADMIN_ROUETS.map((item, index) => <Route
            key={index}
            index={index === 0}
            path={index !== 0 ? item.path : ""}
            element={
              <ErrorBoundary resetKeys={[location.pathname]} FallbackComponent={ErrorFallback}>
                <Suspense fallback={<Fallback />}>
                  {item.element}
                </Suspense>
              </ErrorBoundary>
            }
          />)
        }
      </Route>
    </Routes >
  </>
}

export default App