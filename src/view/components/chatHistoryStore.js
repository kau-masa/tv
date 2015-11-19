var _ = require('underscore');
var Reflux = require('reflux');
import * as Runtime from '../../runtime.js';

exports = module.exports = Reflux.createStore({
  addMessage: function(messageSender, messageContent) {
    this.messages.push({
       messageSender: messageSender,
       messageContent: messageContent,
       messageTimestamp: (new Date().toString())
     });
    this.trigger(this.messages);
  },
  addUserMessage: function(userMessage) {
    if (userMessage != '') {
      Runtime.updateAgentKnowledge(0,'inputText', userMessage);
      this.addMessage('User', userMessage);
      this.lastUserMessage = userMessage;
    }
  },
  addCraftMessage: function(craftMessage) {
    this.addMessage('CRAFT', craftMessage);
  },
  getMessages: function() {
    return this.messages;
  },
  getLastUserMessage: function() {
    return this.lastUserMessage;
  },
  getInitialState: function() {
    this.messages = [];
    this.lastUserMessage = '';
    return this.messages;
  }
});
