// this code was addapted from the class elctures on mongodb and the lab
var mongoClient = require('mongodb').MongoClient;


connection_string = "mongodb://admin:admin@ds137686.mlab.com:37686/final_project"
// Global variable of the connected database
var mongoDB;


mongoClient.connect(connection_string, function(err, db) {
  if (err) doError(err);
  console.log("Connected to MongoDB server at: "+connection_string);
  mongoDB = db;
});

exports.findByUsername = function(username, callback) {
mongoDB.collection("users").find({"username":username}).toArray(function(err,row){
  if(err) doError(err);
  var foundUser = null;
  var err = null;
  for (var i = 0 ; i < row.length ; i++) {
    if (row[i].username == username) {
      foundUser = row[i];
      console.log(foundUser);
      break;
    }
  }
  callback(err, foundUser);
})
}

exports.findById = function(id, callback) {
var Oid = require('mongodb').ObjectId;
mongoDB.collection("users").find(Oid(id)).toArray(function(err,row){

  if(err) doError(err);
  var foundUser = null;
  var err = null;
  for (var i = 0 ; i < row.length ; i++) {
    if (row[i]._id == id) {
      foundUser = row[i]
      break;
    }
  }

callback(err, foundUser);
})

}

exports.create = function(data, callback) {
  mongoDB.collection("users").insertOne(
    data,
    function(err, status) {
      if (err) doError(err);
      var success = (status.result.n == 1 ? true : false);
      callback(success);
    });
}
