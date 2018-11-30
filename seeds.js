const mongoose = require("mongoose");
let Campground = require("./models/campground");
let Comment    = require("./models/comment"); 

var data = [
    {
        name: "Cloud's Rest",
        image: "https://images.unsplash.com/photo-1526491109672-74740652b963?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=343c64df1b43f50769656d03c2b9f523&auto=format&fit=crop&w=500&q=60",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta illum ratione quibusdam! Facere quisquam fugit dolorum atque officia, praesentium repellendus nisi sint labore laboriosam, possimus illum vel hic eum ipsum?Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta illum ratione quibusdam! Facere quisquam fugit dolorum atque officia, praesentium repellendus nisi sint labore laboriosam, possimus illum vel hic eum ipsum?"
},
{
    name: "Canvan Floor",
    image: "https://images.unsplash.com/photo-1519395612667-3b754d7b9086?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=2408b72d00a5efaf0f2e14d02f144790&auto=format&fit=crop&w=500&q=60",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta illum ratione quibusdam! Facere quisquam fugit dolorum atque officia, praesentium repellendus nisi sint labore laboriosam, possimus illum vel hic eum ipsum?Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta illum ratione quibusdam! Facere quisquam fugit dolorum atque officia, praesentium repellendus nisi sint labore laboriosam, possimus illum vel hic eum ipsum?"
},
{
    name: "Desert Mesa",
    image: "https://images.unsplash.com/photo-1496080174650-637e3f22fa03?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=b7ca353cfcc4299e6c3d431ff862e1cf&auto=format&fit=crop&w=500&q=60",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta illum ratione quibusdam! Facere quisquam fugit dolorum atque officia, praesentium repellendus nisi sint labore laboriosam, possimus illum vel hic eum ipsum?Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta illum ratione quibusdam! Facere quisquam fugit dolorum atque officia, praesentium repellendus nisi sint labore laboriosam, possimus illum vel hic eum ipsum?"
}
]

function seedDB(){
    // Remove all Campgrounds
    Campground.deleteMany({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed campgrounds!");
         // add a few campgrounds
        data.forEach(function(seed){
            Campground.create(seed, function(err, campground){
                if(err){
                    console.log(err);
                } else{
                    console.log("Added a Campground");
                    // create a comment
                    Comment.create(
                        {
                            text: "This place is great but i wish there is internet",
                            author: "Homer"
                        }, function(err, comment){
                            if(err){
                                console.log(err)
                            } else {
                                campground.comments.push(comment);
                                campground.save();
                                console.log("Created new comment");
                            }
                        });
                    }
                });
            });
        });  
    // add a few comments
}

module.exports = seedDB;