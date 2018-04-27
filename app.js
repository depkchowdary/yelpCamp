require("dotenv").config();

var express = require("express")
var app = express();
var bodyParser = require("body-parser");

var mongoose = require("mongoose")
var Campground = require("./models/campgrounds")
var Comment = require("./models/comments")
var seedDB = require("./seeds.js")
var passport = require("passport")
var LocalStrategy = require("passport-local")
var User = require("./models/user")
var flash = require("connect-flash")

var campgroundRoutes = require("./routes/campground")
var commentRoutes = require("./routes/comments")
var indexRoutes = require("./routes/index")
var methodOverride = require("method-override")



//seedDB();
mongoose.connect(process.env.DATABASEURL)
console.log(process.env.DATABASEURL)
//mongoose.connect("mongodb://produser:produser@dbclus-shard-00-00-9vyui.mongodb.net:27017,dbclus-shard-00-01-9vyui.mongodb.net:27017,dbclus-shard-00-02-9vyui.mongodb.net:27017/yelp_camp?ssl=true&replicaSet=dbclus-shard-0&authSource=admin")
app.use(flash());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"))

//Session config

app.use(require("express-session")({
    secret: "The text noone's ever gonna see",
    resave: false,
    saveUninitialized: false
}))


// Passport config
app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

// This function is run before every get,post route callback function
app.use(function(req, res, next) {
    res.locals.errorMessage = req.flash("error");
    res.locals.successMessage = req.flash("success");
    res.locals.currentUser = req.user;
    next();
})

app.use("/campgrounds/:id/comments", commentRoutes)
app.use("/campgrounds", campgroundRoutes)
app.use(indexRoutes)



//=======================>
//Server Listen
//=======================>
app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Yelp camp app has started");
});
