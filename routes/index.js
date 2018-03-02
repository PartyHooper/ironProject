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
        res.render('show', {place, logged: true, user: req.user, message: null});
      } else{
        res.render('show', {place, logged: false, message: null});
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
    Review.find({creatorId:req.user.provider_id}, (err, reviews)=>{
      if (err){
        res.send(err)
      } else {
        Place.find({}, (err, places)=>{
          res.render('user', {logged: true, user: req.user, reviews, places});
        })
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
        res.render('show', {place, logged: true, user: req.user, message: null});
      } else{
        res.render('show', {place, logged: false, message: null});
      }
    }
  })
});

router.post('/:id', upload.single('photo'), (req, res, next) => {
  Review.find({creatorId: req.user.provider_id}, (error, reviews)=>{
    if (reviews.length>0){
      Place.findOne({_id:req.params.id}, (err, place)=>{
        if (err){
          res.send(err)
        } else { 
          if (req.user){
            res.render('show', {place, logged: true, user: req.user, message:"You already have a review! Just update it!"});
          } else{
            res.render('show', {place, logged: false, message: null});
          }
        }
      })
    } else {
      const review = new Review({
        creatorId: req.user.provider_id,
        creatorPicPath: req.user.picPath,
        picPath: `/images/${req.file.filename}`,
        creatorName: req.user.provider_name,
        rating: req.body.rating,
        crowded: req.body.crowd,
        music: req.body.music,
        placeId: req.params.id,
        placeName: req.body.place
      });
      console.log(review)
       
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
    }
  })
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
          review.music= req.body.music
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
                  place.save((error) => {
                      if (error) {
                          next(error);
                      } else {
                        Review.remove({_id:req.params.reviewid}, (err, review)=>{
                          res.redirect('/'+req.params.id);
                        })
                      }
                  })
                }
            })
});


module.exports = router;
