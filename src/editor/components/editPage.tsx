import * as React from 'react'
import { Selector } from './selector';
import { type_map } from '../../server/types';
import { MapCanvas } from './mapCanvas';

export class EditPage extends React.Component<{}, { name: string, file: string, width: number, height: number }> {
    private _canvas: JSX.Element;
    private selector: JSX.Element;
    constructor(props) {
        super(props);

        this.state = { name: "NewMap", file: "", width: 800, height: 600 }

        this.loadMap = this.loadMap.bind(this);
        this.saveMap = this.saveMap.bind(this);
    }

    loadMap(name: string) {
        if (name != '') {
            fetch('/maps/' + name)
                .then(resp => resp.json())
                .then((resp: type_map) => {
                    this.setState({
                        name: resp.settings.name,
                        file: name,
                        width: resp.settings.size.width,
                        height: resp.settings.size.height
                    })
                })
        }
    }

    saveMap(map: type_map) {
        console.log(map);
        fetch('/editor/' + this.state.file, {
            method: "POST",
            cache: 'no-cache',
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(map)
        });
    }

    render() {
        return <div>
            <Selector onSelect={this.loadMap} ></ Selector>
            <h1>{this.state.name}</h1>
            <MapCanvas width={this.state.width} height={this.state.height} onSubmit={this.saveMap}></MapCanvas>
        </div>
    }
}