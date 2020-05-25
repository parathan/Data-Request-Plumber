var mongoose = require('mongoose');
var User = mongoose.model('Plumber');

module.exports.usersGetAll = function(req, res) {

  console.log('GET the users');
  console.log(req.query);

  var offset = 0;
  var count = 5;
  var maxCount = 50;

  if (req.query && req.query.offset) {
    offset = parseInt(req.query.offset, 10);
  }

  if (req.query && req.query.count) {
    count = parseInt(req.query.count, 10);
  }

  if (isNaN(offset) || isNaN(count)) {
    res
      .status(400)
      .json({
        "message" : "If supplied in querystring, count and offset must both be numbers"
      });
    return;
  }

  if (count > maxCount) {
    res
      .status(400)
      .json({
        "message" : "Count limit of " + maxCount + " exceeded"
      });
    return;
  }

  User
    .find()
    .skip(offset)
    .limit(count)
    .exec(function(err, users) {
      console.log(err);
      console.log(users);
      if (err) {
        console.log("Error finding users");
        res
          .status(500)
          .json(err);
      } else {
        console.log("Found users", users.length);
        res
          .json(users);
      }
    });

};

module.exports.usersGetOne = function(req, res) {
  var id = req.params.userId;

  console.log('GET userId', id);

  User
    .findById(id)
    .exec(function(err, doc) {
      var response = {
        status : 200,
        message : doc
      };
      if (err) {
        console.log("Error finding user");
        response.status = 500;
        response.message = err;
      } else if(!doc) {
        console.log("UserId not found in database", id);
        response.status = 404;
        response.message = {
          "message" : "User ID not found " + id
        };
      }
      res
        .status(response.status)
        .json(response.message);
    });

};

var _splitArray = function(input) {
  var output;
  if (input && input.length > 0) {
    output = input.split(";");
  } else {
    output = [];
  }
  return output;
};

module.exports.usersAddOne = function(req, res) {
  console.log("POST new user");

  User
    .create({
      name : req.body.name,
      }
    }, function(err, user) {
      if (err) {
        console.log("Error creating user");
        res
          .status(400)
          .json(err);
      } else {
        console.log("User created!", user);
        res
          .status(201)
          .json(user);
      }
    });

};


module.exports.usersUpdateOne = function(req, res) {
  var userId = req.params.userId;

  console.log('GET userId', userId);

  User
    .findById(userId)
    .select('-outgoing -incoming')
    .exec(function(err, User) {
      if (err) {
        console.log("Error finding User");
        res
          .status(500)
          .json(err);
          return;
      } else if(!User) {
        console.log("userId not found in database", userId);
        res
          .status(404)
          .lson({
            "message" : "User ID not found " + userId
          });
          return;
      }

      User.name = req.body.name;

      User
        .save(function(err, UserUpdated) {
          if(err) {
            res
              .status(500)
              .json(err);
          } else {
            res
              .status(204)
              .json();
          }
        });


    });

};


module.exports.UsersDeleteOne = function(req, res) {
  var userId = req.params.userId;

  User
    .findByIdAndRemove(userId)
    .exec(function(err, location) {
      if (err) {
        res
          .status(404)
          .json(err);
      } else {
        console.log("User deleted, id:", userId);
        res
          .status(204)
          .json();
      }
    });
};
