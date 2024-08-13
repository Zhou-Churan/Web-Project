/* eslint-disable prettier/prettier */
import { Inject, Controller, Post, Body, Provide, Get } from '@midwayjs/core';
import { CircleService } from '../service/circle.service';
import { PostService } from '../service/post.service';

@Provide()
@Controller('/circle')

export class CircleController {
    @Inject()
    circleService: CircleService;

    @Inject()
    postService: PostService;

    @Post('/create')
    async create(@Body('username') username: string, @Body('circlename') circlename: string, @Body('path') path: string) {
        await this.circleService.create(username, circlename);
    }

    @Get('/get_circles')
    async get_circles() {
        const res = await this.circleService.get_circles();
        return res
    }

    @Post('/get_my_circles')
    async get_my_circles(@Body('username') username: string) {
        const res = await this.circleService.get_my_circles(username);
        return res;
    }

    @Post('/get_posts')
    async get_posts(@Body('circle_id') circle_id: number) {
        const res = await this.postService.get_posts(circle_id);
        return res;
    }
}
