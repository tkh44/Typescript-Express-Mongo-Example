import http = require("http")
import db = require("./db")
import express = require("express")
import bodyParser = require("body-parser");
import methodOverride = require("method-override");
import errorHandler = require("errorhandler");

var app = express();

// Configuration
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOverride());

var env = process.env.NODE_ENV || 'development';
if (env === 'development') {
  app.use(errorHandler({dumpExceptions: true, showStack: true}));
}
else if (env === 'production') {
  app.use(errorHandler());
}


// Routes
app.get('/', (req:express.Request, res:express.Response) => {
  res.json({"server": "running"});
});

app.get('/jobs/:jobId', (req:express.Request, res:express.Response) => {
  db.getJob(req.params.jobId, (err, job:db.Job) => {
    if (job) {
      res.json(job);
    } else {
      res.status(404).json({error: 'not found'});
    }
  })
});

app.post('/jobs', (req:express.Request, res:express.Response) => {
  db.addJob(req.body.inputUri, (err, job: db.Job) => {
    if (err) return res.status(500).json({error: err});
    res.status(201).json(job);
  });
});



app.listen(3000, function () {
  console.log("Demo Express server listening on port %d in %s mode", 3000, app.settings.env);
});

export var App = app;