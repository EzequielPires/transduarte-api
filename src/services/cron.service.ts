import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class TasksService {
    constructor(private readonly api: HttpService) { }


    @Cron(CronExpression.EVERY_10_SECONDS)
    async handleCron() {
        try {
            this.api.get(__dirname).subscribe();
        } catch (error) {
            console.log(error.message);
        }
    }
}