import { RootState } from "../Reducers";

export const getLoggedInAndUser = (state: RootState) => [state.user.isLoggedIn, state.user.user]
export const getCompletedProblems = (state: RootState) => state.user.completedProblems
export const getIsAdmin = (state: RootState) => state.user.isAdmin
export const getDarkMode = (state: RootState) => state.user.darkMode