const jwt = require('jsonwebtoken')
const accountModel = require('../models/accountModel')
const userModel = require('../models/userModel')
const mongoose = require('mongoose')

exports.authentication = function(req,res,next){

    try {
        let token= req.headers["x-api-key"]
        if(!token){
            return res.status(400).send({status:false, message:"token is not present in header"})
        }
    
        let decode = jwt.verify(token, 'FSOC', (err,decode)=>{
            if(err){
                return res.status(401).send({status:false, message:err.message})
            }
            else{
                req.decode = decode
                next()
            }
        })
    }
    catch (error) {
        return res.status(500).send({status:false, error:error.message})
    }

}

exports.autherisation = async function(req,res,next){
    try {
        let accountId = req.params.accountId
        
        if (!mongoose.isValidObjectId(accountId)) {
            return res.status(400).send({ status: false, message: "Please enter valid accountId in params" })
          }

        let checkAuth = await accountModel.findOne({_id: accountId})

        if(checkAuth.userId != req.decode.userId){
            return res.status(403).send({status:false, message:"You are not autherised"})
        }

        next()
    }
    catch (error) {
        return res.status(500).send({status:false, error:error.message})
    }
}