var _ = require('lodash');

module.exports = function(eventStore, cmdHandler){
  return {
    handleCommand : function(cmd){
      var eventStream = eventStore.loadEvents(cmd.id);
      return cmdHandler(eventStream).executeCommand(cmd);
    }
  }
};
