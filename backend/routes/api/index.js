const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const postsRouter = require('./post');
const followsRouter = require('./follow');
const likesRouter = require('./like');

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/posts', postsRouter);
router.use('/follows', followsRouter);
router.use('/likes', likesRouter);

module.exports = router;
