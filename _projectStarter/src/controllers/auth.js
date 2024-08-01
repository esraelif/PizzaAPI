"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const User = require("../models/user")
const Token = require("../models/token")
const { CustomError } = require("../errors/customError")
const passwordEncrypt = require("../helpers/passwordEncrypt")
const jwt = require("jsonwebtoken")

module.exports = {
    login: async (req, res) => {
        const { username, email, password } = req.body
        if (password && (username || email)) {
            const user = await User.findOne({ $or: [{ email }, { username }] })
            if (user && user.password == passwordEncrypt(password)) {
                //* simple token---------------------------


                if (user.isActive) {
                    let tokenData = await Token.findOne({ userId: user._id })
                    if (!tokenData) {
                        tokenData = await Token.create({
                            userId: user._id,
                            token: passwordEncrypt(user.id + Date.now())
                        })
                    }
                    //* simple token--------------------------

                    //! jwt----------------------------------------
                    //!access token
                    const accessInfo = {
                        key: process.env.ACCESS_KEY,
                        time: process.env.ACCESS_EXP || "5m",
                        data: {
                            _id: user._id,
                            id: user._id,
                            username: user.username,
                            email: user.email,
                            password: user.password,
                            isActive: user.isActive,
                            isAdmin: user.isAdmin,
                        }
                    }

                    //!refresh token
                    const refreshInfo = {
                        key: process.env.REFRESH_KEY,
                        time: process.env.REFRESH_EXP || "3d",
                        data: {
                            _id: user._id,
                            id: user._id,
                            password: user.password,

                        }
                    }
                    //* jwt.sign(data,secret_key,options)
                    const accessToken = jwt.sign(accessInfo.data, accessInfo.key, { expiresIn: accessInfo.time })
                    const refreshToken = jwt.sign(refreshInfo.data, refreshInfo.key, { expiresIn: refreshInfo.time })
                    //!jwt----------------------------------
                    res.status(200).send({
                        error: false,
                        token: tokenData.token,
                        user,
                    })
                } else {
                    throw new CustomError('This account is inactive!', 401)
                }
            } else {
                throw new Error('Wrong username*password or email', 401)
            }
        } else {
            throw new CustomError('Please enter username/email and password ', 401)
        }
    },
    logout: async (req, res) => {
        const auth = req.headers?.authorization
        const tokenKey = auth ? auth.split(' ') : null
        let deleted = null
        if (tokenKey && tokenKey[0] == 'Token') {
            deleted = await Token.deleteOne({ token: tokenKey[1] })
        }
        res.status(deleted?.deletedCount > 0 ? 200 : 400).send({
            error: !deleted?.deletedCount,
            deleted,
            message: deleted?.deletedCount > 0 ? "logout ok" : "logout failed"
        })



    }
}
