const mongoose = require('mongoose')
const {Schema} = mongoose

const userSchems = new Schema({
    name:{
        type :  String,
        require : true,
    },
    email:{
        type : String,
        require:true
    },
    password : {
        type : String,
        require:true
    },
    Date :{
        type: Date,
    }
})

const Admin = mongoose.model('Admin', userSchems)
module.exports = Admin