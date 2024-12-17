import { userService } from "../../services/user.service.js"
import { SET_USER, SET_USER_PREF } from "../reducers/user.reducer.js"
import { store } from "../store.js"


export function login(credentials) {
    return userService.login(credentials)
        .then(user => {
            store.dispatch({ type: SET_USER, user })
        })
        .catch(err => {
            console.log('user actions -> Cannot login', err)
            throw err
        })
}

export function signup(credentials) {
    return userService.signup(credentials)
        .then(user => {
            store.dispatch({ type: SET_USER, user })
        })
        .catch(err => {
            console.log('user actions -> Cannot signup', err)
            throw err
        })
}

export function logout() {
    return userService.logout()
        .then(() => {
            store.dispatch({ type: SET_USER, user: null })
        })
        .catch((err) => {
            console.log('user actions -> Cannot logout', err)
            throw err
        })
}

export function saveUserPrefs(userId, prefs) {
    return userService.saveUserPrefs(userId, prefs)
        .then((updatedUser) => {
            store.dispatch({ type: SET_USER_PREF, prefs: updatedUser.prefs });
            store.dispatch({ type: ADD_USER_ACTIVITY, txt });
        })
        .catch((err) => {
            console.log('user actions -> Cannot save preferences', err);
            throw err;
        });
}
export function addUserActivity(txt) {
    return store.dispatch({ type: ADD_USER_ACTIVITY, txt });

}