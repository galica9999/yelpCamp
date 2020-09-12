var express     = require('express'), 
    app         = express(),
    request     = require('request'), 
    bodyParser  = require("body-parser"),
    mongoose    = require('mongoose'),
    Campground = require("./models/campground"),
    seedDB = require('./seeds');

const { StringDecoder } = require('string_decoder');

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/yelpCamp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Connected to DB!'))
    .catch(error => console.log(error.message));

//seedDB();

//route setup
app.get('/', function (req, res) {
    res.render('landing')
})

app.get("/campgrounds", function (req, res) {
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else {
            res.render('campgrounds/index', { campgrounds: allCampgrounds });
        }
    })
})

app.post("/campgrounds", function (req, res) {
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var newCampground = {name:name, image:image, description:description}
    Campground.create(newCampground, function(err, result){
        if(err){
            console.log(err);
        } else {
            res.redirect('/campgrounds')
        }
    });
    
})

app.get('/campgrounds/new', function (req, res) {
    res.render('campgrounds/new')
});

app.get('/campgrounds/:id', function(req,res){
    Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
        if(err){
            console.log(err);
        } else {
            res.render('campgrounds/shows', {campground:foundCampground});
        }
    });
})

// ===================================
// ===================================
//comment routes
app.get('/campgrounds/:id/comments/new', function(req,res){
    res.render('comments/new');
})

app.listen(3000, 'localhost', function () {
    console.log('server has started');
});