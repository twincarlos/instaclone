const { Post, Follow, User } = require('./models');

async function postsFromFollowings(id) {
    const followeesId= await Follow.findAll({ attributes: ['followeeId'], where: { followerId: id } });
    const myFollowees = [];
    for (let i = 0; i < followeesId.length; i++) {
        const followee = await User.findByPk(followeesId[i].dataValues.followeeId);
        myFollowees.push(followee.dataValues);
    }
    let allPosts = [];
    for (let i = 0; i < myFollowees.length; i++) {
        const posts = await Post.findAll({ where: { userId: myFollowees[i].id } });
        for (let k = 0; k < posts.length; k++) {
            const user = await User.findByPk(posts[k].userId);
            allPosts.unshift({ user: user.dataValues, post: posts[k].dataValues });
        }

        // allPosts = [...allPosts, ...posts];
    }
    return allPosts;
};

async function postsByUserId(userId) {
    return await Post.findAll({ where: { userId } });
}

async function postById(id) {
    return await Post.findByPk(id);
}

async function createPost(post) {
    const { userId, postImageUrl, caption } = post;

    const newPost = await Post.create({
        userId,
        postImageUrl,
        caption
    });

    await newPost.save();
    return newPost;
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

module.exports = { postsFromFollowings, postsByUserId, postById, createPost, editPost, deletePost };
