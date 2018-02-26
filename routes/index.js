const express = require('express');
const router  = express.Router();
const Place = require('../models/Place');
const User = require("../models/User");

/* GET home page. */
router.get('/', (req, res, next) => {
  if (req.user){
    Place.find({}, (err, places)=>{
      if (err){
        res.send(err)
      } else {
        res.render('index', {places, logged: true});
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

router.get('/show', (req, res, next) => {
  Place.find({}, (err, places)=>{
    if (err){
      res.send(err)
    } else {
      res.render('show', {places});
    }
  })
});


module.exports = router;
