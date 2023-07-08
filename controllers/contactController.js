const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");
//@desc get all contacts
//@route GET /api/contants
//@access private
const getContants = asyncHandler(async (req, res) => {
    const contact = await Contact.find({ user_id: req.user.id });
    res.status(200).json({
        status: 'Success',
        message: 'All contact',
        body: contact,
    });
});

//@desc post a contact
//@route POST /api/contants
//@access private
const createContant = asyncHandler(async (req, res) => {
    console.log(req.body);
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
        res.status(400);
        throw new Error("All field are mandatory");
    } else {
        const contact = await Contact.create(
            {
                user_id: req.user.id,
                name,
                email,
                phone,
            }
        );
        res.status(201).json({
            body: contact
        });
    }

});

//@desc update a contact
//@route PUT /api/contants
//@access private
const updateContant = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not Found");
    }else if (contact.user_id.toString == req.user.id.toString()) {
        res.status(403);
        throw new Error("You don't have permission to update other user contacts");
    }else{
        const updatedContact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({ body: updatedContact });
    }

});

//@desc delete a contact
//@route DELETE /api/contants
//@access private
const deleteContant = asyncHandler(async (req, res) => {
    console.log(req.params.id);
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not Found");
    } else if (contact.user_id.toString == req.user.id.toString()) {
        res.status(403);
        throw new Error("You don't have permission to update other user contacts");
    } else {
        await Contact.findByIdAndRemove(req.params.id);
        res.status(200).json({ body: contact });
    }



});

module.exports = {
    getContants,
    createContant,
    updateContant,
    deleteContant,
}