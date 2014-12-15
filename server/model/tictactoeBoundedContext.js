var _ = require('lodash');
var q = require('q');

module.exports = function(eventStore, cmdHandler){
  return {
    handleCommand : function(cmd){
      var deferred = q.defer();
      eventStore.loadEvents(cmd.id).then(function(eventStream) {
        var events = cmdHandler(eventStream).executeCommand(cmd);
        eventStore.storeEvents(cmd.id, events).then(function() {
          deferred.resolve(events);
        }, function(err) {
          deferred.reject(err);
        });
      });
      return deferred.promise;
    }
  }
};
