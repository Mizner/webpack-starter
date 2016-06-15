import React from 'react';
import {render} from 'react-dom';

require("./file.css");


import AwesomeComponent from './component.jsx';

class App extends React.Component {
    render() {
        return (
            <div>
                <p> Hello Reaasdfct! </p>
                <AwesomeComponent />
            </div>
        )
    };
}

render(<App/>, document.getElementById('app'));