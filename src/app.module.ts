import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { load } from './config/configuration';
import { UserModule } from './user/user.module';
import databaseConfig from './config/database.config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { BetModule } from './bet/bet.module';
import appConfig from './config/app.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load,
    }),
    SequelizeModule.forRoot({
      ...databaseConfig,
      dialect: 'postgres',
      autoLoadModels: appConfig.isDevEnv,
      synchronize: appConfig.isDevEnv,
    }),
    UserModule,
    BetModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      debug: appConfig.isDevEnv,
      playground: appConfig.isDevEnv,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
