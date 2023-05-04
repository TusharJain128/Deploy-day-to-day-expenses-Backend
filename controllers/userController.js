const mongoose = require("mongoose");
const userModel = require("../models/userModel");
const {createUserJoi, loginJoi} = require("../validator/joiValidation")
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const saltrounds = 10; // represents the number of rounds of hashing to apply to the password

    //------------------------------------Register User--------------------------------->

    module.exports.registerUser= async function(req, res) {

        try {
            let data = req.body

            let error
            const validation = await createUserJoi.validateAsync(data).then(()=> true).catch((err)=>{error=err.message; return null})
            if(!validation) return res.status(400).send({  status: false,message: error})

            data.email = data.email.toLowerCase()
            let uniqueCheckEmail = await userModel.findOne({ email: data.email, isDeleted: false })
            if (uniqueCheckEmail) {
                return res.status(400).send({ status: false, message: "email is already exist" })
            }

            let uniqueCheckMobile = await userModel.findOne({ mobile: data.mobile, isDeleted: false })
            if (uniqueCheckMobile) {
                return res.status(400).send({ status: false, message: "Mobile number is already exist" })
            }

            let encryptedPassword = await bcrypt.hash(data.password, saltrounds)
            data.password = encryptedPassword
            
            let createUser = await userModel.create(data)

            res.status(201).send({ status: true, message: createUser })
        }
    catch(error) {
        res.status(500).send({ status: false, error: error.message })
    }
}

    //------------------------------------Login User--------------------------------->

    module.exports.loginUser= async function(req,res){

        try {
            let data = req.body
            
            let error
            const validation = await loginJoi.validateAsync(data).then(()=> true).catch((err)=>{error=err.message; return null})
            if(!validation) return res.status(400).send({  status: false,message: error})
    
            data.email = data.email.toLowerCase()
            let checkEmail = await userModel.findOne({ email: data.email, isDeleted: false })
            if (!checkEmail) {
                return res.status(400).send({ status: false, message: "email is not registered, please register first" })
            }
    
            const decodedPassword = await bcrypt.compare(data.password, checkEmail.password)
            if(!decodedPassword){
                return res.status(400).send({status:false, message:"Please enter correct password"})
            }
            else{
                let token = jwt.sign({userId: checkEmail._id}, "FSOC")
                res.status(200).send({status:true, token: token})
            }
        }
        catch (error) {
            res.status(500).send({ status: false, error: error.message })
        }
    }
