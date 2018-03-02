const express      = require('express');
const path         = require('path');
const favicon      = require('serve-favicon');
const logger       = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser   = require('body-parser');
const layouts      = require('express-ejs-layouts');
const mongoose     = require('mongoose');
const session       = require("express-session");
const bcrypt        = require("bcrypt");
const passport      = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const FbStrategy = require('passport-facebook').Strategy;
const InstagramStrategy = require('passport-instagram').Strategy;
const flash = require("connect-flash");
const User = require("./models/User");


mongoose.connect('mongodb://fixter:fixter@ds129146.mlab.com:29146/togomx');

const app = express();

//enable sessions here

app.use(session({
  secret: "bliss",
  resave: true,
  saveUninitializer: true
}));

//initialize passport and session here

passport.serializeUser((user,cb)=>{
  cb(null, user._id);
});

passport.deserializeUser((id, cb)=>{
  User.findOne({"_id":id}, (err,user)=>{
    if(err) return cb(err);
    cb(null, user);
  })
});

app.use(flash());

passport.use(new LocalStrategy({passReqToCallback:true},(req, username, password, next)=>{
  User.findOne({username}, (err, user)=>{
    if(err) return next(err);
    if(!user) return next(null, false, {message: "Incorrect username"});
    if(!bcrypt.compareSync(password, user.password)) return next(null, false, {message: "Incorrect password"});
    return next(null, user);
  });
}));

passport.use(new FbStrategy({
  clientID: "2004252213161127",
  clientSecret: "23a2542f53ab00aa94291833e6c48ebd",
  callbackURL: "/auth/facebook/callback",
  profileFields: ['id', 'displayName', 'picture', 'friends']
}, (accessToken, refreshToken, profile, done) => {
  User.findOne({ provider_id: profile.id }, (err, user) => {
    if (err) {
      return done(err);
    }
    if (user) {
      let friendsArray = [];
      profile._json.friends.data.forEach(function(friend){
        friendsArray.push(friend.id)
      })
      user.provider_name= profile.displayName;
      user.picPath= profile.photos[0].value;
      user.friends = friendsArray;
      user.save((err) => {
        if (err) {
          return done(err);
        }
        return done(null, user);
      });
    } else {
      console.log(profile._json.friends.data)
      let friendsArray = [];
      profile._json.friends.data.forEach(function(friend){
        friendsArray.push(friend.id)
      })
      const newUser = new User({
        provider_id: profile.id,
        provider_name: profile.displayName,
        picPath: profile.photos[0].value,
        friends: friendsArray,
      });
  
      newUser.save((err) => {
        if (err) {
          return done(err);
        }
        done(null, newUser);
      });
    }
    
  });

}));

passport.use(new InstagramStrategy({
  clientID: "2240897fb92c4e6cad10c790501ddf01",
  clientSecret: "3d2fb4fbda8248ffa4abbf6afb06d0fa",
  callbackURL: "/auth/instagram/callback"
},
function(accessToken, refreshToken, profile, done) {
  User.findOne({ provider_id: profile.id }, function (err, user) {
    if (err) {
      return done(err);
    }
    if (user) {
      user.provider_name= profile.displayName,
      user.picPath= profile._json.data.profile_picture
      user.save((err) => {
        if (err) {
          return done(err);
        }
        return done(null, user);
     });
    } else {
      console.log(profile)
      const newUser = new User({
        provider_id: profile.id,
        provider_name: profile.displayName,
        picPath: profile._json.data.profile_picture
      });
  
      newUser.save((err) => {
        if (err) {
          return done(err);
        }
        done(null, newUser);
      });
    }
  });
}
));

app.use(passport.initialize());
app.use(passport.session());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// default value for title local
app.locals.title = 'Express - Generated with IronGenerator';

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(layouts);

const index = require('./routes/index');
app.use('/', index);
app.get("/auth/facebook", passport.authenticate("facebook", { scope: ['user_friends'] }));
app.get("/auth/facebook/callback", passport.authenticate("facebook", {
  successRedirect: "/",
  failureRedirect: "/"
}));
app.get('/auth/instagram',
  passport.authenticate('instagram'));

app.get('/auth/instagram/callback', 
  passport.authenticate('instagram', { failureRedirect: '/' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
