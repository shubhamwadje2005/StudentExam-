import React from 'react'

const Loading = () => {
    return <div className='vh-100 w-100 d-flex justify-content-center align-items-center position-absolute top-0 start-0 bg-light'>
        <h6>Please Wait...</h6>
        <div class="spinner-border text-primary"></div>
    </div>
}

export default Loading