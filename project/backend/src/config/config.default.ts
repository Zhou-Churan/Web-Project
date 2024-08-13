/* eslint-disable prettier/prettier */
/* eslint-disable no-trailing-spaces */
import { MidwayConfig } from '@midwayjs/core';
import { MySqlDriver } from '@mikro-orm/mysql';
import { userModel } from '../model/userModel';
import { circleModel } from '../model/circleModel';
import { postModel } from '../model/postModel';
import { commentModel } from '../model/commentModel';

export default {
  // use for cookie sign key, should change to your own and keep security
  keys: '1723455120930_4788',
  koa: {
    port: 8080,
  },
  cors: {
    origin: '*',
  },
  mikro: {
    dataSource: {
      default: {
        dbName: 'interest_circle',
        driver: MySqlDriver,
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'zcr9468248726',
        entities: [
          userModel,
          circleModel,
          postModel,
          commentModel
        ]
      },
    },
  },
} as MidwayConfig;
