const JwtStrategy = require('passport-jwt').Strategy
const Users = require('../models/user.model')
const jwt = require('jsonwebtoken')

const checkTokenFromCookies = (req, res) => {
    let token = null
    if (req && req.cookies) {
        token = req.cookies[process.env.COOKIE_NAME]
    }
    return token
}

const authJwt = (passport) => {
    const opts = {
        jwtFromRequest: checkTokenFromCookies,
        secretOrKey: process.env.JWT_SECRET,
    }
    
    passport.use(new JwtStrategy(opts, (jwtPayload, done) => {
        Users.findOne({ _id: jwtPayload.id }, (err, data) => {
            if (err) { 
                return done(err, false)
            }
            if (data) { 
                return done(null, {_id: data._id, pseudo: data.pseudo}) 
            }
            else { 
                return done(null, false) 
            }
        })
    }))
}

module.exports = {
    setAuthentication: (passport) => {
        authJwt(passport)
    },
}
