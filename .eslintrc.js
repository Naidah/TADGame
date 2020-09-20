// eslint-disable-next-line no-undef
module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended",
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true,
        },
        "ecmaVersion": 12,
        "sourceType": "module",
    },
    "plugins": [
        "react",
        "@typescript-eslint",
    ],
    "rules": {
        "array-callback-return": "error",
        "arrow-body-style": "error",
        "arrow-parens": "error",
        "arrow-spacing": "error",
        "block-spacing": "error",
        "brace-style": "error",
        "comma-dangle": ["error", {
            "arrays": "always-multiline",
            "objects": "always-multiline",
            "imports": "always-multiline",
            "exports": "always-multiline",
            "functions": "never",
        }],
        "comma-spacing": "error",
        "computed-property-spacing": "error",
        "curly": "error",
        "dot-location": ["error", "property"],
        "dot-notation": "error",
        "eol-last": "error",
        "eqeqeq": "error",
        "func-call-spacing": "error",
        "func-style": ["error", "declaration"],
        "grouped-accessor-pairs": "error",
        "indent": "error",
        "jsx-quotes": "error",
        "max-depth": "error",
        "max-len": ["error", {"code": 96}],
        "new-cap": "error",
        "new-parens": "error",
        "newline-per-chained-call": "error",
        "no-console": "warn",
        "no-constructor-return": "error",
        "no-duplicate-imports": "error",
        "no-else-return": "error",
        "no-extra-bind": "error",
        "no-extra-parens": "error",
        "no-magic-numbers": ["warn", { "ignore": [0, 1] }],
        "no-multiple-empty-lines": "error",
        "no-tabs": "error",
        "no-var": "error",
        "one-var-declaration-per-line": "error",
        "prefer-arrow-callback": "error",
        "sort-imports": "error",
        "yoda": "error",
    },
};