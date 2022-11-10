const express = require("express");
const bodyParser = require("body-parser");
var multer = require("multer");
const mongoose = require('mongoose');

let Candidates = require("./models/Candidates");
let CVs = require("./models/CVs");


//initial app
const app = express();
const PORT = 8000;

// use cors
var cors = require("cors");
app.use(cors());

// inside public directory.
app.use("/images", express.static("images"));
// use body-parser middleware
app.use(bodyParser.json());

//database=============================================================
const uri = "mongodb://localhost:27017/jobPortalForm";
mongoose.connect(uri);
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});
//database=============================================================

app.get("/", async (req, res) => {
  Candidates.find()
    .then((Candidates) => res.json(Candidates))
    .catch((err) => res.status(400).json("Error: " + err));
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post("/postData", upload.array("files"), async function (req, res) {
  const data = JSON.parse(req.body.data);

  const postCandidates = new Candidates(data);
  await postCandidates
    .save()
    .then(() => res.json({ msg: true, data: postCandidates }))
    .catch((err) => res.status(400).json("Error: " + err));
});

app.get("/delete", async function (req, res) {

 Candidates.deleteMany();
  
  res.json({ msg: true, data:"deleted" })
});


app.get("/cv", async (req, res) => {
  CVs.find()
    .then((CVs) => res.json(CVs))
    .catch((err) => res.status(400).json("Error: " + err));
});
app.post("/cv", upload.single("file"), async function (req, res) {
  const data = JSON.parse(req.body.data);

  const postCV = new CVs(data);
  await postCV
    .save()
    .then(() => res.json({ msg: true, data: postCV }))
    .catch((err) => res.status(400).json("Error: " + err));
});
// set port, listen for requests
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}/`);
});
