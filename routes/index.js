var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');


router.get('/', function (req, res) {
    res.render('landing')
})

router.get('/register', function (req, res) {
    res.render('register');
})

router.post('/register', function (req, res) {
    var newUser = new User({ username: req.body.username });
    User.register(newUser, req.body.password, function (err, user) {
        if (err) {
            console.log(err);
            return res.render('render');
        } else {
            passport.authenticate('local')(req, res, function () {
                res.redirect('/campgrounds');
            });
        }
    });
    res.redirect
})

//login routes
router.get('/login', function (req, res) {
    res.render('login');
});

router.post('/login', passport.authenticate('local',
    {
        successRedirect: '/campgrounds',
        failureRedirect: '/login'
    }), function (req, res) {
});

//logout route
router.get('/logout', function(req,res){
    req.logOut();
    res.redirect('/campgrounds');
});

function isLoggedIn(req, res, next){
    if(req.user){
        return next();
    } else {
        res.redirect('/login');
    }
}

module.exports = router;