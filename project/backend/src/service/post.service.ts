/* eslint-disable prettier/prettier */
/* eslint-disable no-trailing-spaces */
import { Provide } from '@midwayjs/core';
import { InjectRepository } from '@midwayjs/mikro';
import { EntityRepository } from '@mikro-orm/mysql';
import { userModel } from '../model/userModel';
import { postModel } from '../model/postModel';

@Provide()
export class PostService {

    @InjectRepository(userModel)
    private readonly userData: EntityRepository<userModel>

    @InjectRepository(postModel)
    private readonly postData: EntityRepository<postModel>;

    async get_posts(circle_id: number) {
        const res = await this.postData.findAll();
        const filteredModels = res.filter(model => model.circle_id === circle_id);
        const promises = filteredModels.map(async model => {
            const id = model.circle_id
            if (id === circle_id) {
                const user = await this.userData.findOne({ user_id: model.user_id })
                const username = user.Username;
                return {
                    circle_id: model.circle_id,
                    post_id: model.post_id,
                    creator: username,
                    user_id: model.user_id,
                    date: model.Date,
                    content: model.Content,
                    likes: model.Likes,
                    comments: model.Comments
                };
            }
        });

        const elements = await Promise.all(promises);
        return elements;
    }

    async send(content: string, username: string, circle_id: number) {
        const user = await this.userData.findOne({ Username: username });
        const user_id = user.user_id;
        const model = new postModel(content, user_id, circle_id);
        await this.postData.insert(model);
    }
}
