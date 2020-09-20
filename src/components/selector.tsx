import * as React from 'react';

export class Selector extends React.Component<{ onSelect: (mapName: string) => void, maps: JSX.Element[] }, { value: string }> {
    constructor(props) {
        super(props);
        this.state = { value: "" };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleSubmit(event) {
        this.props.onSelect(this.state.value);
        event.preventDefault();
    }

    render() {
        return <form onSubmit={this.handleSubmit}>
            <select value={this.state.value} onChange={this.handleChange}>
                <option value="">New Map</option>
                {this.props.maps}
            </select>
            <input type="submit" value="Submit" />
        </form>
    }
}
