
const authRouter = require('./auth.routes');

function route(app){

    // auth routes
    app.use('/api/auth', authRouter);
}

module.exports = route;
