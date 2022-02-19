const { Post } = require('./models');

async function postsByUserId(userId) {
    return await Post.findAll({ where: { userId } });
}

async function postById(id) {
    return await Post.findByPk(id);
}

async function editPost(data) {
    const { id, caption } = data
    const post = await Post.findByPk(id);
    const editPost = await post.update({ caption });
    return editPost;
}

async function deletePost(id) {
    const post = await Post.findByPk(id);
    await post.destroy();
    return post;
}

module.exports = { postsByUserId, postById, editPost, deletePost };
