/* eslint-disable prettier/prettier */
import { Entity, PrimaryKey, Property } from '@mikro-orm/core';


@Entity({ tableName: 'posts', schema: 'interest_circle' })

export class postModel {
    @PrimaryKey({ autoincrement: true })
    post_id: number;

    @Property({ type: 'text' })
    Content?: string;

    @Property({ type: 'date' })
    Date?: Date;

    @Property()
    user_id?: number;

    @Property()
    circle_id?: number;

    @Property()
    Likes?: number;

    @Property()
    Comments?: number;

    // 构造函数
    constructor(content: string, user_id: number, circle_id: number) {
        this.Content = content;
        this.Date = new Date();
        this.user_id = user_id;
        this.circle_id = circle_id;
        this.Likes = 0;
        this.Comments = 0;
    }
}
