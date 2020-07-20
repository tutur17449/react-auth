import React from 'react'
import Navbar from '../components/navbar/index'
import Footer from '../components/footer/index'
import withAuth from '../hoc/withAuth'

function PrivateRoute(){
    return(
        <React.Fragment>
            <Navbar />
            <h1>PrivateRoute</h1>
            <Footer />
        </React.Fragment>
    )
}

PrivateRoute = withAuth(PrivateRoute)

export default PrivateRoute