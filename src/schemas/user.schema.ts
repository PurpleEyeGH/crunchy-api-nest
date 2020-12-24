import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import IUser from 'src/users/user.interface';

//export type UserDocument = 

@Schema()
export class User implements IUser {
    @Prop()
    userid: number;

    @Prop({ required: true })
    username: string;

    @Prop({ required: true })
    email: string;

    @Prop()
    password: string;

    @Prop()
    phone?: number
}

export const UserSchema = SchemaFactory.createForClass(User);