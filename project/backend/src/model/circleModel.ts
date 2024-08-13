/* eslint-disable prettier/prettier */
import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity({ tableName: 'circles', schema: 'interest_circle' })

export class circleModel {
    @PrimaryKey({ autoincrement: true })
    circle_id: number;

    @Property({ unique: true, length: 255 })
    Name: string;

    @Property({ type: 'date' })
    Date?: Date;

    @Property({ length: 255 })
    Photo_path?: string;

    @Property({ length: 255 })
    Status?: string;

    @Property({type: 'int'})
    creator_id?: number;

    // 构造函数
    constructor(name: string, creatorId: number, date?: Date, photoPath?: string) {
        this.Name = name;
        this.creator_id = creatorId;
        this.Date = date;
        this.Photo_path = photoPath;
        this.Status = 'Active';
    }
}
