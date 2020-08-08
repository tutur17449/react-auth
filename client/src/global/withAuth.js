import React from 'react'
import useAuth from './useAuth'
import  { Redirect } from 'react-router-dom'

export default function withAuth(WrappedComponent, props) {
    return function() {

        const {auth} = useAuth()

        return(
            auth.isAuth ? (
                <WrappedComponent {...props} />
            ) : (
                <Redirect to='/login'  />
            ) 
        )
     }
}