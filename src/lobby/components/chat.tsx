import * as React from 'react';
import * as styles from './styles/chat.css';

export class Chat extends React.Component<{}, { messages: string[] }> {
    private _textInput: HTMLInputElement;
    constructor(props) {
        super(props);
        this.state = { messages: [] };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this._textInput = this.refs.input as HTMLInputElement;
    }

    handleSubmit(event) {
        const msg = this._textInput.value;
        this.setState((state) => {
            const newMsgs = state.messages.concat(msg);

            return {
                messages: newMsgs,
            };
        })
        this._textInput.value = "";
        event.preventDefault();
    }

    render() {
        return <div id="chat" className={styles.chat}>
            <ul className={styles["chat-list"]}>
                {[...this.state.messages].reverse().map((msg, i) => <li key={i}>{msg}</li>)}
            </ul>
            <form onSubmit={this.handleSubmit} className={styles["chat-input"]}>
                <input ref="input" type="text" placeholder="Message:"></input>
            </form>
        </div>
    }
}
