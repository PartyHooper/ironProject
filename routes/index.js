const express = require('express');
const router  = express.Router();
const multer= require("multer")
const Place = require('../models/Place');
const User = require("../models/User");
const Review = require("../models/Review");
const passport      = require("passport");
const dateFormat = require('dateformat');
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');

const upload = multer({ dest: './public/images/' });

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
      console.log(places)
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
});

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

});

router.get("/login", (req, res, next) => {
  if (req.user){
   res.redirect("/");
  } else {
    res.render("login", {logged: false})
  }
});

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
    music: req.body.music,
    date: new Date ()
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
        if (req.user){
          res.render('review', {place, logged: true, user: req.user});
        } else{
          res.render('review', {place, logged: false});
        }
      }
  })
});

router.get("/:id/update/:reviewid", ensureLoggedIn(),(req, res, next)=>{
  Place.findOne({_id:req.params.id}, (err, place)=>{
    if (err){
      res.send(err)
    } else {
        Review.findOne({_id:req.params.reviewid}, (error, review)=>{
          if (error){
            res.send(error)
          } else {
              if (req.user){
                res.render('update', {place, logged: true, user: req.user, review});
              } else {
                res.render('update', {place, logged: false, review});
              }
            }
        })
    }
  })
});

router.post("/:id/update/:reviewid", upload.single('photo'), (req, res, next) => {
  Review.findOne({_id:req.params.reviewid}, (error, review)=>{
    if (error){
      res.send(error)
    } else {
          review.picPath= `/images/${req.file.filename}`;
          review.rating= req.body.rating,
          review.crowded= req.body.crowd,
          review.music= req.body.music,
          review.date= new Date ()
          review.save((err) => {
            Place.findById(req.params.id, (error, place) => {
                if (error) {
                    next(error);
                } else {
                  let array=[] 
                  place.reviews.forEach(function(rev, index){
                    if (rev._id==req.params.reviewid){
                      array.push(review);
                    } else {
                      array.push(rev)
                    }
                  })
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
      }
  })
});

router.get("/:id/delete/:reviewid", upload.single('photo'), (req, res, next) => {
            Place.findById(req.params.id, (error, place) => {
                if (error) {
                    next(error);
                } else {
                  let array=[] 
                  place.reviews.forEach(function(rev, index){
                    if (rev._id!=req.params.reviewid){
                      array.push(rev)
                    }
                  })
                  place.reviews= array;
                  console.log(place)
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


module.exports = router;
