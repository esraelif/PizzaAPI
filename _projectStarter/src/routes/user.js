"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const router = require('express').Router()
const user = require("../controllers/user")
const idValidation = require("../middlewares/idValidation")
const permissions = require("../middlewares/permissions")

//*  /user
router.route('/').get(permissions.isAdmin, user.list).post(user.create)
router.route('/:id').all(idValidation).get(permissions.isLogin, user.read).put(permissions.isLogin, user.update).patch(permissions.isLogin, user.update).delete(user.delete)
/* ------------------------------------------------------- */

/* ------------------------------------------------------- */
module.exports = router