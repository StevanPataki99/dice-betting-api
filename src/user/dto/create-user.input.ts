import { Field, Float, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field(() => String, { nullable: false })
  name: string;

  @Field(() => Float, { nullable: false })
  balance: number;
}
