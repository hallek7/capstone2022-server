const router =  require("express").Router();
const Ads = require("../models/Ads");

// create ad 
router.post("/", async (req, res) => {
    const newPost = new Ads(req.body);
    try {
      const savedPost = await newPost.save();
      res.status(200).json(savedPost);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  // update ad 
router.put("/:id", async (req, res) => {
    try {
      const post = await Ads.findById(req.params.id);
      if (post.username === req.body.username) {
        try {
          const updatedPost = await Ads.findByIdAndUpdate(
            req.params.id,
            {
              $set: req.body,
            },
            { new: true }
          );
          res.status(200).json(updatedPost);
        } catch (err) {
          res.status(500).json(err);
        }
      } else {
        res.status(401).json("You can update only your post!");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });

// delete ads
router.delete("/:id", async (req, res) => {
    try {
      const post = await Ads.findById(req.params.id);
      if (post.username === req.body.username) {
        try {
          await post.delete();
          res.status(200).json("Post has been deleted...");
        } catch (err) {
          res.status(500).json(err);
        }
      } else {
        res.status(401).json("You can delete only your post!");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  // get a single ad if exists of thorw 
router.get("/:id", async (req, res) => {
    try {
      const post = await Ads.findById(req.params.id);
      res.status(200).json(post);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  //GET ALL POSTS for the main/home page
router.get("/", async (req, res) => {
    const username = req.query.user;
    const catName = req.query.cat;
    try {
      let ads;
      if (username) {
        ads = await Ads.find({ username });

      } else if (catName) {
        ads = await Ads.find({
          categories: {
            $in: [catName],
          },
        });
      } else {
        ads = await Ads.find();
      }
      res.status(200).json(ads);
    } catch (err) {
      res.status(500).json(err);
    }
  });


module.exports = router;