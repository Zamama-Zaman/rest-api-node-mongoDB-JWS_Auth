const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

//@desc register a user
//@route POST /api/user
//@access public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory!");
    }
    const userAvailble = await User.findOne({ email });
    if (userAvailble) {
        res.status(400);
        throw new Error("user already register!");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("hash Password", hashedPassword);

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
    });

    if (user) {
        res.status(201).json({
            status: 'Success',
            message: 'User register successfully',
            body: {
                name: user.name,
                email: user.email,
                _id: user._id,
                created_at: user.createdAt,
                updated_at: user.updatedAt,
            },
        });
    } else {
        res.status(400);
        throw new Error("User data is not valid");
    }


});

//@desc login a user
//@route POST /api/user
//@access public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const user = await User.findOne({ email });

    // compare password with hashpassword 
    if (user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign({
            user: {
                name: user.name,
                email: user.email,
                id: user.id,
            }
        },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn: "15m",
            }
        );
        res.status(200).json({
            status: 'Success',
            message: 'User is successfully login',
            body: {
                "user": user,
                "token": accessToken,
            },
        });
    }else{
        res.status(401);
        throw new Error("Email or password is not valid");
    }
    
});

//@desc get a user
//@route GET /api/user
//@access private
const getUser = asyncHandler(async (req, res) => {
    res.status(200).json({
        status: 'Success',
        message: 'Fetched user data successfully',
        body: req.user,
    });
});

module.exports = {
    registerUser,
    loginUser,
    getUser,
}