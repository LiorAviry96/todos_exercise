
import { userService } from "../../services/user.service.js"

export const SET_USER = 'SET_USER'
export const SET_USER_BALANCE = 'SET_USER_BALANCE'
export const INCREMENT_BALANCE = 'INCREMENT_BALANCE'


const initialState = {
    balance: 1010,
    //activities: [{txt: 'Added a Todo', at: 1523873242735}],
    loggedInUser: userService.getLoggedinUser(),
}

export function userReducer(state = initialState, cmd = {}) {
    switch (cmd.type) {
        case SET_USER:
            return {
                ...state,
                loggedInUser: cmd.user
            }
        case INCREMENT_BALANCE:
                return { ...state, balance: state.balance + 10 }
                
        case SET_USER_BALANCE:
            const loggedInUser = { ...state.loggedInUser, balance: cmd.balance }
            return { ...state, loggedInUser }
        default:
            return state
    }
}