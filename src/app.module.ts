import { Module } from '@nestjs/common';
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo'
import { GraphQLModule} from "@nestjs/graphql";
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "./graphql/models/User";
import {UserSetting} from "./graphql/models/UserSetting";
import {UsersModule} from "./users/users.module";

@Module({
  imports: [
      GraphQLModule.forRoot<ApolloDriverConfig>({
        driver: ApolloDriver,
          autoSchemaFile: 'src/schema.gql'
      }),
      TypeOrmModule.forRoot({
          type: "mysql",
          host: "localhost",
          port: 3306,
          username: "mysql",
          password: "password",
          database: "test-db",
          entities: [User, UserSetting],
          synchronize: true,
          logging: true
      }),
      UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
