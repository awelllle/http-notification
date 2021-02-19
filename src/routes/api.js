const apiBase = '../api';

module.exports = function (app) {
    // API routes
    app.use('/', require(`${apiBase}/index`));
   
};