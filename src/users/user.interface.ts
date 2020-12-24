interface IUser {
    userid: number,
    username: string,
    firstname?: string,
    lastname?: string,
    email: string,
    password?: string,
    phone?: number;
    photo?: string;
}

export default IUser;