var express     = require('express'), 
    app         = express(),
    request     = require('request'), 
    bodyParser  = require("body-parser"),
    mongoose    = require('mongoose'),
    Campground = require("./models/campground"),
    seedDB = require('./seeds'),
    Comment = require('./models/comment'),
    passport = require('passport'),
    LocalStrategy = require('passport-local'),
    User = require('./models/user');

const { StringDecoder } = require('string_decoder');

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname+'/public'));

mongoose.connect('mongodb://localhost:27017/yelpCamp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Connected to DB!'))
    .catch(error => console.log(error.message));

//seedDB();

// PASSPORT CONFIG
app.use(require('express-session')({
    secret: "this is the secret of yelpCamp",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


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
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        } else {
            res.render('comments/new', {campground:campground});
        }
    });
});

app.post('/campgrounds/:id/comments', function(req,res){
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                } else {
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect('/campgrounds/' + campground._id);
                }
            });
        }
    });
});

// AUTH routes
app.get('/register', function(req, res){
    res.render('register');
})

app.post('/register', function(req,res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render('render');
        } else {
            passport.authenticate('local')(req,res, function(){
                res.redirect('/campgrounds');
            });
        }
    });
    res.redirect
})

//login routes
app.get('/login', function(req,res){
    res.render('login');
});









app.listen(3000, 'localhost', function () {
    console.log('server has started');
});