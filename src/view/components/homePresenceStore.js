var _ = require('underscore');
var Reflux = require('reflux');
import * as Runtime from '../../runtime.js';

exports = module.exports = Reflux.createStore({
  handlePresence: function() {
    this.presenceState = !this.presenceState;
    Runtime.updateInstanceKnowledge('sensors', {presence: this.presenceState });
    this.trigger(this.presenceState);
  },
  getPresenceState: function() {
    return this.presenceState;
  },
  getInitialState: function() {
    this.presenceState = true;
    return this.phoneState;
  }
});
