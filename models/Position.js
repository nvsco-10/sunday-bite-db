import { DataTypes } from 'sequelize'
import sequelize from '../config/connection.js'

const Position = sequelize.define('Position,',
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    positionType: {
      type: DataTypes.STRING,
      defaultValue: 'full-time'
    },
    location: {
      type: DataTypes.STRING,
      defaultValue: 'on-site'
    },
    locationAddress: {
      type: DataTypes.STRING,
      defaultValue: 'dallas, tx'
    },
    datePosted: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      get() {
        const date = new Date(this.dataValues.datePosted);
          return date.toLocaleString('en-US', {
            year: "numeric",
            month: "2-digit",
            day: "2-digit"
          })
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: false,
    modelName: 'position',
  }
)

export default Position