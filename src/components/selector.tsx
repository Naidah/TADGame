import * as React from 'react';

interface Props {
    onSelect: (mapName: string) => void,
    maps: JSX.Element[]
}

interface State {
    value: string
}

export class Selector extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { value: "" };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event: React.ChangeEvent<HTMLSelectElement>): void {
        this.setState({ value: event.target.value });
    }

    handleSubmit(event: React.ChangeEvent<HTMLFormElement>): void {
        this.props.onSelect(this.state.value);
        event.preventDefault();
    }

    render(): JSX.Element {
        return <form onSubmit={this.handleSubmit}>
            <select value={this.state.value} onChange={this.handleChange}>
                <option value="">New Map</option>
                {this.props.maps}
            </select>
            <input type="submit" value="Submit" />
        </form>
    }
}
