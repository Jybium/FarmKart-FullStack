"use client"

import React, { createContext, useContext, useState, } from "react";

export const AuthContext = createContext({})

const AuthProvider = ({children}) =>{

    const [user, setUser] = useState({});
    const [loading, setLoading] = useState()

    


    return <AuthContext.Provider value={{user, setUser, loading, setLoading}}>
        {children}
    </AuthContext.Provider>

}

export default AuthProvider

export const useAuth = () => {

    return useContext(AuthContext)
}
