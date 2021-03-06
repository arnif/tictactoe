'use strict';

// Development specific configuration
// ==================================
module.exports = {
  // MongoDB connection options
  mongo: {
    uri: 'mongodb://development:development@ds063630.mongolab.com:63630/tictac-dev'
  },
  //store: '/eventstore/memory/memoryStore',
  store: '/eventstore/database/databaseStore',

  seedDB: true
};
