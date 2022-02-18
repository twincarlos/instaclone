const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const postsRouter = require('./post');

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/posts', postsRouter);

module.exports = router;
