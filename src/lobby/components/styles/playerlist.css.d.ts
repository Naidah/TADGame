declare namespace PlayerlistCssNamespace {
  export interface IPlayerlistCss {
    playerlist: string;
    "playerlist-list": string;
    "playerlist-list-readydisp": string;
  }
}

declare const PlayerlistCssModule: PlayerlistCssNamespace.IPlayerlistCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: PlayerlistCssNamespace.IPlayerlistCss;
};

export = PlayerlistCssModule;
