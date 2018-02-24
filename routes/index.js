const express = require('express');
const router  = express.Router();
const Place = require('../models/Place');
const User = require("../models/User");

/* GET home page. */
router.get('/', (req, res, next) => {
  Place.find({}, (err, places)=>{
    if (err){
      res.send(err)
    } else {
      res.render('index', {places});
    }
  })
});

module.exports = router;
