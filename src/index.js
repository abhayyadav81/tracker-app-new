require("./models/User");
require("./models/Track");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const trackRoutes = require("./routes/trackRoutes");
const requireAuth = require("./middlewares/requireAuth");

const app = express();

app.use(bodyParser.json());
app.use(authRoutes);
app.use(trackRoutes);

const mongoUri = "mongodb://abhayyadav:68700687@cluster0-shard-00-00.xewp9.mongodb.net:27017,cluster0-shard-00-01.xewp9.mongodb.net:27017,cluster0-shard-00-02.xewp9.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-481tvg-shard-0&authSource=admin&retryWrites=true&w=majority";

// if (!mongoUri) {
//   throw new Error(
//     `MongoURI was not supplied.  Make sure you watch the video on setting up Mongo DB!`
//   );
// }
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on("connected", () => {
  console.log("Connected to mongo instance");
});
mongoose.connection.on("error", (err) => {
  console.error("Error connecting to mongo", err);
});

app.get("/", requireAuth, (req, res) => {
  res.send(`Your email: ${req.user.email}`);
});

let port = process.env.PORT || 3001
app.listen(port, () => {
  console.log("Listening on port "+ port);
});
