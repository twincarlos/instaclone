const { Post, Follow, User, Like } = require('./models');

// async function postsFromFollowings(id) {
//     const followeesId= await Follow.findAll({ attributes: ['followeeId'], where: { followerId: id } });
//     const myFollowees = [];
//     for (let i = 0; i < followeesId.length; i++) {
//         const followee = await User.findByPk(followeesId[i].dataValues.followeeId);
//         myFollowees.push(followee.dataValues);
//     }
//     let allPosts = [];
//     for (let i = 0; i < myFollowees.length; i++) {
//         const posts = await Post.findAll({ where: { userId: myFollowees[i].id } });
//         for (let k = 0; k < posts.length; k++) {
//             const user = await User.findByPk(posts[k].userId);
//             const likes = [];
//             const likesId = await Like.findAll({ where: { postId: posts[k].dataValues.id } });
//             for (let j = 0; j < likesId.length; j++) {
//                 const liker = await User.findByPk(likesId[j].userId);
//                 likes.unshift(liker.dataValues);
//             }
//             allPosts.unshift({ user: user.dataValues, post: posts[k].dataValues, likes });
//         }
//     }
//     return allPosts;
// };

async function postsFromFollowings(id) {
    const followeesId = await Follow.findAll({ attributes: ['followeeId'], where: { followerId: id } });
    const allPosts = [];

    for (let i = 0; i < followeesId.length; i++) {
        const posts = await Post.findAll({ where: { userId: followeesId[i].followeeId } });
        
        for (let k = 0; k < posts.length; k++) {
            const post = await postById(posts[k].id);
            allPosts.unshift(post);
        }
    }
    return allPosts;
}

async function postsByUserId(userId) {
    const allPosts = await Post.findAll({ where: { userId } });
    const userPosts = [];

    for (let i = 0; i < allPosts.length; i++) {
        const post = await postById(allPosts[i].id);
        userPosts.unshift(post);
    }

    return userPosts;
}

async function postById(id) {
    const post = await Post.findByPk(id);
    const user = await User.findByPk(post.userId);
    const likers = await Like.findAll({ where: { postId: id } });
    const likes = [];

    for (let i = 0; i < likers.length; i++) {
        const liker = await User.findByPk(likers[i].userId);
        likes.unshift(liker.dataValues);
    }

    return { post, user, likes };
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
