import React from 'react'
import Navbar from '../components/navbar/index'
import Footer from '../components/footer/index'
import Role from '../global/role'

export default function Home(){

    return(
        <React.Fragment>
            <Navbar />
            <Role
                action="home:click"
                yes={<p>You have the permission to see this</p>}
                no={""}
            />
            <h1>Home</h1>
            <Footer />
        </React.Fragment>
    )
}