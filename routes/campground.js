const express    = require("express"),
      router     = express.Router(),
      Campground = require("../models/campground"),
      middleware = require("../middleware");



// INDEX -- Show all campgrounds
router.get("/", function(req, res){
    // Get all Campgrounds from the DB
    Campground.find({}, function(err, allCampgrounds) {
        if (err){
            console.log(err);
        } else {
            res.render("campgrounds/index",{campgrounds: allCampgrounds});      
        }
    })
});

// CREATE -- add new Campgrounds to DB
router.post("/", middleware.isLoggedIn, function(req, res){
    // get data from form and add to campground array
    let name = req.body.name;
    let price = req.body.price;
    let image = req.body.image;
    let desc = req.body.description;
    let author = {
        id: req.user._id,
        username: req.user.username
    }
    let newCampground = {name: name, price: price, image: image, description: desc, author: author}
    // Create a new campground and save to DB
    Campground.create(newCampground, function(err, newlyCreated){
        if (err){
            console.log(err);
        } else {
            // redirect back to campgrounds page
            console.log(newlyCreated);
            res.redirect("/campgrounds");            
        }
    })
});

//  NEW -- Show form to create new Campground
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("campgrounds/new")
});

// SHOW  - shows more info about one campground
router.get("/:id", function(req, res){
    // find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            console.log(foundCampground);
            // render show template with that compground
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });   
});

// EDIT CAMPGROUND ROUTE
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
      Campground.findById(req.params.id, function(err, foundCampground){
         res.render("campgrounds/edit", {campground: foundCampground}); 
    });
});

// UPDATE CAMPGROUND ROUTE
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
    // find and update the correct campground
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
        if(err){
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
    // redirect somewhere (show page)
});

// DESTROY CAMPGROUND ROUTE
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds");
        }
    });
});


module.exports = router;