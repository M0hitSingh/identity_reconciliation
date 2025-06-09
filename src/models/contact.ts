import { Sequelize, DataTypes } from 'sequelize';

const Contacts = {
  phoneNumber: {
    type: DataTypes.BIGINT,
    allowNull: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  linkedId: {
    type: DataTypes.STRING,
    allowNull: true
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