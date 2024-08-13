/* eslint-disable prettier/prettier */
import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity({ tableName: 'users', schema: 'interest_circle' })

export class userModel {
    @PrimaryKey({ autoincrement: true })
    user_id: number;

    @Property({ length: 255 })
    Username: string;

    @Property({ length: 255 })
    Password: string;

    @Property({ type: 'int' })
    Likes?: number;

    @Property({ type: 'int' })
    Posts?: number;

    @Property({ type: 'int' })
    Comments?: number;

    @Property({ type: 'text' })
    Description?: string;

    @Property({ length: 255 })
    Province?: string;

    @Property({ length: 255 })
    City: string;

    @Property({ length: 255 })
    Job: string;

    @Property({ length: 255 })
    School: string;

    // 构造函数（初始化或设置默认值）
    constructor(username: string, password: string) {
        this.Username = username;
        this.Password = password;
        this.City = '暂无';
        this.Job = '暂无';
        this.School = '暂无';
        this.Likes = 0;
        this.Posts = 0;
        this.Comments = 0;
        this.Description = '这个人很懒，什么都没有写。';
        this.Province = '暂无';
    }
}
