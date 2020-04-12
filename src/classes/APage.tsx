import React from 'react';

interface IAPageProps{
  ServiceController
}

interface IAPageStates{

}

export class APage<P extends IAPageProps, S extends IAPageStates> extends React.Component<P,S>{
  constructor(iprops: P){
    super(iprops);
  }

  render(){
    return (<div>
      asd
    </div>);
  }
}