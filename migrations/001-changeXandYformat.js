exports.up = function(next){
  var migration = require('../server/eventstore/database/migrations/migrateXandY');
  migration.up(next);
};

exports.down = function(next){
  next();
};
