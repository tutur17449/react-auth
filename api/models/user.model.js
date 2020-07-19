const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs')

const usersSchema = new Schema({
    email : {
        type : String,
        lowercase : true,
        unique : true,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    pseudo : {
        type : String,
        required : true
    },
    createdOn : { type : Date, default : Date.now}
})

// Enregistrement de l'utilisateur (toujours hasher les mots de passe en production) 
usersSchema.pre('save', function (next) {  
    var user = this
    if (this.isModified('password') || this.isNew) {
      bcrypt.genSalt(10, function (err, salt) {
        if (err) {
          return next(err)
        }
        bcrypt.hash(user.password, salt, function(err, hash) {
          if (err) {
            return next(err)
          }
          user.password = hash
          next()
        })
      })
    } else {
      return next()
    }
  })
  
  // Comparaison des mots de passes reçus et en base
  usersSchema.methods.comparePassword = function(pw, cb) {  
    bcrypt.compare(pw, this.password, function(err, isMatch) {
      if (err) {
        return cb(err)
      }
      cb(null, isMatch)
    })
  }

module.exports = mongoose.model('Users', usersSchema)