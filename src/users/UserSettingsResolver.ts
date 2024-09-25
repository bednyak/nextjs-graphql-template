import {Args, Mutation, Resolver} from "@nestjs/graphql";
import {UserSetting} from "../graphql/models/UserSetting";
import {CreateUserSettingsInput} from "../graphql/utils/CreateUserSettingsInput";
import {mockUserSettings} from "../__mocks__/mockUserSettings";
import {Inject} from "@nestjs/common";
import {UserSettingService} from "./UserSettingService";

@Resolver()
export class UserSettingsResolver {

    constructor(@Inject(UserSettingService) private userSettingsService: UserSettingService) {
    }

    @Mutation(returns => UserSetting)
    async createUserSettings(
        @Args('createUserSettingsData') createUserSettingsData: CreateUserSettingsInput) {
        const userSetting = await this.userSettingsService.createUserSettings(
            createUserSettingsData,
        )
        return userSetting;
    }
}