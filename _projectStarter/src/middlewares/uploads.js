"use strict"
const multer = require("multer")

module.exports = multer({
    // dest: "./uploads"
    storage: multer.diskStorage({
        destination: "./uploads",
        filename: function (req, file, returnCallback) {
            // returnCallback(null, "pizza,jpeg") upload dosyasının ismini biz manuel verdik
            returnCallback(null, file.originalname) //upload dosyasının ismi nasıl kayıt edildi ise öyle gelir
        }

    })
})