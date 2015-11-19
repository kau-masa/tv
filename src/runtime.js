import * as constants from './constant.js'

var Qajax = require('qajax');
var _ = require('underscore');
var Q = require('q');

String.prototype.format = function() {
  var args = arguments;
  return this.replace(/{(\d+)}/g, function(match, number) { return typeof args[number] != 'undefined' ? args[number] : match; });
};

var instID;

console.log(window.location.href);
var httpURL;
var wsURL;

export function cancel(requestID, agentID, params) {
  sendCancel(requestID);
}

function craftRequest(r) {
  r = _.defaults(r || {}, {
    token: undefined,
    method: 'GET',
    path: '',
    query: {},
    headers: {},
    data: {}
  });

  var url = httpURL + r.path;
  if ((!_.isUndefined(constants.SH_APP_ID)) && (!_.isUndefined(constants.SH_APP_SECRET))) {
    r.headers['X-Craft-Ai-App-Id'] = constants.SH_APP_ID;
    r.headers['X-Craft-Ai-App-Secret'] = constants.SH_APP_SECRET;
  }
  r.headers['Content-Type'] = 'application/json; charset=utf-8';
  r.headers['accept'] = '';

  return Qajax({
    url: url,
    method: r.method,
    headers:r.headers,
    data:r.data,
    params: r.query
  })
  .then(Qajax.filterStatus(function (code) {
    return code == 200; /* only support 200 */
  }))
  .then(Qajax.toJSON, function (err) {
      console.log("xhr failure: ", err);
  })
}

export function createInstance(user, project, version) {
  httpURL = 'https://' + constants.RUNTIME_URL + '/api/v1/' + user + '/' + project + '/' + version;
  wsURL = 'wss://' + constants.RUNTIME_URL + '/api/v1/' + user + '/' + project + '/' + version;
  return craftRequest({
    method: 'PUT'
  })
  .then((resp)=>{
    instID = resp.instance.instance_id;
    console.log('Instance ID :'+instID);
    }
  );
}

export function destroyInstance() {
  return craftRequest({
    method: 'DELETE',
    path: '/'+instID
  });
}

export function destroyInstanceSync() {
  var oReq = new XMLHttpRequest();
  oReq.open('DELETE', httpURL + '/' + instID, false);
  oReq.setRequestHeader('content-type', 'application/json; charset=utf-8');
  oReq.setRequestHeader('accept', '');
  oReq.setRequestHeader('X-Craft-Ai-App-Id', constants.SH_APP_ID);
  oReq.setRequestHeader('X-Craft-Ai-App-Secret', constants.SH_APP_SECRET);
  oReq.send();
  return oReq.status;
}

export function registerAction(jsonString) {
  return craftRequest({
    method: 'PUT',
    path: '/'+instID+'/actions',
    data: jsonString
  });
}

export function createAgent(behavior, knowledge) {
  var params = {};
  params.behavior = behavior;
  params.knowledge = knowledge;
  return craftRequest({
    method: 'PUT',
    path: '/'+instID+'/agents',
    data: JSON.stringify(params)
  });
}

export function getAgentKnowledge(agentID) {
  return craftRequest({
    method: 'GET',
    path: '/'+instID+'/agents/'+agentID+'/knowledge'
  });
}

export function updateAgentKnowledge(agentID, destination, value) {
  var j = {};
  j[destination] = value;
  return craftRequest({
    method: 'POST',
    path: '/'+instID+'/agents/'+agentID+'/knowledge',
    query: {method: 'merge'},
    data: JSON.stringify(j)
  });
}

export function updateInstanceKnowledge(destination, value) {
  var j = {};
  j[destination] = value;
  return craftRequest({
    method: 'POST',
    path: '/'+instID+'/instanceKnowledge',
    query: {method: 'merge'},
    data: JSON.stringify(j)
  });
}

export function update()
{
  return craftRequest({
    method: 'POST',
    path: '/'+instID+'/update',
    data: '{"time":0.5,"ts":' + new Date().getTime() + '}'
  });
}

export function sendSuccess(requestID, jsonString) {
  return craftRequest({
    method: 'POST',
    path: '/'+instID+'/actions/'+requestID+'/success',
    data: jsonString
  });
}

export function sendFailure(requestID, jsonString) {
  return craftRequest({
    method: 'POST',
    path: '/'+instID+'/actions/'+requestID+'/failure',
    data: jsonString
  });
}

export function sendCancel(requestID) {
  return craftRequest({
    method: 'POST',
    path: '/'+instID+'/actions/'+requestID+'/cancelation'
  });
}

export function doUpdate() {
  setInterval(update, 500);
}

export function doWS() {
  var wsUrlRoute = wsURL + '/' + instID + '/websockets';
  console.log('WS Connexion on', wsUrlRoute + ':');
  if (wsUrlRoute) {
    console.log('requesting WS connexion...');
    var ws = new WebSocket(wsUrlRoute);
    ws.onmessage = function(evt) {
      if (evt.data != 'ping') {
        var jsonEvt = JSON.parse(evt.data);
        window[jsonEvt.call](jsonEvt.requestId , jsonEvt.agentId, jsonEvt.input);
      }
      else {
        console.log('ping');
      }
      ws.send('Done');
    };
    ws.onopen = function() {
      ws.send('socket open');
      console.log('WS Connexion open', ws);
    };
    ws.onclose = function() {
      console.log('WS Connexion closed', ws);
    };
    ws.onerror = function() {
      console.log('WS Connexion error', ws);
    };
  }
}
