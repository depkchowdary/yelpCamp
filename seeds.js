var mongoose = require("mongoose")
var Campground = require("./models/campgrounds")
var Comment = require("./models/comments")


var data = [{
        name: "Pacifica",
        image: "https://images.pexels.com/photos/6757/feet-morning-adventure-camping.jpg?cs=srgb&dl=adventure-camping-feet-6757.jpg&fm=jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    {
        name: "Risa",
        image: "https://images.pexels.com/photos/618848/pexels-photo-618848.jpeg?cs=srgb&dl=adventure-alps-camp-618848.jpg&fm=jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    {
        name: "Cloud 9",
        image: "https://images.pexels.com/photos/558454/pexels-photo-558454.jpeg?cs=srgb&dl=camping-environment-feet-558454.jpg&fm=jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    }


]



function seedDB() {
    Campground.remove({}, function(err) {
        if (err) {
            console.log("Error removing campgrounds")
        }
        else {
            console.log("Campgrounds removed");
            data.forEach(function(seed) {
                Campground.create(seed, function(err, campground) {
                    if (err) {
                        console.log("Error creating campground")
                    }
                    else {
                        console.log("campground created");
                    }
                })
            })
        }
    })
}


module.exports = seedDB;
