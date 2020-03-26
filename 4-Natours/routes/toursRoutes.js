const toursController = require('./../controller/toursController');

const express = require('express');

const Router = express.Router();

Router.param('id', toursController.checkID);

Router.route('/')
  .get(toursController.getallTour)
  .post(toursController.checkBody, toursController.createTour);

Router.route('/:id')
  .get(toursController.getTour)
  .patch(toursController.UpdateTour)
  .delete(toursController.deleteTour);

module.exports = Router;
