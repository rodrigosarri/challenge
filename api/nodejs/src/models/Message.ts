import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  IsUUID,
  Default,
  IsEmail,
  Min,
  Max,
  AllowNull,
  CreatedAt,
  UpdatedAt,
  DeletedAt
} from "sequelize-typescript";

import { IMessage } from "./interfaces";

@Table({
  timestamps: true,
  paranoid: true
})

export class Message extends Model {
  @IsUUID(4)
  @Default(DataType.UUIDV4)
  @PrimaryKey
  @Column
  uuid!: string;

  @Min(0)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  id!: number;

  @AllowNull(false)
  @Column
  name!: string;

  @IsEmail
  @AllowNull(false)
  @Column
  email!: string;

  @Min(0)
  @Max(150)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  age!: number;

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;

  @DeletedAt
  @Column
  deletedAt!: Date;
}

export const getUserFieldDescriptions = (field: string): string => {
  const fields: IMessage = {
    name: "Nome",
    email: "Email",
    age: "Idade"
  };

  return fields[field] ? fields[field] : field;
}