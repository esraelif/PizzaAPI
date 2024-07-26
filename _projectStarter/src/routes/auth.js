"use strict"

const auth = require('../controllers/auth')

/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const router = require('express').Router()
/* ------------------------------------------------------- */
router.post("/login", auth.login)
/* ------------------------------------------------------- */
module.exports = router