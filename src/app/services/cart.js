// "use server"
import {revalidate} from "next/cache"
import notifyError from "../utils/notifyError"
import notifySuccess from "../utils/notifySuccess"

export const removeCartItem = async (id) => {
    try {
        
        const response = await fetch(`/api/cart/${id}`, {method: "DELETE"})
        const result = await response.json()
        console.log(result.response)
        notifySuccess(result?.response?.message)
        revalidate("/cart")
        
    } catch (error) {
        console.log(error)
        notifyError("An error has occured")
    }
}