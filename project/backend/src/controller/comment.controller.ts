/* eslint-disable prettier/prettier */
/* eslint-disable eol-last */
/* eslint-disable prettier/prettier */
import { Inject, Controller, Post, Body, Provide } from '@midwayjs/core';
import { CommentService } from '../service/comment.service';

@Provide()
@Controller('/comment')

export class CircleController {

    @Inject()
    commentService: CommentService;

    @Post('/get_comments')
    async get_comments(@Body('post_id') post_id: number) {
        const res = await this.commentService.get_comments(post_id);
        return res;
    }

    @Post('/send')
    async send(@Body('content') content: string, @Body('username') username: string, @Body('post_id') post_id: number) {
        await this.commentService.send(content, username, post_id);
    }

}