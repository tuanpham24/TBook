
const authRouter = require('./auth.routes');
const postRouter = require('./post.routes');
const uploadRouter = require('./upload.routes');

function route(app){

    // auth routes
    app.use('/api/auth', authRouter);

    // post routes
    app.use('/api/post', postRouter);

    app.use('/api/upload', uploadRouter);
}

module.exports = route;
