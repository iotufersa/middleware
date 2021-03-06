const express = require('express');
const config = require('@iotufersa/more4iot-js-sdk/config/routes');
const controller = require('./controller/ActionCommunicatorController');

const routes = express.Router();

routes.post(`/${config.actionCommunicatorRouteNotify}`, controller.dispatch);

module.exports = routes;
