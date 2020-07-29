import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { EditPage } from './components/editPage';

const editor = <EditPage></EditPage>;

ReactDOM.render(<div>
    <h1>Map Editor</h1>
    {editor}
</div >, document.getElementById("root"));