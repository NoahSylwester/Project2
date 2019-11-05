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

app.use("/api/cards/", require("./routes/api/cardRoutes"));
app.use("/api/qrl-cards/", require("./routes/api/qrl-cardRoutes"));
app.use("/api/players/", require("./routes/api/playerRoutes"));
app.use("/api/decks/", require("./routes/api/deckRoutes"));

app.use("/", require("./routes/htmlRoutes"));

var syncOptions = { force: false };

if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

sequelize.sync(syncOptions).then(() => {
  require("./bin/socketServer.js")(app, port);
});

module.exports = app;
