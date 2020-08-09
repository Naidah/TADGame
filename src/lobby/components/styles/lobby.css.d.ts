declare namespace LobbyCssNamespace {
  export interface ILobbyCss {
    lobby: string;
    "lobby-chat": string;
    "lobby-main": string;
    "lobby-playerlist": string;
    "lobby-settings": string;
  }
}

declare const LobbyCssModule: LobbyCssNamespace.ILobbyCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: LobbyCssNamespace.ILobbyCss;
};

export = LobbyCssModule;
