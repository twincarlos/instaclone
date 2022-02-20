const express = require('express');
const { Follow } = require('../../db/models');

const router = express.Router();

// Follow
router.post('/', async (req, res) => {
    const { followerId, followeeId } = req.body;
    const follow = await Follow.create({
        followerId,
        followeeId
    });
    return res.json(follow);
});

// Unfollow
router.delete('/', async (req, res) => {
    const { followerId, followeeId } = req.body;
    const follow = await Follow.findOne({ where: [{ followerId }, {followeeId}]});
    await follow.destroy();
    return res.json(follow);
})

module.exports = router;
