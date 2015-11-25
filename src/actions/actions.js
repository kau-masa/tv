import { sendSuccess, sendFailure, sendCancel } from 'craft-ai-client-js';
import format from 'string-format';

export var actionTable = {
  'Log':{'start':Log}
};

function cancel(requestID, entityID, params) {
  sendCancel(requestID);
}

function Log(requestID, entityID, params) {
  console.log ('LOG FROM CRAFT:', format( params.message, params ) );
  sendSuccess(requestID);
}
