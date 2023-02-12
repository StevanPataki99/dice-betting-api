import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Model,
  Table,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from 'src/user/user.model';

@Table
@ObjectType()
export class Bet extends Model {
  @Field(() => Int)
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @Field(() => Number)
  @Column({ type: DataType.FLOAT })
  betAmount: number;

  @Field(() => Number)
  @Column({ type: DataType.FLOAT })
  chance: number;

  @Field(() => Number)
  @Column({ type: DataType.FLOAT })
  payout: number;

  @Field(() => Boolean)
  @Column({ type: DataType.BOOLEAN })
  win: boolean;

  @Field(() => Int)
  @ForeignKey(() => User)
  @Column
  userId: number;

  @BelongsTo(() => User)
  user: User;
}
