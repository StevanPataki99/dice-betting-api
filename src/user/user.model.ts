import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table
@ObjectType()
export class User extends Model {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  @Column({ type: DataType.CHAR })
  name: string;

  @Field(() => Number)
  @Column({ type: DataType.FLOAT })
  balance: number;
}
