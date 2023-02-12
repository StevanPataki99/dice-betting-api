import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Bet } from 'src/bet/bet.model';

@Table
@ObjectType()
export class User extends Model {
  @Field(() => Int)
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @Field(() => String)
  @Column
  name: string;

  @Field(() => Number)
  @Column({ type: DataType.FLOAT })
  balance: number;

  @HasMany(() => Bet)
  bets: Bet[];
}
