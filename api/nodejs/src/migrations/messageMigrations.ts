import { DataTypes } from "sequelize";

import { sequelize } from "../models";
const queryInterface = sequelize.getQueryInterface();

export const up = async () => {
  await queryInterface.createTable("Messages", {
    uuid: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    deletedAt: DataTypes.DATE
  });
}

export const down = async () => {
  await queryInterface.dropTable("Messages");
}