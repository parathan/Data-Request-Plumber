var mongoose = require('mongoose');
var User = mongoose.model('Plumber');


// GET all requests for a User
module.exports.requestsGetAll = function(req, res) {
  var id = req.params.userId;
  console.log('GET requests for userId', id);

  User
    .findById(id)
    .select('requests')
    .exec(function(err, doc) {
      var response = {
        status : 200,
        message : []
      };
      if (err) {
        console.log("Error finding User");
        response.status = 500;
        response.message = err;
      } else if(!doc) {
        console.log("User id not found in database", id);
        response.status = 404;
        response.message = {
          "message" : "User ID not found " + id
        };
      } else {
        response.message = doc.requests ? doc.requests : [];
      }
      res
        .status(response.status)
        .json(response.message);
    });
};

// GET single request for a User
module.exports.requestsGetOne = function(req, res) {
  var userId = req.params.userId;
  var requestId = req.params.requestId;
  console.log('GET requestId ' + requestId + ' for userId ' + userId);

  User
    .findById(userId)
    .select('requests')
    .exec(function(err, User) {
      var response = {
        status : 200,
        message : {}
      };
      if (err) {
        console.log("Error finding User");
        response.status = 500;
        response.message = err;
      } else if(!User) {
        console.log("User id not found in database", id);
        response.status = 404;
        response.message = {
          "message" : "User ID not found " + id
        };
      } else {
        // Get the request
        response.message = User.requests.id(requestId);
        // If the request doesn't exist Mongoose returns null
        if (!response.message) {
          response.status = 404;
          response.message = {
            "message" : "request ID not found " + requestId
          };
        }
      }
      res
        .status(response.status)
        .json(response.message);
    });

};

var _addrequest = function (req, res, User) {

  User.requests.push({
    name : req.body.name,
    sender : req.body.sender,
    receiver : req.body.receiver,
    priority : parseInt(req.body.priority, 10),
    specifications : req.body.specifications
  });

  User.save(function(err, UserUpdated) {
    if (err) {
      res
        .status(500)
        .json(err);
    } else {
      res
        .status(200)
        .json(UserUpdated.requests[UserUpdated.requests.length - 1]);
    }
  });

};

module.exports.requestsAddOne = function(req, res) {

  var id = req.params.userId;

  console.log('POST request to userId', id);

  User
    .findById(id)
    .select('requests')
    .exec(function(err, doc) {
      var response = {
        status : 200,
        message : doc
      };
      if (err) {
        console.log("Error finding User");
        response.status = 500;
        response.message = err;
      } else if(!doc) {
        console.log("userId not found in database", id);
        response.status = 404;
        response.message = {
          "message" : "User ID not found " + id
        };
      }
      if (doc) {
        _addrequest(req, res, doc);
      } else {
        res
          .status(response.status)
          .json(response.message);
      }
    });


};


module.exports.requestsUpdateOne = function(req, res) {
  var userId = req.params.userId;
  var requestId = req.params.requestId;
  console.log('PUT requestId ' + requestId + ' for userId ' + userId);

  User
    .findById(userId)
    .select('requests')
    .exec(function(err, User) {
      var thisrequest;
      var response = {
        status : 200,
        message : {}
      };
      if (err) {
        console.log("Error finding User");
        response.status = 500;
        response.message = err;
      } else if(!User) {
        console.log("User id not found in database", id);
        response.status = 404;
        response.message = {
          "message" : "User ID not found " + id
        };
      } else {
        // Get the request
        thisrequest = User.requests.id(requestId);
        // If the request doesn't exist Mongoose returns null
        if (!thisrequest) {
          response.status = 404;
          response.message = {
            "message" : "request ID not found " + requestId
          };
        }
      }
      if (response.status !== 200) {
        res
          .status(response.status)
          .json(response.message);
      } else {
        thisRequest.name = req.body.name;
        thisRequest.sender = req.body.sender;
        thisRequest.receiver = req.body.receiver;
        thisRequest.priority = parseInt(req.body.priority, 10);
        thisRequest.specifications = req.body.specifications;
        User.save(function(err, UserUpdated) {
          if (err) {
            res
              .status(500)
              .json(err);
          } else {
            res
              .status(204)
              .json();
          }
        });
      }
    });

};


module.exports.requestsDeleteOne = function(req, res) {
  var userId = req.params.userId;
  var requestId = req.params.requestId;
  console.log('PUT requestId ' + requestId + ' for userId ' + userId);

  User
    .findById(userId)
    .select('requests')
    .exec(function(err, User) {
      var thisrequest;
      var response = {
        status : 200,
        message : {}
      };
      if (err) {
        console.log("Error finding User");
        response.status = 500;
        response.message = err;
      } else if(!User) {
        console.log("User id not found in database", id);
        response.status = 404;
        response.message = {
          "message" : "User ID not found " + id
        };
      } else {
        // Get the request
        thisrequest = User.requests.id(requestId);
        // If the request doesn't exist Mongoose returns null
        if (!thisrequest) {
          response.status = 404;
          response.message = {
            "message" : "request ID not found " + requestId
          };
        }
      }
      if (response.status !== 200) {
        res
          .status(response.status)
          .json(response.message);
      } else {
        User.requests.id(requestId).remove();
        User.save(function(err, UserUpdated) {
          if (err) {
            res
              .status(500)
              .json(err);
          } else {
            res
              .status(204)
              .json();
          }
        });
      }
    });

};
