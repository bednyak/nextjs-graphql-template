import {Field, InputType} from "@nestjs/graphql";

@InputType()
export class CreateUserInput {

    @Field()
    username: string;

    @Field({ nullable: true })
    displayName?: string
}