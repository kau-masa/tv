import React from 'react';
import _ from 'underscore';
var Reflux = require('reflux');
import tvStore from './tvStore.js';
import { ProgressBar } from 'react-bootstrap';

var currentVolIntervalID = -1;

exports = module.exports = React.createClass({
  mixins: [Reflux.connect(tvStore, 'craftTV')],
  handleState: function() {
    switch (tvStore.getState()) {
      case 'on':
        tvStore.setState('off');
        break;
      case 'off':
        tvStore.setState('on');
        break;
      default:
      break;
    }
  },
  decreaseVolume: function() {
    tvStore.setVolume(tvStore.getVolume() - 1);
  },
  increaseVolume: function() {
    tvStore.setVolume(tvStore.getVolume() + 1);
  },
  handlePause: function() {
    tvStore.getPause() ? tvStore.setPause(false) : tvStore.setPause(true);
  },
  handleSnap() {
    var context = canvas.getContext("2d");
    context.drawImage(video, 0, 0, 640, 480);
  },
  handleRemoteStartEvent(e) {
    var evt = e ? e:window.event;
    if (evt.pageX || evt.pageY) {
      if ((evt.pageX>1825) && (evt.pageX<1875)) {
        if ((evt.pageY>300) && (evt.pageY<340)) {
          this.handleState();
        }
        else if ((evt.pageY>360) && (evt.pageY<405)) {
          currentVolIntervalID = setInterval(function() {tvStore.increaseVolume()}, 150);
        }
        else if ((evt.pageY>430) && (evt.pageY<465)) {
          currentVolIntervalID = setInterval(function() {tvStore.decreaseVolume()}, 150);
        }
      }
      else if ((evt.pageX>1965) && (evt.pageX<2000)) {
        if ((evt.pageY>300) && (evt.pageY<340)) {
          this.handlePause();
        }
      }
    }

    // debug
    // alert (evt.type.toUpperCase() + ' mouse event:'
    // +'\n pageX = ' + evt.pageX
    // +'\n pageY = ' + evt.pageY
    // +'\n clientX = ' + evt.clientX
    // +'\n clientY = '  + evt.clientY
    // +'\n screenX = ' + evt.screenX
    // +'\n screenY = ' + evt.screenY
    // )
  },
  handleRemoteEndEvent(e) {
    if (currentVolIntervalID != -1) {
      clearInterval(currentVolIntervalID);
      setTimeout(function() {document.getElementById('tvVolume').style.visibility = 'hidden'}, 2000);
    }
  },
  render: function() {
    return (
      <div>
        <div>
          <img src="favicons/tv.png" alt="Craft TV" className="tvWidget" />
          <div className="volumeControl">
          <ProgressBar id="tvVolume" now={tvStore.getVolume()} label="Volume: %(percent)s" style={{visibility: "hidden"}}/>
          </div>
          <div className="youtubeTV" id="yPlayer" style={{visibility: "hidden"}}/>
        </div>
        <img src="favicons/tv_remote.png" className="tvRemoteWidget" alt="Craft Remote" onMouseDown={this.handleRemoteStartEvent} onMouseUp={this.handleRemoteEndEvent}/>
      </div>
    );
  }
});
