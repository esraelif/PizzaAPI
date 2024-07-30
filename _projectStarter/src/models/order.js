"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const { mongoose } = require('../configs/dbConnection')
const { collection, validate } = require('./token')
/* ------------------------------------------------------- */
const orderSchema = new mongoose.Schema[{
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

    }

},
{
    collection: "orders",
    timestamps: true
}]
module.exports = mongoose.model("Order", orderSchema)