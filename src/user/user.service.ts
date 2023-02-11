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
}
