import React from 'react'
import Navbar from '../components/navbar/index'
import Footer from '../components/footer/index'

export default function PublicRoute(){
    return(
        <React.Fragment>
            <Navbar />
            <h1>PublicRoute</h1>
            <Footer />
        </React.Fragment>
    )
}