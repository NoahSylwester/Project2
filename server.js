require("dotenv").config();

const express = require("express");
const handlebars = require("express-handlebars");

const { sequelize } = require("./models");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.engine(
  "handlebars",
  handlebars({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

app.use("/api/cards/", require("./routes/cardAPIRoutes"));
app.use("/api/qrl-cards/", require("./routes/qrl-cardAPIRoutes"));
app.use("/api/players/", require("./routes/playerAPIRoutes"));
require("./routes/htmlRoutes")(app);

var syncOptions = { force: false };

if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

sequelize.sync(syncOptions).then(() => {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;
