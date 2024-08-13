/* eslint-disable prettier/prettier */
import { Inject, Controller, Post, Body, Provide } from '@midwayjs/core';
import { UserService } from '../service/user.service';

@Provide()
@Controller('/user')
export class APIController {
    @Inject()
    userService: UserService;

    @Post('/login')
    async login(@Body('username') username: string, @Body('password') password: string) {
        const isValid = await this.userService.validateUser(username, password);
        console.log(isValid)
        if (isValid) {
            return true;
        } else {
            return false;
        }
    }

    @Post('/signup')
    async signup(@Body('username') username: string, @Body('password') password: string) {
        try {
            await this.userService.signup(username, password);
            return true;
        } catch (error) {
            return false;
        }
    }

    @Post('/get_info')
    async get_info(@Body('username') username: string) {
        try {
            const user = this.userService.get_info(username);
            return user;
        } catch (error) {
            console.log(error);
        }
    }

    @Post('/edit')
    async edit(@Body('username') username: string, @Body('province') province: string, @Body('city') city: string, @Body('job') job: string, @Body('school') school: string, @Body('description') description: string) {
        await this.userService.update_info(username, province, city, job, school, description);
    }
}
