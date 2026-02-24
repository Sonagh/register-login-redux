export interface IUser {
    username: string;
    email: string;
    password?: string;
    token?: string;
}

export interface IUseState {
    currentUser: IUser | null;
    token: string;
    isAuthenticated: boolean;
    users: IUser[];
}

export interface IRegisterUserData extends IUser {
    token: string;
}

export type UserAction = 
    | { type: 'USER_REGISTER'; data: IRegisterUserData }
    | { type: 'USER_LOGIN'; data: { usernameOrEmail: string; password: string } }
    | { type: 'USER_LOGOUT' };