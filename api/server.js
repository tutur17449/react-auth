require('dotenv').config()

const express = require('express')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const path = require('path')
const cors = require('cors')
const passport = require('passport')
const cookieParser = require('cookie-parser')
const mongoDB = require('./services/db.service')
const { setAuthentication } = require('./middlewares/auth.middleware')
const server = express()
const port = process.env.PORT


let corsOptions = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    res.header('Access-Control-Allow-Headers', 'Content-Type')
    res.header('Access-Control-Allow-Credentials', true)
    next()
}

class ServerClass {
    init() {
        server.disable('x-powered-by')
        server.use(corsOptions)
        server.use(bodyParser.json({ limit: '10mb' }))
        server.use(bodyParser.urlencoded({ extended: true }))
        server.use(cookieParser(process.env.COOKIE_SECRET))
        setAuthentication(passport)
        this.serverRoutes()
    }

    serverRoutes() {
        // API
            // Auth
            const AuthRouterClass = require('./routes/auth.router')
            const AuthRouter = new AuthRouterClass()
            server.use('/api/auth', AuthRouter.init())

        // START
        this.launch()
    }

    launch() {
        mongoDB.initClient()
            .then(db => {
                server.listen(port, () => console.log(`Server is running on port http://localhost:${port}/`))
            })
            .catch(dberror => {
                console.log(dberror)
            })
    };
}

new ServerClass().init();