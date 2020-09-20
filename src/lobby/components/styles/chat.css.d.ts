declare namespace ChatCssNamespace {
  export interface IChatCss {
    chat: string;
    "chat-input": string;
    "chat-list": string;
  }
}

declare const ChatCssModule: ChatCssNamespace.IChatCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: ChatCssNamespace.IChatCss;
};

export = ChatCssModule;
