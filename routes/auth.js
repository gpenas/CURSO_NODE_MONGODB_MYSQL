const express = require("express");
const router = express.Router();
const { RegisterCtrl, loginCtrl } = require("../controllers/auth");
const { validatorLogin, validatorRegister} = require("../validators/auth");

//todo http://localhost/tracks GET, POST, DELETE, PUT

router.post("/register", validatorRegister, RegisterCtrl);

router.post("/login", validatorLogin, loginCtrl);


module.exports = router;