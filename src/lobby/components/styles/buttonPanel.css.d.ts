declare namespace ButtonPanelCssNamespace {
  export interface IButtonPanelCss {
    active: string;
    buttonpanel: string;
    "buttonpanel-button": string;
    "buttonpanel-list": string;
    "buttonpanel-snapshot": string;
  }
}

declare const ButtonPanelCssModule: ButtonPanelCssNamespace.IButtonPanelCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: ButtonPanelCssNamespace.IButtonPanelCss;
};

export = ButtonPanelCssModule;
