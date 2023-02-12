import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './user.model';

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private userModel: typeof User) {}

  findAll(): Promise<User[]> {
    return this.userModel.findAll();
  }

  findOne(id: number): Promise<User> {
    return this.userModel.findOne({
      where: {
        id,
      },
    });
  }

  async create(payload: CreateUserInput): Promise<User> {
    return await this.userModel.create({
      name: payload.name,
      balance: payload.balance,
    });
  }

  async removeBalance(id: number, amount: number) {
    const user = await this.findOne(id);

    const newBalance = user.balance - amount;
    await this.updateBalance(id, newBalance);
  }

  async addBalance(id: number, amount: number) {
    const user = await this.findOne(id);

    const newBalance = user.balance + amount;
    await this.updateBalance(id, newBalance);
  }

  async updateBalance(id: number, balance: number) {
    await this.userModel.update(
      {
        balance,
      },
      {
        where: {
          id,
        },
      },
    );
  }
}
