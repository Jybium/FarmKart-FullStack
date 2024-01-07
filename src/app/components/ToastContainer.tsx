"use client"


import { ToastContainer } from "react-toastify"
import "react-toastify/ReactToastify.min.css"
import "react-toastify/ReactToastify.css"

interface ToastProviderProps {
    children : React.ReactNode
}

export default function ToastProvider({children}: ToastProviderProps){
    return(
        <>
        {children}
        <ToastContainer/>
        </>
    )
}