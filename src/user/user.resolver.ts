import { NotFoundException } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './user.model';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => [User])
  async getUserList() {
    return await this.userService.findAll();
  }

  @Query(() => User)
  async getUser(@Args('id', { type: () => Number }) id: number) {
    const user = await this.userService.findOne(id);

    console.log(user);

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  @Mutation(() => User)
  async createUser(
    @Args('payload', { type: () => CreateUserInput }) payload: CreateUserInput,
  ) {
    return await this.userService.create(payload);
  }
}
