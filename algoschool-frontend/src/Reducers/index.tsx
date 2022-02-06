import { combineReducers } from "redux";
import course from "./course";
import user from "./user";
import submission from "./submission"

export const rootReducer = combineReducers({ course, user, submission });

export type RootState = ReturnType<typeof rootReducer>
