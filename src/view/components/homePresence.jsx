import React from 'react';
import _ from 'underscore';
var Reflux = require('reflux');
import {Row} from 'react-bootstrap';
import homePresenceStore from './homePresenceStore.js';

exports = module.exports = React.createClass({
  mixins: [Reflux.connect(homePresenceStore, 'homePresence')],
  render: function() {
    var currentImg = "favicons/home_empty.png";
    if (homePresenceStore.getPresenceState()) {
      currentImg = "favicons/home_presence.png";
    }
    return (
    <div>
      <img src={currentImg} alt="Home presence" className="centerElt" onClick={homePresenceStore.handlePresence}/>
    </div>
    );
  }
});
