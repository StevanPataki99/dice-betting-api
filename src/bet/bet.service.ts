import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserService } from 'src/user/user.service';
import { Bet } from './bet.model';
import { CreateBetInput } from './dto/create-bet.input';

@Injectable()
export class BetService {
  constructor(
    @InjectModel(Bet) private betModel: typeof Bet,
    private userService: UserService,
  ) {}

  findAll(): Promise<Bet[]> {
    return this.betModel.findAll();
  }

  findOne(id: number): Promise<Bet> {
    return this.betModel.findOne({
      where: {
        id,
      },
    });
  }

  async create(
    userId: number,
    chance: number,
    betAmount: number,
    payout: number,
    win: boolean,
  ): Promise<Bet> {
    return await this.betModel.create({
      userId: userId,
      chance: chance,
      betAmount: betAmount,
      payout: payout,
      win: win,
    });
  }

  async createBet(payload: CreateBetInput) {
    if (payload.chance > 1 || payload.chance < 0) {
      throw new BadRequestException(
        `Chance must be number between zero and one`,
      );
    }

    const user = await this.userService.findOne(payload.userId);

    if (!user) {
      throw new NotFoundException(`User dosen't exist`);
    }

    if (user.balance < payload.betAmount) {
      throw new BadRequestException(`User dosen't have enough balance`);
    }

    const { payout, win } = this.calculate(payload.chance, payload.betAmount);

    return await this.create(
      payload.userId,
      payload.chance,
      payload.betAmount,
      payout,
      win,
    );
  }

  calculate(chance: number, amount: number): { payout: number; win: boolean } {
    const roll = Math.random();
    const win = roll < chance ? true : false;
    let payout = 0;
    if (win) {
      payout = (1 / chance) * amount;
    }
    return {
      payout,
      win,
    };
  }
}
