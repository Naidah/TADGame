declare namespace LoadoutCssNamespace {
  export interface ILoadoutCss {
    "loadout-username": string;
    lobby: string;
  }
}

declare const LoadoutCssModule: LoadoutCssNamespace.ILoadoutCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: LoadoutCssNamespace.ILoadoutCss;
};

export = LoadoutCssModule;
