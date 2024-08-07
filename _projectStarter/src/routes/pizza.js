"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const router = require('express').Router()
/* ------------------------------------------------------- */
const pizza = require("../controllers/pizza")
const idValidation = require("../middlewares/idValidation")
const { isAdmin } = require("../middlewares/permissions")
const multer = require("multer")

const upload = multer({
    // dest: "./uploads"
    storage: multer.diskStorage({
        destination: "./uploads",
        filename: function (req, file, returnCallback) {
            // returnCallback(null, "pizza,jpeg") upload dosyasının ismini biz manuel verdik
            returnCallback(null, file.originalname) //upload dosyasının ismi nasıl kayıt edildi ise öyle gelir
        }

    })
})
//*  /pizza
// router.route('/').get(pizza.list).post(isAdmin, upload.single("fileInputName"), pizza.create)
// router.route('/').get(pizza.list).post(isAdmin, upload.single("image"), pizza.create)  tekli upload için
router.route('/').get(pizza.list).post(isAdmin, upload.array("images", 10), pizza.create)  //çoklu upload için
router.route('/:id').all(idValidation).get(pizza.read).put(isAdmin, pizza.update).patch(isAdmin, pizza.update).delete(isAdmin, pizza.delete)
/* ------------------------------------------------------- */
module.exports = router