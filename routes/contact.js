//CRUD 

const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.post("/user", async (req, res) => {
    try{
       const newUser = new User(req.body);
       await newUser.save()
       .then((savedUser) => {
        console.log(savedUser);
        res.status(201).json({msg: "user successfully saved"});
       } )
       .catch((error) => {
        console.log(error);
        if(error.code === 11000 && error.keyPattern.email){
            res.status(500).json({msg: "Email already exists"});
        }
        else{
            res.status(500).json({msg: "Unable to create new user"});
        }
       })
    }catch(err){
        console.log(err);
        res.status(500).json({msg: "Unable to save new user info"});
    }
})

//read all contact

router.get('/user', async (req, res) => {
    try{
        User.find()
        .then((users) => {
            console.log(users);
            res.status(200).json({users:users});
        })
    }catch(error){
        console.log(error);
        res.status(500).json({msg: "Unable to get user"});
    }
})

//read single contact
router.get('/user/:id', async (req, res) => {
    try{
        const id = req.params.id;
        User.findById(id)
        .then((user) => {
            console.log(user);
            res.status(200).json({user:user});
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({msg: "Unable to get user"})
        })
    }catch(error){
        console.log(error);
        res.status(500).json({msg: "Unable to get user"});
    }
})

//search 
router.get('/search', async (req, res) => {
    try{
        const searchTerm = req.query.searchTerm;
        const searchRegex = new RegExp(searchTerm , "i");
        await User.find({
            $or: [
                {firstname : searchRegex},
                {lastname : searchRegex},
                {email : searchRegex}
            ]
        })
        .then((users) => {
            console.log(users);
            if(users.length){
                res.status(200).json({users:users});
            }
            else{
                res.status(200).json({users: [], msg: "No matching user"});
            }

        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({msg: "Unable to find user"});
        })
    }catch(error){
        console.log(error);
        res.status(500).json({msg: "No matching records found"});
    }
})

router.put('/user/:id', async (req, res) => {
    try{
        const id = req.params.id;
        const updateUser = req.body;
        await User.findOneAndUpdate({_id:id}, updateUser, {new:true})
        .then((updateUser) => {
            console.log(updateUser);
            res.status(200).json({msg: "User updated successfully", contact: updateUser});
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({msg:"Unable to update the user"});
        })
    }catch(err) {
        console.log(err);
        res.status(500).json({msg: "No matching records found"});
    }
})

router.delete('/user/:id', async (req, res) => {
    try{
        
        const id = req.params.id;
        await User.findByIdAndDelete(id)
        .then((deleteUser) => {
             console.log(deleteUser);
             res.status(200).json({msg: "Contact deleted successfully", user : deleteUser});
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({msg: "Unable to delete the user"});
        })

    }catch(err){
        console.log(err);
        res.status(500).json({msg: "Unable to delete the contact"});
    }
})



module.exports = router;