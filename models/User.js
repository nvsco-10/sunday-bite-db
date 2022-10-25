import { DataTypes } from 'sequelize'
import sequelize from '../config/connection.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const User = sequelize.define('User,', 
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8],
      },
    },
  },
  {
    hooks: {
      beforeCreate: async (newUserData) => {
        const salt = await bcrypt.genSalt(10)
        newUserData.password = await bcrypt.hash(newUserData.password, salt);
        return newUserData;
      },
      beforeUpdate: async (updatedUserData) => {
        const salt = await bcrypt.genSalt(10)
        updatedUserData.password = await bcrypt.hash(updatedUserData.password, salt);
        return updatedUserData;
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
  }
)

User.prototype.createJWT = function () {
  return jwt.sign({ userId: this.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  })
}

User.prototype.checkPassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password)
}

export default User