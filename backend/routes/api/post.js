const express = require('express');
const { singlePrivateFileUpload, singlePublicFileUpload, singleMulterUpload } = require('../../awsS3');
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

router.post('/', singleMulterUpload('postImageUrl'), async (req, res) => {
    const { userId, caption } = req.body;
    const postImageUrl = await singlePublicFileUpload(req.file);
    const newPost = await PostRepository.createPost({ userId, postImageUrl, caption });
    return res.json(newPost);
});

router.delete('/', async (req, res) => {
    const { id } = req.body;
    const post = await PostRepository.deletePost(id);
    return res.json(post);
});

module.exports = router;
