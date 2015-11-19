import React from 'react';
import App from './view/containers/app';
import {destroySimulationSyncro} from './runtime.js';

window.onbeforeunload = function onBeforeUnload() {
	console.log("cleanup");
	destroyInstanceSync();
}

React.render(
  <App />,
  document.getElementById('root')
);
