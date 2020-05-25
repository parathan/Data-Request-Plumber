var express = require('express');
var router = express.Router();

var ctrlUsers = require('../controllers/users.controllers.js');
var ctrlRequests = require('../controllers/requests.controllers.js');

// Hotel routes
router
  .route('/users')
  .get(ctrlHotels.hotelsGetAll)
  .post(ctrlHotels.hotelsAddOne);

router
  .route('/users/:userId')
  .get(ctrlHotels.hotelsGetOne)
  .put(ctrlHotels.hotelsUpdateOne)
  .delete(ctrlHotels.hotelsDeleteOne);


// Review routes
router
  .route('/users/:userId/requests')
  .get(ctrlReviews.reviewsGetAll)
  .post(ctrlReviews.reviewsAddOne);

router
  .route('/users/:userId/requests/:requestId')
  .get(ctrlReviews.reviewsGetOne)
  .put(ctrlReviews.reviewsUpdateOne)
  .delete(ctrlReviews.reviewsDeleteOne);

module.exports = router;
