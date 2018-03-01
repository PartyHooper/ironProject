const express = require('express');
const router  = express.Router();
const multer= require("multer")
const Place = require('../models/Place');
const User = require("../models/User");
const Review = require("../models/Review");
const passport      = require("passport");
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');

var upload = multer({ dest: './public/images/' });

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

router.post("/search", (req, res, next)=>{

  Place.findOne({name:req.body.place}, (err, place)=>{
    
    if (!place){
      res.redirect("/")
    } else {
      if (req.user){
        res.render('show', {place, logged: true, user: req.user});
      } else{
        res.render('show', {place, logged: false});
      }
    }
  })

})
router.get("/login", (req, res, next) => {
  if (req.user){
   res.redirect("/");
  } else {
    res.render("login", {logged: false})
  }
})

router.get('/user', (req, res, next) => {
  if (req.user){
    User.findOne({_id:req.user._id}, (err, user)=>{
      if (err){
        res.send(err)
      } else {
        res.render('user', {logged: true, user});
      }
    })
  } else{
        res.redirect("/")
  }
});


router.get('/:id', (req, res, next) => {
  Place.findOne({_id:req.params.id}, (err, place)=>{
    if (err){
      res.send(err)
    } else { 
      if (req.user){
        res.render('show', {place, logged: true, user: req.user});
      } else{
        res.render('show', {place, logged: false});
      }
    }
  })
});

router.post('/:id', upload.single('photo'), (req, res, next) => {
  const review = new Review({
    creatorId: req.user.provider_id,
    creatorPicPath: req.user.picPath,
    picPath: `/images/${req.file.filename}`,
    creatorName: req.user.provider_name,
    rating: req.body.rating,
    crowded: req.body.crowd,
    music: req.body.music
  });

  
  review.save((err) => {
    Place.findById(req.params.id, (error, place) => {
        if (error) {
            next(error);
        } else {
          let array=place.reviews
          array.push(review)
          place.reviews= array;
            place.save((error) => {
              if (error) {
                  next(error);
              } else {
                  res.redirect('/'+req.params.id);
              }
          })
        }
    })
  });
});

router.get("/:id/review", ensureLoggedIn(), (req, res, next)=>{
  Place.findOne({_id:req.params.id}, (err, place)=>{
    if (err){
      res.send(err)
    } else {
      if (err){
        res.send(err)
      } else { 
        if (req.user){
          res.render('review', {place, logged: true, user: req.user});
        } else{
          res.render('review', {place, logged: false});
        }
      }
    }
  })
})



module.exports = router;
