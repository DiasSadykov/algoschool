import { LOGIN, LOGOUT, SET_USER_DATA, UNSET_USER_DATA, SET_DARK_MODE } from "../Actions/user";
import firebase from "firebase/app"
import { getDarkModeFromLocalStorage } from "../_api/localStorage";

export interface UserInfo{
    isAdmin: boolean
    completedProblems: Set<string>
}

export interface BlockItem {
    title: string,
    id: string,
    description: string,
    codeSnippet: string
}

export interface Code {
    [key: string]: string;
}

export interface User {
    isLoggedIn: boolean
    isAdmin?: boolean
    user?: firebase.User
    completedProblems: Set<string>
    darkMode: boolean
}

const initialState: User = {
    isLoggedIn: false,
    user: undefined,
    completedProblems: new Set([]),
    darkMode: getDarkModeFromLocalStorage()
};

export default function (state = initialState, action) {
    switch (action.type) {
        case LOGIN: {
            return {
                ...state,
                isLoggedIn: true,
                user: action.payload.user,
            };
        }
        case LOGOUT: {
            return {
                ...state,
                isLoggedIn: false,
                user: undefined,
            };
        }
        case SET_USER_DATA: {
            return {
                ...state,
                isAdmin: action.payload.isAdmin,
                completedProblems: action.payload.completedProblems,
            };
        }
        case UNSET_USER_DATA: {
            return {
                ...initialState
            }
        }
        case SET_DARK_MODE: {
            return {
                ...state,
                darkMode: action.payload.darkMode,
            };
        }
        default:
            return state;
    }
}