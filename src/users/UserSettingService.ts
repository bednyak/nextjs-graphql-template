import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {UserSetting} from "../graphql/models/UserSetting";
import {Repository} from "typeorm";
import {CreateUserSettingsInput} from "../graphql/utils/CreateUserSettingsInput";
import {User} from "../graphql/models/User";

@Injectable()
export class UserSettingService {
    constructor(
        @InjectRepository(UserSetting) private userSettingsRepository: Repository<UserSetting>,
        @InjectRepository(User) private userRepository: Repository<User>

    ) {
    }

    getUserSettingById(userId: number) {
        return this.userSettingsRepository.findOneBy({ userId })
    }

    async createUserSettings(createUserSettingsData: CreateUserSettingsInput) {

        const findUser = await this.userRepository.findOneBy({
            id: createUserSettingsData.userId
        })

        if (!findUser) throw new Error("User not found");

        const newUserSetting = this.userSettingsRepository.create(createUserSettingsData);
        const savedSettings = await this.userSettingsRepository.save(newUserSetting);

        findUser.settings = savedSettings;
        await this.userRepository.save(findUser);

        return savedSettings;
    }
}