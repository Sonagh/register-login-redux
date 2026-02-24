import type {IRegisterUserData} from '../../types.ts';

export const register = (data: IRegisterUserData) => ({type: 'USER_REGISTER', data})

export const login = (data: { usernameOrEmail: string; password: string }) => ({type: 'USER_LOGIN', data})

export const logOut = () => ({type: 'USER_LOGOUT'})