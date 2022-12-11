const mongoose = require("mongoose");

// create types schema for the db
const TypesSchema = new mongoose.Schema({
name:{
type: String,
required : true,
unique: true,
}, 
 
},
{// time stamp to makr the created date
timestamp:true }

);
// export the user schema
module.exports = mongoose.model("Types", TypesSchema);