"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const router = require('express').Router()
/* ------------------------------------------------------- */
const order = require("../controllers/order")
const idValidation = require("../middlewares/idValidation")
const permissions = require('../middlewares/permissions')
const NoPermission = require("../middlewares/permissions")

//*  /order
router.route('/')
    .get(permissions.isLogin, order.list)
    .post(permissions.isLogin, order.create)

router.route('/:id').all(idValidation)
    .get(permissions.isLogin, order.read)
    .put(permissions.isAdmin, order.update)
    .patch(permissions.isAdmin, order.update)
    .delete(permissions.isAdmin, order.delete)
/* ------------------------------------------------------- */
module.exports = router