var express     = require('express'), 
    app         = express(),
    request     = require('request'), 
    bodyParser  = require("body-parser"),
    mongoose    = require('mongoose');

const { StringDecoder } = require('string_decoder');

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/yelpCamp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Connected to DB!'))
    .catch(error => console.log(error.message));

// schema setup

var campgroundSchema = new mongoose.Schema({
    name:String,
    image:String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create({name: 'Granite Hill', image: "https://images.unsplash.com/photo-1487750404521-0bc4682c48c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80" }, function(err, campground){
//     if(err){
//         console.log(err)
//     } else{
//         console.log(campground);
//     }
// })

app.get('/', function (req, res) {
    res.render('landing')
})

app.get("/campgrounds", function (req, res) {
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else {
            res.render('campgrounds', { campgrounds: allCampgrounds });
        }
    })
})

app.post("/campgrounds", function (req, res) {
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name:name, image:image}
    Campground.create(newCampground, function(err, result){
        if(err){
            console.log(err);
        } else {
            console.log(result);
            res.redirect('campgrounds')
        }
    });
    
})

app.get('/campgrounds/new', function (req, res) {
    res.render('new')
})

app.listen(3000, 'localhost', function () {
    console.log('server has started');
});