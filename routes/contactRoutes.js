const express = require("express");
const validateToken = require("../middleware/validateTokenHandler");
const router = express.Router();
const { 
    getContants,
    createContant,
    updateContant,
    deleteContant, 
} = require("../controllers/contactController");

router.use(validateToken);

router.route("/contants").get(getContants);

router.route("/contants").post(createContant);

router.route("/contants/:id").put(updateContant);

router.route("/contants/:id").delete(deleteContant);

module.exports = router;