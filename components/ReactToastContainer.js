import React from 'react'
import { Slide, ToastContainer } from 'react-toastify'

const ReactToastContainer = ({ children }) => {
    return (
        <>
            <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                transition={Slide}
            />
            {children}
        </>
    )
}

export default ReactToastContainer