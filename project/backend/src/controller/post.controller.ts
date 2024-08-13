/* eslint-disable prettier/prettier */
/* eslint-disable eol-last */
/* eslint-disable prettier/prettier */
import { Inject, Controller, Post, Body, Provide } from '@midwayjs/core';
import { PostService } from '../service/post.service';

@Provide()
@Controller('/post')

export class PostController {

    @Inject()
    postService: PostService;

    @Post('/send')
    async send(@Body('content') content: string, @Body('username') username: string, @Body('circle_id') circle_id: number) {
        await this.postService.send(content, username, circle_id);
    }
}