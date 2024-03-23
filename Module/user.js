const express = require('express')
const routes = express.Router()
const Admin = require('../Module/Admin')
const { body, validationResult } = require('express-validator')


routes.post('/Sigin',[
    body('name' , 'enter your name').isLength({min: 4}),
    body('email' , 'enter your email').isEmail(),
    body('password' , 'enter your password').isLength({min: 4})
] , async(req , res)=>{
    try {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({errors  : errors.array()})
        }

        let admin = await Admin.findOne({email  : req.body.email})
        if(admin){
            return res.status(400).json({errors : 'this is already have'})
        }

        admin = await Admin.create({
            name : req.body.name,
            email : req.body.email,
            password : req.body.password,
         })

        const data = {
           admin :{
            id : admin.id
           }
        }
          const token = data
          console.log(token)
          res.json(admin)
    } catch (error) {
       
    }
})

routes.post('/login',[
    body('email' , 'enter your email').isEmail(),
    body('password' , 'enter your password').exists()
] , async(req , res)=>{
    try {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({errors  : errors.array()})
        }

       const{email , password} = req.body
       let admin = await Admin.findOne({email})
       if(!admin){
           return res.status(400).json({errors : 'user is not match'})
       }
       
       const thispassword = (password === admin.password)
       if(!thispassword){
         return res.status(401).json({errors : "password is not match"})
       }

        const alldata = {
           admin : admin.id
        }
          res.json(alldata)

    } catch (error) {
        return res.status(401).send('error')
    }
})


module.exports = routes