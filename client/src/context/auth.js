import React, { useState, useEffect } from "react"
import AuthService from '../services/auth.service'
import Cookies from 'js-cookie'

export const AuthContext = React.createContext({})

export const AuthProvider = ({ children }) => {

    const [auth, setAuth] = useState({
        isAuth: false,
        user: null
    });

    useEffect(() => {

    }, [])

    return (
        <AuthContext.Provider value={{ auth, setAuth }} >
            {children}
        </AuthContext.Provider>
    );
}