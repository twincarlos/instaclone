const express = require('express');
const PostRepository = require('../../db/PostRepository');

const router = express.Router();

router.get('/all/:userId', async (req, res) => {
    const postList = await PostRepository.postsByUserId(req.params.userId);
    return res.json(postList);
});

module.exports = router;
