import {Args, Int, Mutation, Parent, Query, ResolveField, Resolver} from "@nestjs/graphql";
import {User} from "../graphql/models/User";
import {mockUsers} from "../__mocks__/mockUsers";
import {UserSetting} from "../graphql/models/UserSetting";
import {mockUserSettings} from "../__mocks__/mockUserSettings";
import {CreateUserInput} from "../graphql/utils/CreateUserInput";
import {Inject} from "@nestjs/common";
import {UserService} from "./UserService";
import {UserSettingService} from "./UserSettingService";

export let incrementalId = 3;

@Resolver(of => User)
export class UserResolver {

    constructor(
        @Inject(UserService) private userService,
        @Inject(UserSettingService) private UserSettingService
    ) {
    }

    @Query((returns) => User,  { nullable: true })
    getUserById(@Args('id', { type: () => Int}) id: number) {
        return this.userService.getUserById(id);
    }

    @Query((returns) => [User])
    async getUsers() {
        return this.userService.getUsers();
    }

    @ResolveField(returns => UserSetting, { name: "settings", nullable: true})
    getUserSettings(@Parent() user: User) {
        return this.UserSettingService.getUserSettingById(user.id)
    }

    @Mutation(returns => User)
    createUser(@Args('createUserData') createUserData: CreateUserInput) {
        return this.userService.createUser(createUserData);
    }
}