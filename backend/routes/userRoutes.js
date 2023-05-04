const express = require('express');
const router = express.Router();
const { userUpdate,userLogout,
        getUser,userDelete,
        uploadPicture, changePassword}= require("../Controllers/UserController")
const {protectRoutes}= require("../middleware/authControl")
const {Transacoes} = require('../Controllers/TransacoesController')
const {linkAccount} = require('../Controllers/AccountController')




router.put("/update/:id", userUpdate);
router.get("/logout/:id", userLogout);
router.get("/profile", protectRoutes, getUser);
router.patch("/changePassword", protectRoutes, changePassword);
router.patch("/delete/:id", userDelete);
router.post("/upload/:id", uploadPicture)
router.post("/transacoes", Transacoes)
router.post("/accounts",linkAccount)



module.exports = router