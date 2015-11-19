import {sendSuccess, sendFailure, sendCancel} from './runtime.js';
import {registerAction} from './runtime.js';
import chatHistoryStore from './view/components/chatHistoryStore';
import tvStore from './view/components/tvStore';
import phoneStore from './view/components/phoneStore';

var _ = require('lodash');
var util = require('util');
var actionTable = [
  {'name':'Speech','start':Speech},
  {'name':'SetDeviceValue','start':SetDeviceValue},
  {'name':'GetDeviceValue','start':GetDeviceValue},
];

export function registerActions() {
  var actionCopyTable = actionTable.slice(0);
  function recursiveReg() {
    var actionName = actionCopyTable.shift();
    window[actionName.name]=actionName.start;
    var actionObject = {"name":actionName.name, "start":actionName.name, "cancel":"cancel"};
    return registerAction(JSON.stringify(actionObject))
    .then(()=>{
      if( actionCopyTable.length === 0 )
        return;
      return recursiveReg();
    });
  }
  console.log( "registering actions" );
  return recursiveReg();
}

function Speech(requestID, agentID, params) {
  console.log( agentID + ' : ' + params.message);
  chatHistoryStore.addCraftMessage(params.message);
  sendSuccess(requestID);
}

function GetDeviceValue(requestID, agentID, params) {
  switch (params.device) {
    case 'craftTV':
      if (params.attribute === 'volume') {
        sendSuccess(requestID, '{"' + params.attribute + '": ' + tvStore.getVolume() +'}');
      }
      else if (params.attribute === 'state') {
        sendSuccess(requestID, '{"' + params.attribute + '": "' + tvStore.getState() +'"}');
      }
      if (params.attribute === 'pause') {
        sendSuccess(requestID, '{"' + params.attribute + '": ' + tvStore.getPause() +'}');
      }
      else {
        sendFailure(requestID);
      }
    break;
    case 'craftPhone':
      if (params.attribute === 'state') {
        sendSuccess(requestID, '{"' + params.attribute + '": "' + phoneStore.getState() +'"}');
      }
      else {
        sendFailure(requestID);
      }
    break;
    default:
      sendFailure(requestID);
    break;
  }
}

function SetDeviceValue(requestID, agentID, params) {
  switch (params.device) {
    case 'craftTV':
      if ((params.attribute === 'volume') || (params.attribute === 'state') ||
          (params.attribute === 'pause')) {
        tvStore.setAttr(params.attribute, params.value)
        sendSuccess(requestID)
      }
      else {
        sendFailure(requestID);
      }
    break;
    case 'craftPhone':
      if (params.attribute === 'state') {
        phoneStore.setState(params.value);
        sendSuccess(requestID)
      }
      else {
        sendFailure(requestID);
      }
    break;
    default:
      sendFailure(requestID);
    break;
  }
}
