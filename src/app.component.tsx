import React from 'react';
import ReactDOM from 'react-dom';
import {APage} from './classes/APage';

export class ApplicationComponent extends React.Component{
  
  public static initialize(appRoot: HTMLElement){
    ReactDOM.render(<ApplicationComponent/>, appRoot);
  }

  render(){
    return (<div>
      loading...!
    </div>);
  }
}