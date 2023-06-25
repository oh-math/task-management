import { Controller, Post } from "@nestjs/common";
import { AppService } from "./app.service";

@Controller('api')
export class AppController {
    constructor(private readonly appService: AppService) {

    }

    @Post()
    public async Test() {
        await this.appService.GetInfo()
    }
}