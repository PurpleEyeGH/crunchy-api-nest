import { Injectable } from '@nestjs/common';
import IUser from './user.interface';

@Injectable()
export class UsersService {
    private readonly users: IUser[]

    constructor() {
        this.users = [
            {
                userId: 1,
                username: 'axoque',
                email: 'axel@dsqd.fr',
                password: 'aqwzsxed'
            }
        ]
    }

    async findOne(username: string): Promise<IUser | undefined> {
        return this.users.find(user => user.username === username);
    }
}
