var mongoose    = require('mongoose'),
    Campground = require("./models/campground"),
    Comment = require('./models/comment');


var data = [
    {
        name:"Clouds Rest", 
        image:"https://images.unsplash.com/photo-1476041800959-2f6bb412c8ce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        description: "asdf asdf asdf asd frg treb asef wrthga v wer"
    },
    {
        name:"Fancy Camp", 
        image:"https://images.unsplash.com/photo-1477581265664-b1e27c6731a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        description: "asdf asdf asdf asd frg treb asef wrthga v wea sdfgsadfggdhmjtryuerg u6e rywrt ywreywer y"
    },
    {
        name:"Desert Messa", 
        image:"https://images.unsplash.com/photo-1499363536502-87642509e31b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        description: "asdf asdf asdf asd frg treb asef wrthga v wer sdgfadfasd  asdfadg agasd gasdf"
    }
]

function seedDB(){
    //remove all campgrounds
    Campground.remove({}, function(err){
        if(err){
            console.log(err);
        } else {
            console.log('removed campgrounds');
            //add new campgrounds
            data.forEach(function(seed){
                Campground.create(seed, function(err, data){
                    if(err){
                        console.log(err);
                    } else {
                        console.log('added a campground');
                        Comment.create({
                            text:'this place is nice',
                            author:'Homer'
                        }, function(err,comment){
                            if(err){
                                console.log(err);
                            } else {
                                campground.comments.push(comment);
                                campground.save();
                                console.log('created new comment')
                            }
                        })
                    }
                });
            });
        }
    });
    
    
    // add comments
}

module.exports = seedDB;