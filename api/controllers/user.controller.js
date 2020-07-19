const { sendApiErrorResponse, sendApiSuccessResponse, sendBodyError, sendFieldsError } = require('../services/response.service')
const { checkFields } = require('../services/request.service')
const Mandatories = require('../services/mandatory.service')
const Users = require('../models/user.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const secretJwt = process.env.JWT_SECRET

exports.userRegister = (req, res) => {
    if (typeof req.body === 'undefined' || req.body === null) {
        sendBodyError(res, 422, 'No body data')
    } else {
        const { miss, extra, ok } = checkFields( Mandatories.register , req.body)
        if (!ok) {
            sendFieldsError(res, 422, 'Invalid fields', miss, extra)
        } else {
            user = new Users({
                email: req.body.email,
                password: req.body.password,
                pseudo: req.body.pseudo
            })
            user.save((err, user) => {
                if (err) {
                    sendApiErrorResponse(res, 500, err, 'L\'utilisateur existe déjà')
                } else {
                    sendApiSuccessResponse(res, 200, user, 'Utilisateur enregistré') 
                }
            })            
        }
    }
}

exports.userLogin = (req, res) => {
    if (typeof req.body === 'undefined' || req.body === null) {
        sendBodyError(res, 422, 'No body data')
    } else {
        const { miss, extra, ok } = checkFields( Mandatories.login , req.body)
        if (!ok) {
            sendFieldsError(res, 422, 'Invalid fields', miss, extra)
        } else {
            Users.findOne({ email: req.body.email }, (err, data) => {
                if (err || data === null) {
                    sendApiErrorResponse(res, 500, err, 'L\'utilisateur n\'existe pas')
                } else {
                    let user = {
                        id: data._id,
                        role: data.role,
                        pseudo: data.pseudo,
                    }
                    const validPwd = bcrypt.compareSync(req.body.password, data.password);
                    if (!validPwd) {
                        sendApiErrorResponse(res, 422, err, 'Le mot de passe ne correspond pas.')
                    } else {
                        let token = jwt.sign(user,secretJwt,{ expiresIn: 86400000  })
                        let cookie = req.cookies[process.env.COOKIE_NAME]   
                        if (cookie === undefined || cookie === null || typeof cookie === 'undefined') {
                            if(process.env.NODE_ENV === 'prod'){
                                res.cookie(process.env.COOKIE_NAME, token, { maxAge: 86400000 , httpOnly: true, secure: true, domain: 'objectif-regime.ahl-app.fr'})
                                sendApiSuccessResponse(res, 200, user, 'Utilisateur connecté.') 
                            } else {
                                res.cookie(process.env.COOKIE_NAME, token, { maxAge: 86400000 , httpOnly: true})
                                sendApiSuccessResponse(res, 200, user, 'Utilisateur connecté.')     
                            }
                        } else {
                            sendApiErrorResponse(res, 422, err, 'Connexion impossible, l\'utilisateur est déjà connecté.')
                        } 
                    }
                }
            })             
        }
    }
}



exports.userMe = (req, res) => {
    Users.findOne({_id: req.user._id}, (err,data)=>{
        if(err) {
            sendApiErrorResponse(res, 500, err, 'Impossible d\'afficher les informations du profil.')   
        } else {
            if(!data || data.length === 0 || data === []){
                sendApiErrorResponse(res, 403, err, 'Unauthorized.')
            } else {
                const identity = {
                    email: data.email,
                    pseudo: data.pseudo,
                }
                sendApiSuccessResponse(res, 200, identity, 'Profil récuperé avec succès !')
            } 
        }
    })
}

exports.userLogout = (req, res, next) => {
    try{
        if(process.env.NODE_ENV === 'prod'){
            res.clearCookie(process.env.COOKIE_NAME, {path: '/', domain: '.objectif-regime.ahl-app.fr'})
            sendApiSuccessResponse(res, 200, 'Déconnecté', 'Utilisateur déconnecté avec succès !') 
        } else {
            res.clearCookie(process.env.COOKIE_NAME)
            sendApiSuccessResponse(res, 200, 'Déconnecté', 'Utilisateur déconnecté avec succès !') 
        }
    } catch(err){
        sendApiErrorResponse(res, 500, err, 'Impossible de déconnecter l\'utilisateur') 
    }
}