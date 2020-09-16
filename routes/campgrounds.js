var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");

router.get("/", function (req, res) {
  Campground.find({}, function (err, allCampgrounds) {
    if (err) {
      console.log(err);
    } else {
      res.render("campgrounds/index", { campgrounds: allCampgrounds });
    }
  });
});

router.post("/", isLoggedIn, function (req, res) {
  var name = req.body.name;
  var image = req.body.image;
  var description = req.body.description;
  var author = {
    id: req.user._id,
    username: req.user.username,
  };
  var newCampground = {
    name: name,
    image: image,
    description: description,
    author: author,
  };
  Campground.create(newCampground, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
      res.redirect("/campgrounds");
    }
  });
});

router.get("/new", isLoggedIn, function (req, res) {
  res.render("campgrounds/new");
});

router.get("/:id", function (req, res) {
  Campground.findById(req.params.id)
    .populate("comments")
    .exec(function (err, foundCampground) {
      if (err) {
        console.log(err);
      } else {
        res.render("campgrounds/shows", { campground: foundCampground });
      }
    });
});

//edit route
router.get("/:id/edit", checkCampgroundOwernership,function (req, res) {
    Campground.findById(req.params.id, function (err, foundCampground) {
      if (err) {
        res.redirect("back");
        console.log(err);
      } else {
            res.render("campgrounds/edit", { campground: foundCampground });
        }
      });
});

//update route
router.put("/:id", checkCampgroundOwernership, function (req, res) {
  Campground.findByIdAndUpdate(req.params.id, req.body.campground, function (
    err,
    updatedCampground
  ) {
    if (err) {
      res.redirect("/campgrounds");
    } else {
      res.redirect("/campgrounds/" + req.params.id);
    }
  });
});

//destroy campground route
router.delete("/:id", checkCampgroundOwernership, function (req, res) {
  Campground.findByIdAndDelete(req.params.id, function (err) {
    if (err) {
      res.redirect("/campgrounds");
    } else {
      res.redirect("/campgrounds");
    }
  });
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect("/login");
  }
}

function checkCampgroundOwernership(req,res,next) {
    if (req.isAuthenticated()) {
        Campground.findById(req.params.id, function (err, foundCampground) {
          if (err) {
            res.redirect("back");
          } else {
            if(foundCampground.author.id.equals(req.user._id)){
                next();
            }
            else{
                res.redirect('back');
            }
          }
        });
      } else {
        res.redirect('back');
      }
  }

module.exports = router;
