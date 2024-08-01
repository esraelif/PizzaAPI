"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const Token = require('../models/token')
const jwt = require('jsonwebtoken')
module.exports = async (req, res, next) => {
    const auth = req.headers?.authorization
    const tokenKey = auth ? auth.split(' ') : null
    //* sadece simple token ile kullanımı
    // if (tokenKey && tokenKey[0] == 'Token') {
    //     const tokenData = await Token.findOne({ token: tokenKey[1] }).populate('userId')
    //     req.user = tokenData ? tokenData.userId : false
    // }

    //* jwt ve simple token  ile kullanımı
    if (tokenKey) {
        if (tokenKey[0] == 'Token') {
            const tokenData = await Token.findOne({ token: tokenKey[1] }).populate('userId')
            req.user = tokenData ? tokenData.userId : false
        } else if (tokenKey[0] == 'Bearer') {
            //*jwt access tolen control
            jwt.verify(tokenKey[1], process.env.ACCESS_KEY, function (error, accessData) {
                if (accessData) {
                    console.log("jwt verify")
                    req.user = accessData
                } else {
                    console.log("jwt not verify")
                    req.user = false
                    console.log(error)
                }
            })

        }

    }
    next()
}