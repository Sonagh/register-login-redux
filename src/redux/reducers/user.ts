import type { IUseState, UserAction, IUser } from '../../types.ts';
import {generateToken} from "../../utils/tokenGenerator.ts";

const loadUsersFromStorage = (): IUser[] => {
    try {
        const usersStr = localStorage.getItem('users');
        return usersStr ? JSON.parse(usersStr) : [];
    } catch (error) {
        console.log('Failed to load users from localStorage: ' + error);
        return [];
    }
};

const loadTokenFromStorage = (): string => {
    try {
        return localStorage.getItem('token') || '';
    } catch (error) {
        console.log('Failed to load token from localStorage: ' + error);
        return '';
    }
};

const initializeState = (): IUseState => {
    const token = loadTokenFromStorage();
    const users = loadUsersFromStorage();
    
    let currentUser: IUser | null = null;
    let isAuthenticated = false;
    
    if (token && users.length > 0) {
        currentUser = users.find((u: IUser) => u.token === token) || null;
        isAuthenticated = !!currentUser;
    }
    
    return {
        currentUser,
        token,
        isAuthenticated,
        users,
    };
};

const initialState: IUseState = initializeState();

export default (state = initialState, action: UserAction) => {
    switch (action.type) {
        case 'USER_REGISTER': {
            const newUser: IUser = {
                username: action.data.username,
                email: action.data.email,
                token: action.data.token,
            };

            const updatedUsers = [...state.users, newUser];

            try {
                localStorage.setItem('token', action.data.token);
                localStorage.setItem('users', JSON.stringify(updatedUsers));
            } catch (error) {
                console.log('Failed to save to localStorage: ' + error)
            }

            return {
                ...state,
                token: action.data.token,
                users: updatedUsers,
            }
        }
        case 'USER_LOGIN': {
            const { usernameOrEmail, password } = action.data;

            const usersFromStorage = loadUsersFromStorage();

            const user = usersFromStorage.find(
                (u: IUser) => u.username === usernameOrEmail || u.email === usernameOrEmail
            );

            if (!user || !user.token) {
                return state;
            }

            const userToken = generateToken(user.username, password);

            if (userToken === user.token) {
                try {
                    localStorage.setItem('token', user.token);
                } catch (error) {
                    console.log('Failed to save token to localStorage: ' + error);
                }

                return {
                    ...state,
                    currentUser: user,
                    token: user.token,
                    isAuthenticated: true,
                }
            }

            return state;
        }
        case 'USER_LOGOUT': {
            try {
                localStorage.removeItem('token');
            } catch (error) {
                console.log('Failed to remove token from localStorage: ' + error)
            }

            return {
                ...state,
                token: '',
                currentUser: null,
                isAuthenticated: false,
            }
        }
        default:
            return state;
    }
}
