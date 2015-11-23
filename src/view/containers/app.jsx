
import HomePresence from '../components/homePresence';
import homePresenceStore from '../components/homePresenceStore.js';
import Phone from '../components/phone';
import phoneStore from '../components/phoneStore.js';
import Tv from '../components/tv';
import tvStore from '../components/tvStore.js';
import React from 'react';
import * as Runtime from '../../runtime.js';
import { SH_USER, SH_PROJECT, SH_VERSION } from '../../constant.js';
import { registerActions } from '../../actions.js';

export default class App extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div>
        <HomePresence/>
        <Phone/>
        <Tv/>
     </div>
   );
  }
  componentWillMount(){
    console.log("mount");
    Runtime.createInstance( SH_USER, SH_PROJECT, SH_VERSION )
    .then(() => {
      Runtime.doWS();
      return registerActions();
    })
    .then(() => {
      return Runtime.createAgent( 'demo1/SayHello.bt', {} )
    })
    .then(()=>{
      return Runtime.updateInstanceKnowledge('sensors', { presence: homePresenceStore.getPresenceState() });
    })
    .then(()=> {
      Runtime.doUpdate();
    })
    .catch((err)=>{
      console.log(err);
    });
  }
  componentWillUnmount(){
    console.log("unmount");
    Runtime.destroyInstance({});
  }
}
