const express = require('express');
const { User, Like } = require('../../db/models');

const router = express.Router();

// Get likes from post
// router.get('/:postId', async (req, res) => {
//     const postId = req.params.postId;
//     const likes = await Like.findAll({ attributes: ['userId'], where: { postId } });
//     const allLikes = [];
//     for (let i = 0; i < likes.length; i++) {
//         const user = await User.findByPk(likes[i].userId);
//         allLikes.unshift(user.dataValues);
//     }
//     return res.json(allLikes);
// });

// Like
router.post('/', async (req, res) => {
    const { postId, userId } = req.body;
    const like = await Like.create({ postId, userId });
    const user = await User.findByPk(userId);
    return res.json({ user, like });
});

// Dislike
router.delete('/', async (req, res) => {
    const { postId, userId } = req.body;
    const like = await Like.findOne({ where: [{ postId }, {userId}]});
    await like.destroy();
    const user = await User.findByPk(userId);
    return res.json({ user, like });
});

module.exports = router;
