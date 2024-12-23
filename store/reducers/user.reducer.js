
import { userService } from "../../services/user.service.js"

export const SET_USER = 'SET_USER'
export const SET_USER_PREF = 'SET_USER_PREF'
export const INCREMENT_BALANCE = 'INCREMENT_BALANCE'
export const ADD_USER_ACTIVITY = "ADD_USER_ACTIVITY";
export const SET_IS_LOADING = 'SET_IS_LOADING'

const initialState = {
    balance: 1010,
    activities: [
        { txt: "Added a Todo: 'Wash the dishes'", at: Date.now() - 120000 },
        { txt: "Removed the Todo: 'Talk to grandma'", at: Date.now() - 7200000 },
    ],
    isLoading: false,
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
        case SET_IS_LOADING:
            return {
               ...state,
               isLoading: cmd.isLoading
             }
          case SET_USER_PREF:
            return {
                ...state,
                loggedInUser: {
                    ...state.loggedInUser,
                    prefs: { ...state.loggedInUser.prefs, ...cmd.prefs },
                },
            };
      
        case ADD_USER_ACTIVITY:
            const newActivity = {
              txt: cmd.txt,
               at: Date.now(),
             };
         return {
            ...state,
             activities: [newActivity, ...state.activities], // Prepend to keep the latest activity at the top
    };
        default:
            return state
    }
}