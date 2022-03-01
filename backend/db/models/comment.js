'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    postId: { allowNull: false, type: DataTypes.INTEGER },
    userId: { allowNull: false, type: DataTypes.INTEGER },
    comment: { allowNull: false, type: DataTypes.STRING }
  }, {});
  Comment.associate = function(models) {
    // associations can be defined here
  };
  return Comment;
};