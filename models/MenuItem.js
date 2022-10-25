import { DataTypes } from 'sequelize'
import sequelize from '../config/connection.js'

const MenuItem = sequelize.define('MenuItem', 
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false
    },
    img: {
      type: DataTypes.STRING,
      defaultValue: 'https://p.kindpng.com/picc/s/79-798754_hoteles-y-centros-vacacionales-dish-placeholder-hd-png.png'
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'menu_item',
  }
)

export default MenuItem