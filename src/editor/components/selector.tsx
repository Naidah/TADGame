import * as React from 'react';

export class Selector extends React.Component<{ onSelect: (mapName: string) => void }, { value: string, maps: JSX.Element[] }> {
    constructor(props) {
        super(props);
        this.state = { value: "", maps: [] };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.loadMapList();
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleSubmit(event) {
        this.props.onSelect(this.state.value);
        event.preventDefault();
    }

    async loadMapList() {
        return await fetch("/index.json")
            .then((resp) => resp.json())
            .then((resp) => {
                let newMaps = [];
                for (let m in resp) {
                    newMaps.push(<option key={m} value={m}>{resp[m]}</option>);
                }
                this.setState({ maps: newMaps });
            });
    }

    render() {
        return <form onSubmit={this.handleSubmit}>
            <select value={this.state.value} onChange={this.handleChange}>
                <option value="">New Map</option>
                {this.state.maps}
            </select>
            <input type="submit" value="Submit" />
        </form>
    }
}