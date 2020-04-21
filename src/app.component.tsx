import React from 'react';
import ReactDOM from 'react-dom';

export class ApplicationComponent extends React.Component {

    public static initialize(appRoot: HTMLElement) {
        ReactDOM.render(<ApplicationComponent/>, appRoot);
    }

    render() {
        return (<div>
            loading...!
        </div>);
    }
}