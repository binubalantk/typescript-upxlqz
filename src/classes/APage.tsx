import React, {ReactNode} from 'react';

export interface IAPageProps{
  title: string
}

export interface IAPageStates{
  currentSub: number;
}

export abstract class APage<P extends IAPageProps, S extends IAPageStates> extends React.Component<P,S>{
  constructor(iprops: P){
    super(iprops);
  }

  render(){
    return (<div>
      {this.renderPage()}
    </div>);
  }

  public abstract renderPage(): ReactNode;
}