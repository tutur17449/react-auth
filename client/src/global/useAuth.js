import React, { useState, useEffect } from "react"
import { checkAuth, logout } from '../actions/auth.actions'
import cookie from 'js-cookie'

export const AuthContext = React.createContext({})

export const AuthProvider = ({ children }) => {

    const [auth, setAuth] = useState({
        isAuth: false,
        user: null,
        role: "visitor"
    });

    useEffect(() => {
        async function checkUserAuth() {
            if(typeof cookie.get(process.env.REACT_APP_COOKIE_NAME) !== 'undefined'){
                try {
                    const user = await checkAuth()
                    setAuth({
                        isAuth: true,
                        user: {
                            email: user.data.email,
                            pseudo: user.data.pseudo,
                        },
                        role: "user"
                    })
                } catch (error) {
                    auth.isAuth &&
                        setAuth({
                            isAuth: false,
                            user: null,
                            role: "visitor"
                        })
                }
            }
        }

        checkUserAuth()
    }, [])

    const onLogout = async () => {
        try {
            const user = await logout()
            cookie.remove(process.env.REACT_APP_COOKIE_NAME)
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