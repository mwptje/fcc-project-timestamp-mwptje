// server.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// fcc-project-timestamp-mwptje
// your first API endpoint...
app.get("/api/hello", function(req, res) {
  res.json({ greeting: "hello API" });
});

// base timestamp api just return current date/time
app.get("/api/timestamp/", (req, res) => {
  const milliSeconds = new Date().getTime();
  res.json({ unix: milliSeconds, utc: new Date(milliSeconds).toUTCString() });
});
// when passed milliseconds as a date or a yyyy-mm-dd format
app.get("/api/timestamp/:date_string", (req, res) => {
  const { date_string } = req.params;
  const invDt = "Invalid Date";
  let ms = "";
  let utc = invDt;
  // test for strict number, if so convert to date as milliseconds
  if (/^\d+$/.test(date_string)) {
    ms = parseInt(date_string);
    utc = new Date(parseInt(ms)).toUTCString();
    // else if format is yyyy-mm-dd then convert to milliseconds
    // and then to UTC date format
  } else if (/^\d\d\d\d-\d\d-\d\d$/.test(date_string)) {
    ms = Date.parse(date_string);
    utc = new Date(ms).toUTCString();
  }
  if (utc === invDt) {
    res.json({ error: invDt });
  } else {
    res.json({ unix: ms, utc: utc });
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
