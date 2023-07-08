const asyncHandler = require("express-async-handler");
//@desc get all contacts
//@route GET /api/contants
//@access public
const getContants = asyncHandler(async (req, res) => {
    res.status(200).json({ message: "Get all Contants" });
});

//@desc post a contact
//@route POST /api/contants
//@access public
const createContant = asyncHandler(async (req, res) => {
    console.log("The request body is: ", req.body);
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
        res.status(400);
        throw new Error("All field are mandatory");
    }
    res.status(201).json({
        message: "Created Contact"
    });
});

//@desc update a contact
//@route PUT /api/contants
//@access public
const updateContant = asyncHandler(async (req, res) => {
    res.status(200).json({ message: "update a Contants" });
});

//@desc delete a contact
//@route DELETE /api/contants
//@access public
const deleteContant = asyncHandler(async (req, res) => {
    res.status(200).json({ message: "delete a Contants" });
});

module.exports = {
    getContants,
    createContant,
    updateContant,
    deleteContant,
}