import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModule } from 'src/user/user.module';
import { Bet } from './bet.model';
import { BetResolver } from './bet.resolver';
import { BetService } from './bet.service';

@Module({
  imports: [SequelizeModule.forFeature([Bet]), UserModule],
  providers: [BetService, BetResolver],
})
export class BetModule {}
