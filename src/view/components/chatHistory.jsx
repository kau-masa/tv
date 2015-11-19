import React from 'react';
import _ from 'underscore';
var Reflux = require('reflux');
import chatHistoryStore from './chatHistoryStore.js';
import * as Runtime from '../../runtime.js';

var ChatMessage = React.createClass({
  render() {
    switch (this.props.messageSender) {
      case 'CRAFT':
        return (
          <li className="right clearfix"><span className="chat-img pull-right">
              <img src="favicons/favicon.ico" alt="User Avatar" className="img-circle" />
          </span>
              <div className="chat-body clearfix">
                  <div className="header">
                      <strong className="pull-right primary-font">Craft Assistant</strong>
                  </div>
                  <p>
                    {this.props.messageContent}
                  </p>
              </div>
          </li>
        );
        break;
      default:
        return (
          <li className="left clearfix"><span className="chat-img pull-left">
              <img src="http://placehold.it/50/55C1E7/fff&text=Me" alt="User Avatar" className="img-circle" />
          </span>
              <div className="chat-body clearfix">
                  <div className="header">
                      <strong className="primary-font">Craft User</strong>
                  </div>
                  <p>
                      {this.props.messageContent}
                  </p>
              </div>
          </li>
        );
    }
  }
});

exports = module.exports = React.createClass({
  mixins: [Reflux.connect(chatHistoryStore, 'messages')],
  _onKeyDown: function() {
    if(event.keyCode == 13) {
      this._addUserMessage();
    }
    else if (event.keyCode == 38) {
      document.getElementById('btn-input').value = '';
      document.getElementById('btn-input').value = chatHistoryStore.getLastUserMessage();;
    }
  },
  _addUserMessage: function() {
    var userMessage = document.getElementById('btn-input').value;
    document.getElementById('btn-input').value = '';
    chatHistoryStore.addUserMessage(userMessage);
  },
  render: function() {
    return (
      <div>
      <div className="panel-primary" style={{'overflowY': 'auto', 'overflowX': 'hidden', 'position': 'absolute', 'width': 240, 'top': 400, 'left': 40, 'box-sizing': 'null', 'height': 370, 'z-index':1}}>
          <span class="chat">
              {
                this.state.messages.length == 0 ? (
                  <h3><em>{this.props.placeholder}</em></h3>
                ) : _.map(this.state.messages, msg => (
                    <ChatMessage
                      messageSender={msg.messageSender}
                      messageContent={msg.messageContent}
                      messageTimestamp={msg.messageTimestamp}/>
                  )
                )
              }
            </span>
        </div>
        <div className="panel-footer" style={{'position': 'absolute', 'width': 245, 'top': 780, 'left': 38, 'box-sizing': 'null', 'height': 50, 'z-index':1}}>
            <div className="input-group">
                <input id="btn-input" type="text" className="form-control input-sm" placeholder="Type your message here..." onKeyDown={this._onKeyDown}/>
                <span className="input-group-btn">
                    <button className="btn btn-warning btn-sm" id="btn-chat" onClick={this._addUserMessage.bind(this)}>
                        Send
                    </button>
                </span>
            </div>
        </div>
      </div>
    );
  }
});
