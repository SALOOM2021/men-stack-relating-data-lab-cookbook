// controllers/foods.js

const express = require('express');
const router = express.Router();

const User = require('../models/user.js');

router.get(`/`, async (req,res)=>{
    try {
        // Look up the user from req.session
        const currentUser = await User.findById(req.session.user._id);
        res.render("foods/index.ejs", {
            pantry: currentUser.pantry,
        });
      } catch (error) {
        // If any errors, log them and redirect back home
        console.log(error);
        res.redirect('/');
      }
});

router.get(`/new`, (req,res)=>{
    res.render(`foods/new.ejs`)
});

router.post("/", async (req,res)=>{
    try {
        // Look up the user from req.session
        const currentUser = await User.findById(req.session.user._id);
        currentUser.pantry.push(req.body);
        await currentUser.save();
        res.redirect(`/users/${currentUser._id}/foods`);
      } catch (error) {
        // If any errors, log them and redirect back home
        console.log(error);
        res.redirect('/');
      }
})

module.exports = router;
