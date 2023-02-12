import { NotFoundException } from '@nestjs/common';
import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { Bet } from './bet.model';
import { BetService } from './bet.service';
import { CreateBetInput } from './dto/create-bet.input';

@Resolver(() => Bet)
export class BetResolver {
  constructor(private betService: BetService) {}

  @Query(() => [Bet])
  async getBetList() {
    return await this.betService.findAll();
  }

  @Query(() => Bet)
  async getBet(@Args('id', { type: () => Number }) id: number) {
    const bet = await this.betService.findOne(id);

    console.log(bet);

    if (!bet) {
      throw new NotFoundException();
    }

    return bet;
  }

  @Mutation(() => Bet)
  async createBet(
    @Args('payload', { type: () => CreateBetInput }) payload: CreateBetInput,
  ): Promise<Bet> {
    return await this.betService.createBet(payload);
  }
}
