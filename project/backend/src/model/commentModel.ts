/* eslint-disable prettier/prettier */
import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity({ tableName: 'comments', schema: 'interest_circle' })

export class commentModel {
    @PrimaryKey({ autoincrement: true })
    comment_id: number;

    @Property({ type: 'text' })
    Content?: string;

    @Property({ type: 'date' })
    Date?: Date;

    @Property()
    uesr_id?: number;

    @Property()
    post_id?: number;

    // 构造函数
    constructor(content?: string, date?: Date) {
        this.Content = content;
        this.Date = date;
    }
}
