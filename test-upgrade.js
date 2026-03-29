const { parse } = require('url');
const url = parse('/_next/webpack-hmr', true);
console.log(url.pathname);
