declare namespace MenuCssNamespace {
  export interface IMenuCss {
    menu: string;
    "menu-loadout": string;
    "menu-lobby": string;
  }
}

declare const MenuCssModule: MenuCssNamespace.IMenuCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: MenuCssNamespace.IMenuCss;
};

export = MenuCssModule;
