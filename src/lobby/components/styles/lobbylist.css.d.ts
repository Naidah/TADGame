declare namespace LobbylistCssNamespace {
  export interface ILobbylistCss {
    lobbylist: string;
    "lobbylist-controls": string;
    "lobbylist-controls-newlobby": string;
    "lobbylist-controls-refresh": string;
    "lobbylist-list": string;
    "lobbylist-list-controls": string;
    "lobbylist-list-join": string;
  }
}

declare const LobbylistCssModule: LobbylistCssNamespace.ILobbylistCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: LobbylistCssNamespace.ILobbylistCss;
};

export = LobbylistCssModule;
