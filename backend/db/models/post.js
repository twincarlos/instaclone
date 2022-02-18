'use strict';
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    userId: { allowNull: false, type: DataTypes.INTEGER, references: { model: 'Users' } },
    postImageUrl: {allowNull: false, type: DataTypes.STRING },
    caption: DataTypes.STRING
  }, {});
  Post.associate = function(models) {
    // associations can be defined here
    Post.belongsTo(models.User, { foreignKey: 'userId' });
  };
  return Post;
};
