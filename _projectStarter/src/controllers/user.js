"use strict"
const { CustomError } = require("../errors/customError")
const sendMail = require("../helpers/sendMail")
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */

const User = require("../models/user")
module.exports = {
    list: async (req, res) => {
        const data = await res.getModelList(User)
        res.status(200).send({
            error: false,
            details: await res.getModelListDetails,
            data
        })
    },
    //CRUD
    create: async (req, res) => {

        const data = await User.create(req.body)
        sendMail(data.email, "Welcome", `<h1>Welcome ${data.username}</h1><p>Kaydınız Başarı ile oluşturuldu</p>`)
        res.status(201).send({
            error: false,
            data
        })
    },
    read: async (req, res) => {
        //admin değilse kullanıcıya kendi bilgilerini gönder
        // let customFilter = {}
        // if (!req.user.isAdmin) {
        //     customFilter = { _id: req.user._id }
        // } else {
        //     customFilter = { _id: req.params.id }
        // }
        // const data = await User.findOne(customFilter)
        // admin değilse ve istediği bilgiler kendine ait değilse kullanıcıya hata mesajı gönder
        let customFilter = {}
        if (!req.body.isAdmin) {
            if (req.body._id !== req.params.id) {
                throw new CustomError("No permisson! You must be admin or own")
            }
        }
        const data = await User.findOne({ _id: req.params.id })


        res.status(200).send({
            error: false,
            data
        })
    },
    update: async (req, res) => {
        let customFilter = {}
        if (!req.user.isAdmin) {
            customFilter = { _id: req.user._id }
        } else {
            customFilter = { _id: req.params.id }
        }
        const data = await User.updateOne(customFilter, req.body, { runValidators: true })
        res.status(202).send({
            error: false,
            data,
            newData: await User.findOne({ _id: req.params.id })


        })
    },
    delete: async (req, res) => {
        const data = await User.deleteOne({ _id: req.params.id })
        res.status(data.deletedCount ? 204 : 404).send({
            error: !data.deletedCount,
            data,
            message: "User not found"
        }
        )
    }
}