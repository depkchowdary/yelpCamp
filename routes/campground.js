var express = require("express")
var router = express.Router()
var Campground = require("../models/campgrounds")
var middlewareObj = require("../middleware/")

router.get("/", function(req, res) {
    Campground.find({}, function(err, dbcampgrounds) {
        if (err) {
            console.log(err)
        }
        else {
            res.render("campgrounds/index", { campgrounds: dbcampgrounds, page: 'campgrounds' });
        }
    });
});

router.post("/", middlewareObj.isLoggedIn, function(req, res) {
    var campName = req.body.name;
    var imageURL = req.body.image;
    var price = req.body.price;
    var description = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }

    Campground.create({ name: campName, price: price, image: imageURL, description: description, author: author }, function(err, createdCampground) {
        if (err) {
            console.error(err)
        }
        else {
            console.log(createdCampground)
            res.redirect("/campgrounds")
        }
    });

});
router.get("/new", middlewareObj.isLoggedIn, function(req, res) {
    res.render("campgrounds/new");
});

router.get("/:id", function(req, res) {
    var imageId = req.params.id
    Campground.findById(imageId).populate("comments").exec(function(err, foundCampground) {
        if (err) {
            console.err(err)
        }
        else {
            res.render("campgrounds/show", { campground: foundCampground })
        }
    });
});

//Campground edit route
router.get("/:id/edit", middlewareObj.checkCampgroundOwnerShip, function(req, res) {
    var id = req.params.id
    Campground.findById(id, function(err, foundCampground) {
        res.render("campgrounds/edit", { campground: foundCampground })
    });
});

//Campground update route
router.put("/:id", middlewareObj.checkCampgroundOwnerShip, function(req, res) {
    var id = req.params.id;
    Campground.findByIdAndUpdate(id, req.body.campground, function(err, foundCampground) {
        if (err) {
            console.log("error updating campground with ID" + id);
        }
        else {
            res.redirect("/campgrounds/" + foundCampground._id);
        }
    });
});

//Campground Destroy route
router.delete("/:id", middlewareObj.checkCampgroundOwnerShip, function(req, res) {
    var id = req.params.id;
    Campground.findByIdAndRemove(id, function(err) {
        if (err) {
            console.log("Cannot destory the campground with ID:" + id)
        }
        res.redirect("/campgrounds");
    })
});


module.exports = router
