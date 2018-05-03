var express = require("express")
var router = express.Router()
var User = require("../models/user")
var passport = require("passport")

router.get("/register", function(req, res) {
    res.render("register", { page: "register" })
})
router.post("/register", function(req, res) {
    console.log(req.body)
    User.register(new User({ username: req.body.username }), req.body.password, function(err, user) {

        if (err) {
            req.flash("error", err.message)
            return res.redirect("/register");
        }
        passport.authenticate("local")(req, res, function() {
            req.flash("success", "Hello! Welcome to yelpCamp, " + user.username)
            res.redirect("/campgrounds");
        });
    })
});

router.get("/register/admin", function(req, res) {
    res.render("AdminRegister", { page: "register" })
})

router.post("/register/admin", function(req, res) {
    if (req.body.secretHash === "dummyHash") {
        User.register(new User({ username: req.body.username, isAdmin: true }), req.body.password, function(err, user) {
            if (err) {
                req.flash("error", err.message)
                return res.redirect("back");
            }
            passport.authenticate("local")(req, res, function() {
                req.flash("success", "Hello! You are admin, " + user.username)
                res.redirect("/campgrounds");
            });
        })
    }
    else {
        req.flash("error", "Something wrong with Admin Code! Please check with owner")
        res.redirect("back")
    }

});


router.get("/login", function(req, res) {
    res.render("login", { page: "login" })
})

router.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}), function(req, res) {
    console.log("logged in")
});

router.get("/logout", function(req, res) {

    req.logout();
    req.flash("success", "You are logged out sucessfully!")
    res.redirect("/campgrounds");
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login")
}
router.get("/", function(req, res) {
    res.render("landingpage")
});

module.exports = router
