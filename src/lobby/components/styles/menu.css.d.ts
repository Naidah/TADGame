declare namespace MenuCssNamespace {
  export interface IMenuCss {
    menu: string;
    "menu-home-loadout": string;
    "menu-home-lobbylist": string;
    "menu-lobby-loadout": string;
    "menu-lobby-lobby": string;
  }
}

declare const MenuCssModule: MenuCssNamespace.IMenuCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: MenuCssNamespace.IMenuCss;
};

export = MenuCssModule;
