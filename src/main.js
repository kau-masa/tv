import React from 'react';
import App from './view/app';
import {destroySimulation} from 'craft-ai-client-js';
import ReactDOM from 'react-dom';

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

window.onbeforeunload = function onBeforeUnload() {
  destroySimulation();
}