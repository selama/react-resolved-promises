"use strict";

var express = require('express');

var session = require('express-session');

var renderVM = require('./vm');

var app = express(); // Register an express middleware. Learn more: http://expressjs.com/en/guide/using-middleware.html.

app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
})); // Define a route to render our initial HTML.

app.use('/', function (req, res) {
  if (!req.session.visitCount) {
    req.session.visitCount = 0;
  }

  req.session.visitCount++;
  var html = renderVM({
    visitCount: req.session.visitCount
  });
  res.send(html);
}); // Launch the server

app.listen(process.env.PORT, function () {
  console.info("Fake server is running on port " + process.env.PORT);
});