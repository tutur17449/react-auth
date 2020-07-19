import React, { useState, useEffect } from "react"
import { checkAuth, logout } from '../services/auth.service'
import Cookies from 'js-cookie'

export const AuthContext = React.createContext({})

export const AuthProvider = ({ children }) => {

    const [auth, setAuth] = useState({
        isAuth: false,
        user: null
    });

    useEffect(() => {
        async function checkUserAuth() {
            try {
                const user = await checkAuth()
                setAuth({
                    isAuth: true,
                    user: user.data
                })
            } catch (error) {
                auth.isAuth &&
                    setAuth({
                        isAuth: false,
                        user: null
                    })
            }
        }

        checkUserAuth()
    }, [])

    const onLogout = async () => {
        try {
            const user = await logout()
            window.location.href = '/'
        } catch (error) {
            window.location.href = '/'
        }
    }

    return (
        <AuthContext.Provider value={{ auth, setAuth, onLogout }} >
            {children}
        </AuthContext.Provider>
    );
}

export default function useAuth() {
    const context = React.useContext(AuthContext)
    return context
};