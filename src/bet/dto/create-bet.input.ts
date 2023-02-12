import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateBetInput {
  @Field(() => Number, { nullable: false })
  userId: number;

  @Field(() => Number, { nullable: false })
  betAmount: number;

  @Field(() => Number, { nullable: false })
  chance: number;
}
