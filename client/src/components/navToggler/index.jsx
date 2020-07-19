import React from 'react'
import './index.scss'

export default function NavToggler(props) {
    return (
        <div className={`hamburger ${props.open ? "hamburger-ouvert" : ""}`} onClick={props.toggle}>
            <div className="barrehamburger"></div>
            <div className="barrehamburger"></div>
            <div className="barrehamburger"></div>
        </div>
    )
}

