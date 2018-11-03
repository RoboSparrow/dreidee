
// http://eslint.org/docs/user-guide/configuring

module.exports = {
    parserOptions: {
        sourceType: 'module'
    },
    env: {
        browser: true,
        node: true,
        mocha: true
    },
    extends: '../.eslintrc.js'
};
