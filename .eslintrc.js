module.exports = {
    "extends": "airbnb",
    "plugins": [
        "react",
        "jsx-a11y",
        "import"
    ],
    "globals": { "fetch": false, "require": false },
    "rules": {
        "react/jsx-filename-extension": [
          1, {
            "extensions": [".js", ".jsx"]
          }
        ],
        "react/prefer-stateless-function": [
          0, { "ignorePureComponents": true}
        ],
        "react/forbid-prop-types": [
          0
        ],
        "no-console": [
          "error", { allow: ["log", "warn", "error"] }
        ],
        "react/no-array-index-key": [
          0
        ],
        "import/prefer-default-export": [
          0
        ],
        "no-constant-condition": [
          0
        ],
        "max-len": [
          0
        ],
        "no-underscore-dangle": [
          0
        ],
        "no-plusplus": [
          0
        ],
        "class-methods-use-this": [
          0
        ],
        "react/jsx-no-bind": [
          0
        ],
        "array-callback-return": [
          0
        ],
        "no-use-before-define": [
          0
        ],
        "no-param-reassign": [
          0
        ],
        "consistent-return": [
          0
        ],
    }
};
