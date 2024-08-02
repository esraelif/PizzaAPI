"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const Order = require("../models/order")
module.exports = {
    list: async (req, res) => {
        let customFilter = {}
        if (!req.user.isAdmin) {
            customFilter = { userId: req.user._id }
        }
        const data = await res.getModelList(Order, customFilter)
        res.status(200).send({
            error: false,
            details: await res.getModelListDetails,
            data
        })
    },
    //CRUD
    create: async (req, res) => {
        //delete req.body.amount amount alanını db ye eklememek için
        if (!req.user.isAdmin) {
            req.body.userId = req.user._id //*istek atan user
        }

        const data = await Order.create(req.body)
        res.status(201).send({
            error: false,
            data
        })
    },
    read: async (req, res) => {
        const data = await Order.findOne({ _id: req.params.id })
        res.status(200).send({
            error: false,
            data
        })
    },
    update: async (req, res) => {
        //delete req.body.amount amount alanını db ye eklememek için,amount hesaplamasını getters ile yapıyoruz.
        const data = await Order.updateOne({ _id: req.params.id }, req.body, { runValidators: true })
        res.status(202).send({
            error: false,
            data,
            newData: await Order.findOne({ _id: req.params.id })


        })
    },
    delete: async (req, res) => {
        const data = await Order.deleteOne({ _id: req.params.id })
        res.status(data.deletedCount ? 204 : 404).send({
            error: !data.deletedCount,
            data,
            message: "Order not found"
        }
        )
    }
}