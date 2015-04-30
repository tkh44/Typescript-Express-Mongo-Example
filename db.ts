// Mongo
import mongodb = require('mongodb');

var server = new mongodb.Server('localhost', 27017, {auto_reconnect: true})
var db = new mongodb.Db('mydb', server, {w: 1});
db.open(function () {});

export interface User {
  _id: string;
  email: string;
  first_name: string;
  last_name: string;
  boards: Board[];
}

export interface Job {
  _id: mongodb.ObjectID;
  user: string;
  inputUri: string;
  outputUri: string;
}

export function getJob(id:string, cb:(err, job?:Job) => void) {
  db.collection('jobs', (err, jobsCollection) => {
    if (err) return cb(err);
    jobsCollection.findOne({"_id": new mongodb.ObjectID(id)}, (err, job:Job) => {
      if (err) return cb(err);
      return cb(null, job);
    })
  })
}

export function addJob(inputUri:string, cb:(err, job?:Job) => void) {
  db.collection('jobs', (err, jobsCollection) => {
    if (err) return cb(err);
    jobsCollection.insertOne({
      user: new mongodb.ObjectID("5541c66b51636c994b0454db"),
      inputUri: inputUri,
      outputUri: inputUri
    }, (err, result) => {
      if (err) return cb(err);
      cb(null, result.ops[0]);
    })
  })
}