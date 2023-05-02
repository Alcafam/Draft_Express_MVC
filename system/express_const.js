/* express */
const express = require("express");
const session = require("express-session");
const app = express();

/* path, body-parser, ejs */
const path = require("path");
const bodyParser = require("body-parser");

app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true }));

/* serving static files */
app.use(express.static(path.join(__dirname, "../assets")));

/* session */
app.use(session({ 
    secret: 'keyboardkitteh',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}));

/* calls the Route */
const route = require('../config/routes.js');
app.use(route);

module.exports = {
    app:app,
    profiler: profiler
};