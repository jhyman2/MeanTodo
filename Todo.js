'use strict';

/**
 * Todo model
 */

var mongoose = require('mongoose');

module.exports = mongoose.model('Todo', {
  text: { type: String, required: true }
});