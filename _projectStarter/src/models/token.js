"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const { mongoose } = require('../configs/dbConnection')
/* ------------------------------------------------------- */
const TokenSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true,
        index: true,
        unique: true,
    },
    token: {
        type: String,
        trim: true,
        require: true,
        index: true,
        unique: true
    }
}, {
    collection: "tokens",
    timestamps: false
})

module.exports = moongose.model('Token', TokenSchema)