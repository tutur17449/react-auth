import React from 'react'
import useAuth from './useAuth'
import roleConfig from './role.config.json'

export default function Role(props){

    const {auth} = useAuth()

    const checkPermission = (role, action) => {
        const permissionList = roleConfig[role]
        const checkAction = typeof permissionList !== "undefined" ? permissionList.indexOf(action) : -1

        if(checkAction !== -1){
            return true
        } 
        return false
        
    }

    return(
        checkPermission(auth.role, props.action) ? (
            props.yes
        ) : (
            props.no
        )
    )
}