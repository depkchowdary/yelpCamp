var express = require("express")
var router = express.Router({ mergeParams: true })
var Campground = require("../models/campgrounds")
var Comment = require("../models/comments")
var middlewareObj = require("../middleware/")

//new
router.get("/new", middlewareObj.isLoggedIn, function(req, res) {
    var id = req.params.id
    //get campground 
    Campground.findById(id, function(err, foundCampground) {
        if (err) {

        }
        else {
            res.render("comments/new", { campground: foundCampground })
        }
    })
})
//Create route
router.post("/", middlewareObj.isLoggedIn, function(req, res) {
    var id = req.params.id
    Campground.findById(id, function(err, foundCampground) {
        if (err) {
            res.redirect("/campgrounds");
        }
        else {
            Comment.create({ Comment: req.body.comment }, function(err, comment) {
                if (err) {
                    console.log(err)
                }
                else {
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save()
                    console.log(comment)
                    foundCampground.comments.push(comment)
                    foundCampground.save();
                    res.redirect("/campgrounds/" + foundCampground._id)
                }
            });
        }
    });
});

//edit route
router.get("/:comment_id/edit", middlewareObj.checkCommentOwnership, function(req, res) {
    var campgroundId = req.params.id
    var commentId = req.params.comment_id
    Campground.findById(campgroundId, function(err, foundCampground) {
        if (err || !foundCampground) {
            req.flash("error", "campground not found")
            res.redirect("back")
        }
        else {
            Comment.findById(commentId, function(err, foundComment) {
                if (err) {
                    res.redirect("back")
                }
                else {
                    res.render("comments/edit", { comment: foundComment, campgroundId: campgroundId });
                }
            });
        }
    })

});

//update route
router.put("/:comment_id", middlewareObj.checkCommentOwnership, function(req, res) {
    var campgroundId = req.params.id
    var commentId = req.params.comment_id
    Comment.findByIdAndUpdate(commentId, { Comment: req.body.comment }, function(err, updatedComment) {
        if (err) {
            res.redirect("back")
            console.log("Error occured when updating comment:" + commentId + " for campground" + campgroundId);
        }
        else {
            res.redirect("/campgrounds/" + campgroundId);
        }
    });
});
//destroy route

router.delete("/:comment_id", middlewareObj.checkCommentOwnership, function(req, res) {

    var id = req.params.id
    var commentId = req.params.comment_id

    Comment.findByIdAndRemove(commentId, function(err) {
        if (err) {
            console.log("error in deleting comment" + commentId)
            res.redirect("back")
        }
        else {
            res.redirect("/campgrounds/" + id);
        }
    });
})

module.exports = router
