const express = require('express');
const router  = express.Router();
const Place = require('../models/Place');
const User = require("../models/User");
const passport      = require("passport");
const ensureLogin = require("connect-ensure-login");

/* GET home page. */
router.get('/', (req, res, next) => {
  if (req.user){
    Place.find({}, (err, places)=>{
      if (err){
        res.send(err)
      } else {
        res.render('index', {places, logged: true, user: req.user});
      }
    })
  } else{
    Place.find({}, (err, places)=>{
      if (err){
        res.send(err)
      } else {
        res.render('index', {places, logged: false});
      }
    })
  }
  
});

router.get("/logout", (req, res, next) => {
  if (req.user){
   req.logout();
   res.redirect("/");
  } else {
    res.redirect("/");
  }
})

router.get('/:id', (req, res, next) => {
  Place.findOne({_id:req.params.id}, (err, place)=>{
    if (err){
      res.send(err)
    } else {
      console.log(place)
      res.render('show', {place});
    }
  })
});




module.exports = router;
