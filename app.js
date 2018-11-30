const express       = require("express"),
      app           = express(),
      bodyParser    = require("body-parser"),
      mongoose      = require("mongoose"),
      flash         = require("connect-flash"),
      passport      = require("passport"),
      LocalStrategy = require("passport-local"),
      methodOveride = require("method-override"),
      Campground    = require("./models/campground"),
      Comment       = require("./models/comment"),
      User          = require("./models/user"),
      seedDB        = require("./seeds");

// requiring routes
let commentRoutes      = require("./routes/comments"),
    campgroundRoutes   = require("./routes/campground"),
    indexRoutes        = require("./routes/index");

// mongoose.connect("mongodb://localhost/YelpCampV12", { useNewUrlParser: true });

mongoose.connect("mongodb://dewaleolaoye:#Bolatito92@ds117111.mlab.com:17111/yelpcampwale", { useNewUrlParser: true });

// app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
// this is how to declare it locally, I need to change it to Bootstrap 4
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOveride("_method"));
app.use(flash());
//var publicDir = require('path').join(__dirname,'/public'); to access image locally

// seedDB(); // seed the database

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Once again Rusty wins the best dog",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);


app.listen(3000, function(){
    console.log("YelpCamp server runing");
});