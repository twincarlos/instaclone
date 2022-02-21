const express = require('express');
const { Follow, User } = require('../../db/models');

const router = express.Router();

// Followers
router.get('/followers/:followeeId', async (req, res) => {
    const followeeId = req.params.followeeId;
    const followersId = await Follow.findAll({ attributes: ['followerId'], where: { followeeId }});
    const followers = [];
    for (let i = 0; i < followersId.length; i++) {
        const follower = await User.findByPk(followersId[i].dataValues.followerId);
        followers.push(follower.dataValues);
    }
    return res.json(followers);
});

// Their Followings
router.get('/theirFollowings/:followerId', async (req, res) => {
    const followerId = req.params.followerId;
    const followeesId = await Follow.findAll({ attributes: ['followeeId'], where: { followerId } });
    const theirFollowings = [];
    for (let i = 0; i < followeesId.length; i++) {
        const followee = await User.findByPk(followeesId[i].dataValues.followeeId);
        theirFollowings.push(followee.dataValues);
    }
    return res.json(theirFollowings);
});

// My Followings
router.get('/myFollowings/:followerId', async (req, res) => {
    const followerId = req.params.followerId;
    const followeesId = await Follow.findAll({ attributes: ['followeeId'], where: { followerId } });
    const myFollowings = [];
    for (let i = 0; i < followeesId.length; i++) {
        const followee = await User.findByPk(followeesId[i].dataValues.followeeId);
        myFollowings.push(followee.dataValues);
    }
    return res.json(myFollowings);
});

// Follow
router.post('/', async (req, res) => {
    const { followerId, followeeId } = req.body;
    const follow = await Follow.create({
        followerId,
        followeeId
    });
    const follower = await User.findByPk(followerId);
    return res.json(follower);
});

// Unfollow
router.delete('/', async (req, res) => {
    const { followerId, followeeId } = req.body;
    const follow = await Follow.findOne({ where: [{ followerId }, {followeeId}]});
    await follow.destroy();
    const follower = await User.findByPk(followerId);
    return res.json(follower);
})

module.exports = router;
