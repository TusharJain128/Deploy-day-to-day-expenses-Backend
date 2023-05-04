const accountModel = require('../models/accountModel')
const { accountsJoi } = require("../validator/joiValidation")

module.exports.CreateDetails = async function (req, res) {

    try {
        let data = req.body

        let error
        const validation = await accountsJoi.validateAsync(data).then(() => true).catch((err) => { error = err.message; return null })
        if (!validation) return res.status(400).send({ status: false, message: error })

        data.userId = req.decode.userId

        let createData = await accountModel.create(data)

        res.status(201).send({ status: true, message: createData })
    } catch (error) {
        res.status(500).send({ status: false, error: error.message })
    }
}


module.exports.updateDetails = async function (req, res) {

    try {
        let data = req.body
        let accountId = req.params.accountId

        if (!mongoose.isValidObjectId(accountId)) {
            return res.status(400).send({ status: false, message: "Please enter valid contactId in params" })
        }

        let error
        const validation = await accountsJoi.validateAsync(data).then(() => true).catch((err) => { error = err.message; return null })
        if (!validation) return res.status(400).send({ status: false, message: error })

        let savedDetails = await accountModel.findOneAndUpdate(
            { _id: accountId, isDeleted: false },
            data,
            { new: true }
        )

        res.status(200).send({ status: true, message: savedDetails })
    }
    catch (error) {
        res.status(500).send({ status: false, error: error.message })
    }
}

module.exports.getDetails = async function (req, res) {

    try {

        // I will add monthly, daily, yearly

        let findDetails = await accountModel.find({ userId: req.decode.userId, isDeleted: false }).lean()
        res.status(200).send({ status: true, message: findDetails })
    }
    catch (error) {
        res.status(500).send({ status: false, error: error.message })
    }
}

module.exports.getDetailsById = async function (req, res) {

    try {
        let accountId = req.params.accountId

        let findDetails = await accountModel.findOne({ userId: req.decode.userId,_id:accountId, isDeleted: false }).lean()
        res.status(200).send({ status: true, message: findDetails })
    }
    catch (error) {
        res.status(500).send({ status: false, error: error.message })
    }
}

module.exports.deleteDetails = async function (req, res) {

    try {
      let accountId = req.params.accountId
  
      await accountModel.findOneAndUpdate(
        { _id: accountId, isDeleted: false },
        { isDeleted: true },
        { new: true }
      )
  
      res.status(200).send({ status: true, message: "detail is successfully deleted" })
    }
    catch (error) {
      res.status(500).send({ status: false, error: error.message })
    }
  }
  