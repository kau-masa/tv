var _ = require('underscore');
var Reflux = require('reflux');

exports = module.exports = Reflux.createStore({
  updateState: function() {
    this.trigger(this.phoneState);
  },
  updateRingtone: function() {
    if (this.phoneState === 'isRinging') {
      document.getElementById("ringtone").play();
    }
    else {
      document.getElementById("ringtone").pause();
      document.getElementById("ringtone").currentTime = 0;
    }
  },
  handleStandBy: function() {
    this.setState('standBy');
  },
  handleRing: function() {
    this.setState('isRinging');
  },
  handleCall: function() {
    this.setState('isCalling');
  },
  setState: function(state) {
    this.phoneState = state;
    this.updateState();
    this.updateRingtone();
  },
  getState: function() {
    return this.phoneState;
  },
  getInitialState: function() {
    this.phoneState = 'standBy';
    return this.phoneState;
  }
});
