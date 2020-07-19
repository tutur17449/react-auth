import React from 'react'
import Navbar from '../components/navbar/index'
import Footer from '../components/footer/index'

export default function PrivateRoute(){
    return(
        <React.Fragment>
            <Navbar />
            <h1>PrivateRoute</h1>
            <Footer />
        </React.Fragment>
    )
}