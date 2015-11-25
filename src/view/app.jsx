import React from 'react';
import * as Runtime from 'craft-ai-client-js';
import * as constants from '../constants';
import {actionTable} from '../actions/actions';

export default React.createClass({
  render: function() {
    return (
      <div>
        Running
      </div>
   );
  },
  componentWillMount(){
    Runtime.createInstance(constants.USER, constants.PROJECT, constants.VERSION, constants.APP_ID, constants.APP_SECRET)
    .then(() => {
      Runtime.doWS(actionTable);
      return Runtime.registerActions(actionTable);
    })
    .then(() => {
      return Runtime.createAgent('src/decision/Hello.bt', {});
    })
    .then(() => {
      return Runtime.doUpdate(5000);
    })
  },
  componentWillUnmount(){
    console.log("unmount");
    Runtime.destroyInstance({});
  }
});