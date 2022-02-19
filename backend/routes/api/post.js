const express = require('express');
const PostRepository = require('../../db/PostRepository');

const router = express.Router();

router.get('/all/:userId', async (req, res) => {
    const postList = await PostRepository.postsByUserId(req.params.userId);
    return res.json(postList);
});

router.get('/:id', async (req, res) => {
    const post = await PostRepository.postById(req.params.id);
    return res.json(post);
})

router.put('/', async (req, res) => {
    const { id, caption } = req.body;
    const post = await PostRepository.editPost({ id, caption });
    return res.json(post);
});

router.delete('/', async (req, res) => {
    const { id } = req.body;
    const post = await PostRepository.deletePost(id);
    return res.json(post);
});

module.exports = router;
