const router = require("express").Router();
const Types = require("../models/Types");
const Type = require("../models/Types");

// create 

router.post("/", async(req, res)=>{
    const newType = new Type (req.body);
    try{
      const savedType = await newType.save();
      res.status(200).json(savedType);
    }
    catch(err){
     res.status(500).json(err);
    }
  
});
// find all types of ads 
router.get("/", async(req, res)=>{
     try{
      const types = await Types.find();
      res.status(200).json(types);
    }
    catch(err){
     res.status(500).json(err);
    }
  
});

module.exports = router;