module.exports = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define('BlogPosts', {
    title: { type: DataTypes.STRING },
    content: { type: DataTypes.STRING },
    userId: { type: DataTypes.INTEGER },
    published: { type: DataTypes.DATE },
    updated: { type: DataTypes.DATE },
  }, { timestamps: false });

  BlogPost.associate = (model) => {
    BlogPost.belongsTo(model.User, { as: 'user', foreignKey: 'userId' });
  };

  return BlogPost;
};