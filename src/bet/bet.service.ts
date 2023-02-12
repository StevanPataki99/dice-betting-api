import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Bet } from './bet.model';
import { CreateBetInput } from './dto/create-bet.input';

@Injectable()
export class BetService {
  constructor(@InjectModel(Bet) private betModel: typeof Bet) {}

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

  async create(payload: CreateBetInput): Promise<Bet> {
    return await this.betModel.create({
      userId: payload.userId,
      chance: payload.chance,
      betAmount: payload.betAmount,
      payout: 0,
      win: true,
    });
  }
}
