var express = require("express");
var cors = require("cors");
var multer = require("multer");
require("dotenv").config();

var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/public", express.static(process.cwd() + "/public"));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

app.post("/api/fileanalyse", function (req, res) {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  });
  const upload = multer({ storage: storage }).single("upfile");

  upload(req, res, function (err) {
    if (err) {
      console.log(err);
    } else {
      res.json({
        name: req.file.originalname,
        type: req.file.mimetype,
        size: req.file.size,
      });
    }
  });
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Your app is listening on port " + port);
});
