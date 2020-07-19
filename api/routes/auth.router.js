const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const passport = require('passport')
const path = require('path')
const { userRegister, userLogin, userLogout, userMe } = require('../controllers/user.controller')

class AuthRouterClass {
    constructor(){

    }

    routes(){
        router.post('/login', (req, res)=>{
            userLogin(req, res)
        })
        router.post('/register', (req, res)=>{
            userRegister(req, res)
        })
        router.get('/logout', passport.authenticate('jwt', { session: false }), (req, res)=>{
            userLogout(req, res)
        })
        router.get('/me', passport.authenticate('jwt', { session: false }), (req, res)=>{
            userMe(req, res)
        })
    }

    init(){
        this.routes()
        return router
    }
}

module.exports = AuthRouterClass