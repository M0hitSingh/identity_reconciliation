import { Sequelize, DataTypes } from 'sequelize';

const Contacts = {
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  linkedId: {
    type: DataTypes.STRING,
    allowNull: false
  },
  linkPrecedence: {
    type: DataTypes.STRING,
    allowNull: false
  },
  createdAt : {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  updatedAt : {
    type: DataTypes.DATE,
    allowNull: true
  },    
  deletedAt : {
    type: DataTypes.DATE,
    allowNull: true
  },

};

export {
  Contacts
}