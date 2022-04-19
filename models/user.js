module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    displayName: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    image: {
      type: DataTypes.STRING,
    },
  }, { timestamps: false });

  User.associate = (model) => {
    User.hasMany(model.BlogPosts, { as: 'post', foreignKey: 'userId' });
  };

  return User;
};