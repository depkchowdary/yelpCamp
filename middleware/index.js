var Comment = require("../models/comments")
var Campground = require("../models/campgrounds")

var middlewareObj = {}

middlewareObj.isLoggedIn = function(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash("error", "Please login first!")
    res.redirect("/login")
}


middlewareObj.checkCampgroundOwnerShip = function(req, res, next) {
    var id = req.params.id
    //if user is logged n 
    if (req.isAuthenticated()) {
        Campground.findById(id, function(err, foundCampground) {
            if (err || !foundCampground) {
                req.flash("error", "campground not found")
                res.redirect("back")
            }
            else {
                if (foundCampground.author.id.equals(req.user._id)) {
                    next();
                }
                else {
                    req.flash("error", "you are not authorized to do that!")
                    res.redirect("back")
                }
            }
        })
    }
    else {
        req.flash("error", "Please login to do that")
        res.redirect("/login")
    }
}

middlewareObj.checkCommentOwnership = function(req, res, next) {
    var id = req.params.id;
    var comment_id = req.params.comment_id
    //if user is logged n 
    if (req.isAuthenticated()) {
        Comment.findById(comment_id, function(err, foundComment) {
            if (err || !foundComment) {
                req.flash("error", "comment not found")
                res.redirect("back")
            }
            else {
                if (foundComment.author.id.equals(req.user._id)) {
                    next();
                }
                else {
                    req.flash("error", "You are not authorized to do that")
                    res.redirect("back");
                }
            }
        })
    }
    else {
        req.flash("error", "you need to login to do that.")
        res.redirect("/login")
    }
}


module.exports = middlewareObj
