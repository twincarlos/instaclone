const { Post } = require('./models');

async function postsByUserId(userId) {
    return await Post.findAll({ where: { userId } });
}

module.exports = { postsByUserId };
