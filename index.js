const express = require ("express");
const app = express ();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/authanticate");
const userRoute = require("./routes/users");
const adsRoute = require("./routes/ads");
const typeRoute = require("./routes/types");
const multer = require("multer");
const path = require("path");

dotenv.config();
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "/images")));

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    //useFindAndModify:true

  })
  .then(console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "images");
    },
    filename: (req, file, cb) => {
      cb(null, req.body.name);
    },
  });
  
const upload = multer({ storage: storage });
app.post("/server/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});
 
app.use("/server/authanticate",authRoute);
app.use("/server/users", userRoute);
app.use("/server/ads", adsRoute);
app.use("/server/types", typeRoute);
app.use(express.static("public"));

// server production 
/*if(process.env.NODE_ENV === "production"){
  app.use(express.static(path.join("client/build")));
  app.get("*", (req, res) => {res.sendFile(path.resolve(__dirname,'client', 'build', 'index.html'))
});
}*/



app.listen ( process.env.PORT || 5000,
  () => console.log("Server is running now")
);

 