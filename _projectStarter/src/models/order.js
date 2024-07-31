"use strict"
const { get } = require('mongoose')
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const { mongoose } = require('../configs/dbConnection')
const { collection, validate } = require('./token')
/* ------------------------------------------------------- */
const OrderSchema = new mongoose.Schema({
    //*transform(amount güncellemesi için) kullanılmıi hali
    // userId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "User",
    //     required: true,
    // },
    // pizzaId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Pizza",
    //     require: true,
    // },
    // size: {
    //     type: String,
    //     trim: true,
    //     required: true,
    //     enum: ["Small", "Medium", "Large", "XLarge"],
    // },
    // quantity: {
    //     type: Number,
    //     default: 1,
    //     validate: (quantity) => quantity > 0
    // },
    // price: {
    //     type: Number,
    //     required: true
    // },
    // amount: {
    //     type: Number,
    //     default: function () { return this.quantity * this.price },
    //     transform: function () { return this.quantity * this.price }

    // }

    //* getters methodu ile amount güncellemesi için(toJson ekledik)
    // userId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "User",
    //     required: true,
    // },
    // pizzaId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Pizza",
    //     require: true,
    // },
    // size: {
    //     type: String,
    //     trim: true,
    //     required: true,
    //     enum: ["Small", "Medium", "Large", "XLarge"],
    // },
    // quantity: {
    //     type: Number,
    //     default: 1,
    //     validate: (quantity) => quantity > 0
    // },
    // price: {
    //     type: Number,
    //     required: true
    // },
    // amount: {
    //     type: Number,
    //     get: function () { return this.quantity * this.price },

    // }

    //* pre middleware yöntemi ile amount güncelleme
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    pizzaId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Pizza",
        require: true,
    },
    size: {
        type: String,
        trim: true,
        required: true,
        enum: ["Small", "Medium", "Large", "XLarge"],
    },
    quantity: {
        type: Number,
        default: 1,
        validate: (quantity) => quantity > 0
    },
    price: {
        type: Number,
        required: true
    },
    amount: {
        type: Number,
        get: function () { return this.quantity * this.price },

    }


},
    {
        collection: "orders",
        timestamps: true,
        toJSON: { getters: true }
    })

OrderSchema.pre('save', function (next) {
    this.amount = this.price * this.quantity
    next();
});
OrderSchema.pre('updateOne', async function (next) {
    const updateData = this.getUpdate()
    let newPrice = updateData.price
    let newQuantity = updateData.quantity
    if (newPrice || newQuantity) {
        if (!newPrice || !newQuantity) {
            const oldData = await this.model.findOne(this.getQuery())
            newPrice = newPrice || oldData.price
            newQuantity = newQuantity || oldData.quantity
        }
        this.set({ amount: newPrice * newQuantity })
    }
    next()
});
module.exports = mongoose.model("Order", OrderSchema)