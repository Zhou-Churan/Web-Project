/* eslint-disable prettier/prettier */
/* eslint-disable no-trailing-spaces */
import { Provide } from '@midwayjs/core';
import { InjectRepository } from '@midwayjs/mikro';
import { EntityRepository } from '@mikro-orm/mysql';
import { userModel } from '../model/userModel';
import { commentModel } from '../model/commentModel';
import { postModel } from '../model/postModel';

@Provide()
export class CommentService {

    @InjectRepository(userModel)
    private readonly userData: EntityRepository<userModel>

    @InjectRepository(commentModel)
    private readonly commentData: EntityRepository<commentModel>

    @InjectRepository(postModel)
    private readonly postData: EntityRepository<postModel>

    async get_comments(post_id: number) {
        const res = await this.commentData.findAll();
        const filteredModels = res.filter(model => model.post_id === post_id);
        const promises = filteredModels.map(async model => {
            const user = await this.userData.findOne({ user_id: model.user_id })
            const username = user.Username;
            return {
                post_id: model.post_id,
                creator: username,
                user_id: model.user_id,
                date: model.Date,
                content: model.Content,
            };
        });

        const elements = await Promise.all(promises);
        return elements;
    }

    async send(content: string, username: string, post_id: number) {
        const user = await this.userData.findOne({ Username: username });
        this.userData.nativeUpdate({
            user_id: user.user_id
        }, {
            Comments: user.Comments + 1
        })
        const post = await this.postData.findOne({ post_id: post_id });
        this.postData.nativeUpdate({
            post_id: post_id
        }, {
            Comments: post.Comments + 1
        })
        const user_id = user.user_id;
        const model = new commentModel(content, user_id, post_id);
        await this.commentData.insert(model);
    }
}
