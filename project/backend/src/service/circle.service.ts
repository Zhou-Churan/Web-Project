/* eslint-disable prettier/prettier */
/* eslint-disable no-trailing-spaces */
import { Provide } from '@midwayjs/core';
import { InjectRepository } from '@midwayjs/mikro';
import { EntityRepository } from '@mikro-orm/mysql';
import { userModel } from '../model/userModel';
import { circleModel } from '../model/circleModel';

@Provide()
export class CircleService{

    @InjectRepository(userModel)
    private readonly userData: EntityRepository<userModel>

    @InjectRepository(circleModel)
    private readonly circleData: EntityRepository<circleModel>;

    async create(username: string, circlename: string, path='#') {
        const user = await this.userData.findOne({ Username: username })
        console.log(user)
        const nowDate = new Date();
        const circle = new circleModel(circlename, user.user_id, nowDate, path);
        await this.circleData.insert(circle);
    }

    async get_circles() {
        const res = await this.circleData.findAll();
        const promises = res.map(async model => {
            const user = await this.userData.findOne({ user_id: model.creator_id });
            return {
                circle_id: model.circle_id,
                circlename: model.Name,
                creator: user.Username,
                date: model.Date,  
                status: model.Status
            };
        });

        const elements = await Promise.all(promises);  
        return elements;
    }

    async get_my_circles(username: string) {
        const res = await this.circleData.findAll();
        const promises = res.map(async model => {
            const user = await this.userData.findOne({ user_id: model.creator_id });
            if (user.Username === username) {
                return {
                    circle_id: model.circle_id,
                    circlename: model.Name,
                    creator: user.Username,
                    date: model.Date,
                    status: model.Status
                };
            }
        });

        let elements = await Promise.all(promises);
        elements = elements.filter(post => post !== undefined);
        return elements;
    }
}
