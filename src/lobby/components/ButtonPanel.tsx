import * as React from 'react';
import * as styles from './styles/buttonPanel.css'
import { type_button_info } from '../../server/types'

export class ButtonPanel extends React.Component<{ onChange: (value: string) => void, buttons: { [id: string]: type_button_info }, default?: string, title?: string }, { active: string }> {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = { active: props.default ? props.default : "" };

        this.handleButtonPress = this.handleButtonPress.bind(this);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.default !== this.props.default) {
            if (this.state.active == "") {
                this.setState({ active: this.props.default ? this.props.default : "" });
            }
            console.log(this.props, this.state.active);
        }
    }

    handleButtonPress(value: string) {
        this.props.onChange(value);
        this.setState({ active: value });
    }

    createButtons(buttons: { [id: string]: type_button_info }): JSX.Element[] {
        let res: JSX.Element[] = [];
        for (let id in buttons) {
            let v = buttons[id];
            let contents = null;
            if (v.img) {
                contents = <img style={{ width: v.width, height: v.height }} src={v.img} />
            } else {
                contents = <div style={{ lineHeight: `${v.height}px`, fontSize: 24 }}>{id[0].toUpperCase()}</div>;
            }

            res.push(<button key={id} value={id} className={`${styles["buttonpanel-button"]} ${(this.state.active == id) ? styles.active : ""}`} onClick={(e) => this.handleButtonPress(id)}>
                {v.title ? <h3>{v.title}</h3> : null}
                <div style={{ width: v.width, height: v.height }} className={styles['buttonpanel-snapshot']}>
                    {contents}
                </div>
            </button>);
        }
        return res;
    }

    render() {
        return <div className='buttonpanel'>
            {this.props.title ? <h2>{this.props.title}</h2> : null}
            <div className={styles['buttonpanel-list']}>
                {this.createButtons(this.props.buttons)}
            </div>
        </div>
    }
}