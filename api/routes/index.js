var express = require('express');
var router = express.Router();

var ctrlUsers = require('../controllers/users.controllers.js');
var ctrlRequests = require('../controllers/requests.controllers.js');

// user routes
router
  .route('/users')
  .get(ctrlUsers.usersGetAll)
  .post(ctrlUsers.usersAddOne);

router
  .route('/users/:userId')
  .get(ctrlUsers.usersGetOne)
  .put(ctrlUsers.usersUpdateOne)
  .delete(ctrlUsers.usersDeleteOne);


// request routes
router
  .route('/users/:userId/requests')
  .get(ctrlRequests.requestsGetAll)
  .post(ctrlRequests.requestsAddOne);

router
  .route('/users/:userId/requests/:requestId')
  .get(ctrlRequests.requestsGetOne)
  .put(ctrlRequests.requestsUpdateOne)
  .delete(ctrlRequests.requestsDeleteOne);

module.exports = router;
