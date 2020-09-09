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




var campgrounds = [
    { name: 'Salmon Creek', image: "https://images.unsplash.com/photo-1476041800959-2f6bb412c8ce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80" },
    { name: 'Granite Hill', image: "https://images.unsplash.com/photo-1487750404521-0bc4682c48c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80" },
    { name: 'Salmon Creek', image: "https://images.unsplash.com/photo-1476041800959-2f6bb412c8ce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80" },
    { name: 'Granite Hill', image: "https://images.unsplash.com/photo-1487750404521-0bc4682c48c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80" },
    { name: 'Salmon Creek', image: "https://images.unsplash.com/photo-1476041800959-2f6bb412c8ce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80" },
    { name: 'Granite Hill', image: "https://images.unsplash.com/photo-1487750404521-0bc4682c48c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80" },
    { name: 'Salmon Creek', image: "https://images.unsplash.com/photo-1476041800959-2f6bb412c8ce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80" },
    { name: 'Granite Hill', image: "https://images.unsplash.com/photo-1487750404521-0bc4682c48c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80" },
    { name: 'Salmon Creek', image: "https://images.unsplash.com/photo-1476041800959-2f6bb412c8ce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80" },
    { name: 'Granite Hill', image: "https://images.unsplash.com/photo-1487750404521-0bc4682c48c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80" },
    { name: 'Salmon Creek', image: "https://images.unsplash.com/photo-1476041800959-2f6bb412c8ce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80" },
    { name: 'Granite Hill', image: "https://images.unsplash.com/photo-1487750404521-0bc4682c48c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80" },
    { name: 'Mine', image: "https://images.unsplash.com/photo-1490452322586-70484206da38?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80" }
]

app.get('/', function (req, res) {
    res.render('landing')
})

app.get("/campgrounds", function (req, res) {
    res.render('campgrounds', { campgrounds: campgrounds });
})

app.post("/campgrounds", function (req, res) {
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name:name, image:image}
    campgrounds.push(newCampground)
    res.redirect('campgrounds')
})

app.get('/campgrounds/new', function (req, res) {
    res.render('new')
})

app.listen(3000, 'localhost', function () {
    console.log('server has started');
});