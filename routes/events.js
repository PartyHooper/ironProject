const express = require('express');
const router  = express.Router();
const multer= require("multer")
const Place = require('../models/Place');
const User = require("../models/User");
const Review = require("../models/Review");
const Event = require("../models/Event");
const passport      = require("passport");
const dateFormat = require('dateformat');
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');

const upload = multer({ dest: './public/images/' });

router.get('/index', (req, res, next) => {
    if (req.user){
      Event.find({}, (err, events)=>{
        if (err){
          res.send(err)
        } else {
          res.render('events/indexEvents', {events, logged: true, user: req.user, message: null});
        }
      })
    } else{
      Event.find({}, (err, events)=>{
        if (err){
          res.send(err)
        } else {
          res.render('events/indexEvents', {events, logged: false, message: null});
        }
      })
    }
});

router.get("/new", (req, res, next)=>{
    if (req.user){
            res.render('events/new', {logged: true, user: req.user});
      } else{
             res.render("login", {logged: false})
      }
})

router.post("/new", upload.single('photo'), (req, res, next)=>{
    Event.find({creatorId: req.user.provider_id}, (err, event)=>{
        if (event.length>0){
            res.render("events/indexEvents", {events, logged: true, user: req.user, message: "You already created an event tonight!"})
        } else {
            let location = {
                type: 'Point',
                coordinates: [req.body.longitude, req.body.latitude]
                };
            const event = new Event({
                creatorId: req.user.provider_id,
                creatorPicPath: req.user.picPath,
                picPath: `/images/${req.file.filename}`,
                creatorName: req.user.provider_name,
                name: req.body.name,
                max: req.body.people,
                contribution:req.body.contribution,
                startTime:req.body.startTime,
                endTime:req.body.endTime,
                location: location,
                description: req.body.description    
              });
              
               
              event.save((err) => {
                User.findById(req.user.id, (error, user) => {
                    if (error) {
                        next(error);
                    } else {
                      let array=user.events
                      array.push(event)
                      user.events= array;
                        user.save((error) => {
                          if (error) {
                              next(error);
                          } else {
                              res.redirect('/events/index');
                          }
                      })
                    }
                })
              });
        }
    })
})

router.get("/:id", ensureLoggedIn(), (req, res, next)=>{
    Event.findById(req.params.id, (err, event)=>{
        if (err){
            res.send(err)
          } else { 
            res.render("events/show", {logged:true, user: req.user, event, message: null})
          }
    })
})

router.post("/:id", upload.single('photo'), (req, res, next)=>{
    Event.findById(req.params.id, (err, event)=>{
        if (err){
            res.send(err)
          } else { 
              if (req.body.location){
                let location = {
                    type: 'Point',
                    coordinates: [req.body.longitude, req.body.latitude]
                    };
              }
              if (req.file){
                event.picPath= `/images/${req.file.filename}`
              }
              if (req.body.name){
                event.name= req.body.name
              }
              if (req.body.max){
                event.max= req.body.people
              }
              if (req.body.contribution){
                event.contribution=req.body.contribution
              }
              if (req.body.startTime){
                event.startTime= req.body.startTime
              }
              if (req.body.endTime){
                event.endTime= req.body.endTime
              }
              if (req.body.location){
                event.location= location
              }
              if (req.body.description){
                  console.log("update")
                event.description= req.body.description
              }
               console.log(event)
              event.save((err) => {
                User.findById(req.user.id, (error, user) => {
                    if (error) {
                        next(error);
                    } else {
                        let array=[] 
                        user.events.forEach(function(ev){
                          if (ev._id==req.params.id){
                            array.push(event);
                          } else {
                            array.push(ev)
                          }
                        })
                        user.events= array;
                        user.save((error) => {
                          if (error) {
                              next(error);
                          } else {
                              res.redirect('/events/'+req.params.id);
                          }
                      })
                    }
                })
              });
        }
    })
})

router.get("/:id/manage", ensureLoggedIn(), (req, res, next)=>{
    Event.findById(req.params.id, (err, event)=>{
        if (err){
            res.send(err)
          } else { 
              if (req.user.provider_id===event.creatorId){
                res.render("events/manage", {logged:true, user: req.user, event})
              } else{
                  res.redirect("/events/index")
              }
          }
    })
})

router.get("/:id/apply/:userid", ensureLoggedIn(), (req, res, next)=>{
    Event.findById(req.params.id, (err, event)=>{
        if (err){
            res.send(err);
          } else { 
              let exists=false;
              User.findById(req.params.userid, (error, user)=>{
                  event.applicants.forEach(function(applicant){
                      if (applicant.provider_id===user.provider_id){
                          exists=true;
                      }
                  })
                  if (!exists){
                    let array=event.applicants;
                    array.push(user);
                    event.applicants=array;
                    event.save((err2)=>{
                        if (err2){
                            res.send(err2)
                        } else{
                            res.redirect("/events/index")
                        }
                    });
                  } else {
                    res.render("events/show", {logged:true, user: req.user, event, message: "You already applied!"})
                  }
                
              })

          }
    })
})

router.post("/:id/accept", ensureLoggedIn(), (req, res, next)=>{
    Event.findById(req.params.id, (err, event)=>{
        if (err){
            res.send(err);
          } else { 
              User.findById(req.body.applicant, (error, user)=>{
                console.log(event)
                console.log(user);
                let array=event.applicants;
                array.splice(array.indexOf(user), 1)
                event.applicants=array;
                let guests=event.participants;
                console.log(user);
                guests.push(user);
                console.log(guests);
                event.participants=guests
                console.log(event)
                event.save((err2)=>{
                    if (err2){
                        res.send(err2)
                    } else{
                        res.redirect("/events/"+req.params.id+"/manage")
                    }
                });
              })

          }
    })
})

module.exports = router;
