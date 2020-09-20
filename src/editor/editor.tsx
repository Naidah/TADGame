import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { MapCanvas } from './components/mapCanvas';

const editor = <MapCanvas></MapCanvas>;

ReactDOM.render(<div>
    <h1>Map Editor</h1>
    {editor}
</div >, document.getElementById("root"));
