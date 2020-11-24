import { Injectable } from '@nestjs/common';
import IUser from './user.interface';

@Injectable()
export class UsersService {
    private readonly users: IUser[]

    constructor() {
        this.users = [
            {
                userid: 1,
                username: 'axoque',
                email: 'oeilpourpreburger@gmail.com',
                password: 'aqwzsxed'
            }
        ]
    }

    async findOne(email: string): Promise<IUser | undefined> {
        return this.users.find(user => user.email === email);
    }
}
