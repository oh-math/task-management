import { Body, Controller, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto, UserResponse } from "./dtos";

@Controller('api/user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    public async create(@Body() input: CreateUserDto): Promise<UserResponse> {
        return await this.userService.create(input)
    }
}