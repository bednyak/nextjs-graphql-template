import {Module} from "@nestjs/common";
import {UserResolver} from "./UserResolver";
import {UserService} from "./UserService";
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "../graphql/models/User";
import {UserSettingService} from "./UserSettingService";
import {UserSetting} from "../graphql/models/UserSetting";
import {UserSettingsResolver} from "./UserSettingsResolver";

@Module({
    imports: [
        TypeOrmModule.forFeature([User, UserSetting])
    ],
    providers: [UserResolver, UserService, UserSettingService, UserSettingsResolver],
})
export class UsersModule {

}