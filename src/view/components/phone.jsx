import React from 'react';
import _ from 'underscore';
var Reflux = require('reflux');
import {ButtonGroup, Button, Row} from 'react-bootstrap';
import phoneStore from './phoneStore.js';
import ChatHistory from '../components/chatHistory';

exports = module.exports = React.createClass({
  mixins: [Reflux.connect(phoneStore, 'phoneState')],
  handlePhoneEvent(e) {
    var evt = e ? e:window.event;
    if (evt.pageX || evt.pageY) {
      if ((evt.pageX>130) && (evt.pageX<200)) {
        if ((evt.pageY>850) && (evt.pageY<870)) {
          if (phoneStore.getState() === 'standBy') {
            phoneStore.handleCall();
          }
          else {
            phoneStore.handleStandBy();
          }
        }
      }
      else if ((evt.pageY>685) && (evt.pageY<745)) {
        if ((evt.pageX>40) && (evt.pageX<100)) {
          phoneStore.handleCall();
        }
        else if ((evt.pageX>215) && (evt.pageX<285)) {
          phoneStore.handleStandBy();
        }
      }
    }
    //debug
    // alert (evt.type.toUpperCase() + ' mouse event:'
    // +'\n pageX = ' + evt.pageX
    // +'\n pageY = ' + evt.pageY
    // +'\n clientX = ' + evt.clientX
    // +'\n clientY = '  + evt.clientY
    // +'\n screenX = ' + evt.screenX
    // +'\n screenY = ' + evt.screenY
    // )
  },
  render: function() {
    var currentImg = "favicons/phone.png";
    var currentClassName = "phoneWidget"
    switch (phoneStore.getState()) {
      case 'isRinging':
        currentImg = "favicons/phone_ringing.png";
        currentClassName = "phoneWidgetAbove";
      break;
      case 'isCalling':
        currentImg = "favicons/phone_online.png";
        currentClassName = "phoneWidgetAbove";
      break;
      default:
      break;
    }
    return (
      <div >
        <img src={currentImg} alt="Craft Phone" className={currentClassName} onClick={this.handlePhoneEvent}/>
        <ChatHistory/>
        <audio id="ringtone" src="audio/samsung_ringtone.mp3" loop={true} volume={1}/>
      </div>
    );
  }
});
