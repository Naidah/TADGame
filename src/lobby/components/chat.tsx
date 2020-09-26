import * as React from 'react';
import styles from './styles/chat.css';

type Props = Record<string, unknown>;
interface State {
    messages: string[]
}

export class Chat extends React.Component<Props, State> {
    private _textInput: HTMLInputElement;
    inputRef: React.RefObject<HTMLInputElement>;
    constructor(props: Props) {
        super(props);
        this.state = { messages: [] };
        this.inputRef = React.createRef();

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event: React.ChangeEvent<HTMLFormElement>): void {
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

    render(): JSX.Element {
        return <div id="chat" className={styles.chat}>
            <ul className={styles["chat-list"]}>
                {[...this.state.messages].reverse().map((msg, i) => <li key={i}>{msg}</li>)}
            </ul>
            <form onSubmit={this.handleSubmit} className={styles["chat-input"]}>
                <input ref={this.inputRef} type="text" placeholder="Message:"></input>
            </form>
        </div>
    }
}
