import user, { UserInfo } from "../Reducers/user";
import { getUserData, setToken } from "../_api/backend";
import { setDarkModeToLocalStorage } from "../_api/localStorage";

export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const SET_USER_DATA = "SET_USER_DATA"
export const UNSET_USER_DATA = "UNSET_USER_DATA"
export const SET_DARK_MODE = "SET_DARK_MODE"

export const _login = user => ({
    type: LOGIN,
    payload: {
        user: user,
    }
})

export const login = user => async (dispatch, getState) => {
    dispatch(_login(user))
    let token = await user.getIdToken()
    setToken(token)
    dispatch(fetchUserData())
}

export const _logout = () => ({
    type: LOGOUT,
    payload: {}
})

export const logout = () => async (dispatch, getState) => {
    dispatch(_logout())
    setToken("")
    dispatch(unsetUserData())
}

export const _setDarkMode = (darkMode: boolean) => ({
    type: SET_DARK_MODE,
    payload: {
        darkMode: darkMode
    }
})

export const setDarkMode = darkMode => (dispatch, getState) => {
    dispatch(_setDarkMode(darkMode))
    if (darkMode){
        document.documentElement.classList.add('dark')
    } else {
        document.documentElement.classList.remove('dark')
    }
    setDarkModeToLocalStorage(darkMode)
}

export const setUserData = (userInfo: UserInfo) => ({
    type: SET_USER_DATA,
    payload: {
        isAdmin: userInfo.isAdmin,
        completedProblems: userInfo.completedProblems
    }
})

export const unsetUserData = () => ({
    type: UNSET_USER_DATA,
})

export const fetchUserData = () => async (dispatch, getState) => {
    getUserData().then(userDataRaw => {
        const userData = userDataRaw.data
        console.log(userData)
        dispatch(setUserData({
            isAdmin: userData.is_admin,
            completedProblems: userData.completed_problems
        }))
    })
}