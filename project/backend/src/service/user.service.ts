/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
import { Provide } from '@midwayjs/core';
import { IUserOptions } from '../interface';
import { InjectRepository } from '@midwayjs/mikro';
import { EntityRepository } from '@mikro-orm/mysql';
import { userModel } from '../model/userModel';
import { postModel } from '../model/postModel';

@Provide()
export class UserService {
  async getUser(options: IUserOptions) {
    return {
      uid: options.uid,
      username: 'mockedName',
      phone: '12345678901',
      email: 'xxx.xxx@xxx.com',
    };
  }

  @InjectRepository(userModel)
  private readonly userData: EntityRepository<userModel>

  @InjectRepository(postModel)
  private readonly postData: EntityRepository<postModel>

  async validateUser(username: string, password: string): Promise<boolean | null> {
    const user = await this.userData.findOne({ Username: username, Password: password });
    console.log(user)
    return user !== null ? true : false;
  }

  async signup(username: string, password: string): Promise<void> {
    const user = new userModel(username, password);
    this.userData.insert(user);
  }

  async get_info(username: string) {
    const user = await this.userData.findOne({ Username: username })
    const res = await this.postData.findAll();
    const filteredModels = res.filter(model => model.user_id === user.user_id);
    const count = filteredModels.length;
    await this.userData.nativeUpdate({
      user_id: user.user_id,
    }, {
      Posts: count,
    })
    return {
      username: user.Username,
      job: user.Job,
      school: user.School,
      province: user.Province,
      city: user.City,
      description: user.Description,
      likes: user.Likes,
      posts: user.Posts,
      comments: user.Comments
    }
  }

  async update_info(username: string, province: string, city: string, job: string, school: string, description: string) {
    this.userData.nativeUpdate({
      Username: username
    }, {
      Province: province,
      City: city,
      Job: job,
      School: school,
      Description: description
    })
  }
}
