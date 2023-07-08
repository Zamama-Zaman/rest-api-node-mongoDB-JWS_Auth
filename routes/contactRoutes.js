const express = require("express");
const router = express.Router();
const { 
    getContants,
    createContant,
    updateContant,
    deleteContant, 
} = require("../controllers/contactController");

router.route("/contants").get(getContants);

router.route("/contants").post(createContant);

router.route("/contants").put(updateContant);

router.route("/contants").delete(deleteContant);

module.exports = router;