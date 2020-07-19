const mongoose = require('mongoose');

let options = null

if(process.env.NODE_ENV === 'prod'){
    options = {
        dbName: process.env.MONGO_DBNAME,
        user: process.env.MONGO_USER,
        pass: process.env.MONGO_PWD,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }    
} else {
    options = {
        dbName: process.env.MONGO_DBNAME,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }      
}

const initClient = () => {
    return new Promise( (resolve, reject) => {
        mongoose.connect(process.env.MONGO_URL, options)
        .then( db => resolve( { db: process.env.MONGO_DBNAME, url: process.env.MONGO_URL } ))
        .catch( error => reject(`MongoDB not connected`, error) )
    })
}

module.exports = {initClient};