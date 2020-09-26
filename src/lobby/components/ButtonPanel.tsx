import * as React from "react";
import * as styles from "./styles/buttonPanel.css";
import {type_button_info} from "../../server/types";

interface Props {
    onChange: (value: string) => void,
    buttons: { [id: string]: type_button_info },
    default?: string,
    title?: string,
    canSelect?: boolean
}

interface State {
    active: string,
    canSelect: boolean
}

export class ButtonPanel extends React.Component<Props, State> {
    constructor (props: Props) {
        super(props);

        const cs = !(this.props.canSelect && !this.props.canSelect);

        this.state = { active: props.default ? props.default : "", canSelect: cs };

        this.handleButtonPress = this.handleButtonPress.bind(this);
    }

    componentDidUpdate(prevProps: Props): void {
        if (prevProps.default !== this.props.default) {
            const cs = !(this.props.canSelect && !this.props.canSelect);
            this.setState({
                active: this.props.default ? this.props.default : "",
                canSelect: cs,
            });
        }
    }

    handleButtonPress(value: string): void {
        if (this.state.canSelect) {
            this.props.onChange(value);
            this.setState({ active: value });
        }
    }

    createButtons(buttons: { [id: string]: type_button_info }): JSX.Element[] {
        const res: JSX.Element[] = [];
        for (const id in buttons) {
            const v = buttons[id];
            let contents = null;
            if (v.img) {
                contents = <img style={{ width: v.width, height: v.height }} src={v.img} />
            } else {
                contents = <div
                    style={{ lineHeight: `${v.height}px`, fontSize: 24 }}
                >{id[0].toUpperCase()}</div>;
            }
            const classname = `${styles["buttonpanel-button"]}
                ${this.state.active === id ? styles.active : ""}`;
            res.push(<button
                key={id}
                value={id}
                className={classname}
                onClick={() => this.handleButtonPress(id)}
            >
                {v.title ? <h3>{v.title}</h3> : null}
                <div
                    style={{ width: v.width, height: v.height }}
                    className={styles['buttonpanel-snapshot']}
                >
                    {contents}
                </div>
            </button>);
        }
        return res;
    }

    render(): JSX.Element {
        return <div className="buttonpanel">
            {this.props.title ? <h2>{this.props.title}</h2> : null}
            <div className={styles['buttonpanel-list']}>
                {this.createButtons(this.props.buttons)}
            </div>
        </div>
    }
}
