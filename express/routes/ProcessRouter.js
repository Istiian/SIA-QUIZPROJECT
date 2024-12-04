// routes/ProcessRouter.js
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/User.model');

// GET ALL USER
router.get("/", async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
        res.status(500).json({message: err.message});
    } catch (error) {  
    }
});

// GET ONE USER
// router.get("/:id", GetUser, (req, res) => {
//     res.send(res.user.Username);
//     req.session.Username = res.user.Username;
//     if(req.session.Username != null){
//         req.session.IfLogIn == true;
//     }
// });

router.get("/AddScore", (req, res) =>{
    res.send("Hello");
});

router.post("/", async (req,res)=>{
    const ProcessType = req.body.Process;

    if(ProcessType == "SignUp"){
        const CreateUsername = req.body.CreateUsername;
        const CreatePassword = req.body.CreatePassword;
        // const CreateConfirmPassword = req.body.CreateConfirmPassword;

        const existingUser = await User.findOne({Username: CreateUsername});
        if(existingUser){
            res.render("SignUp",{Problem: true});
        }else{
            const user = new User({
                Username: CreateUsername,
                Password: CreatePassword
            })

            try{
                const newUser = await user.save();
                
                req.session.Username = CreateUsername;
                req.session.IfLogIn = true;

                res.render("Home", { 
                    IfLogIn: req.session.IfLogIn, 
                    Username: req.session.Username || "Guest" 
                });
                
            }catch (error){
                res.status(500).json({message: error.message});
            }
        }
    }else if (ProcessType == "SignIn"){
        const InputedUsername =  req.body.Username;
        const InputedPassword = req.body.Password;
        console.log(InputedPassword);
        console.log(InputedUsername);
        try{
            const users = await User.findOne({ Username: InputedUsername })
            if (!users) {
                // if wrong username
                res.render("SignIn",{Problem:true});
            }else{
                if(users.Username == InputedUsername && users.Password == InputedPassword){
                    req.session.Username = users.Username;
                    req.session.IfLogIn = true;
                    // if success 
                    res.render("Home", { 
                        IfLogIn: req.session.IfLogIn, 
                        Username: req.session.Username
                    });
                }else{
                    // If wrong password 
                    res.render("SignIn",{Problem: true});
                }
            }
             
        }catch (error){
            return res.status(500).json({ message: error.message });
        }
        
    }
});

// Middleware to get user by ID
async function GetUser(req, res, next) {
    try {
        const user = await User.findById(req.params.id);
        if (user == null) {
            return res.status(404).json({ message: "Cannot Find User" });
        }
        res.user = user; // Attach the user to the res object
        next();
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}


module.exports = router;
