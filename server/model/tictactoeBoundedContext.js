var _ = require('lodash');
var dataStore = require('../eventstore/databaseStore');

module.exports = function(eventStore, cmdHandler){
  return {
    handleCommand : function(cmd){
      var eventStream = eventStore.loadEvents(cmd.id);
      //var eventStream = dataStore.loadEvents(cmd.id);
      var events = cmdHandler(eventStream).executeCommand(cmd);
      eventStore.storeEvents(cmd.id, events);
      dataStore.storeEvents(cmd.id, events);
      return events;
    }
  }
};
