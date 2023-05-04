const express = require('express');
const app = express();
const router = express.Router();
const {registerUser,userLogin, forgotPassword, resetPassword}= require("../Controllers/AuthController")

const multer= require("multer");
const path= require("path");



app.use("/stored", express.static(path.resolve("./frontend/public/stored")));

/* FILE STORAGE */
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./frontend/public/stored");
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  });
  const upload = multer({ storage });

router.post("/login", userLogin);
router.post("/register", upload.single("picture"), registerUser);
router.post("/forgotpassword", forgotPassword)
router.put("/resetPassword/:resetToken", resetPassword)


module.exports = router


