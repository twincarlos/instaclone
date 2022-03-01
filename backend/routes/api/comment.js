const express = require('express');
const { User, Comment } = require('../../db/models');

const router = express.Router();

// Comment
router.post('/', async (req, res) => {
    const { postId, userId, comment } = req.body;
    await Comment.create({ postId, userId, comment });
    const user = await User.findByPk(userId);
    return res.json({ user, comment });
});

// Delete Comment
router.delete('/', async (req, res) => {
    const { id } = req.body;
    const comment = await Comment.findByPk(id);
    await comment.destroy();
    return res.json(comment);
});

module.exports = router;