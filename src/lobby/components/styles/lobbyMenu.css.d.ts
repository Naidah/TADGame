declare namespace LobbyMenuCssNamespace {
  export interface ILobbyMenuCss {
    lobby: string;
    "lobby-chat": string;
    "lobby-headerbar": string;
    "lobby-leavebutton": string;
    "lobby-main": string;
    "lobby-nameinput": string;
    "lobby-playerlist": string;
    "lobby-settings": string;
  }
}

declare const LobbyMenuCssModule: LobbyMenuCssNamespace.ILobbyMenuCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: LobbyMenuCssNamespace.ILobbyMenuCss;
};

export = LobbyMenuCssModule;
