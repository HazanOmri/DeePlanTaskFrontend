// import { userService } from '../service/user.service.js'

export const SET_ITEMS = 'SET_ITEMS'
export const ADD_ITEM = 'ADD_ITEM'
export const REMOVE_ITEM = 'REMOVE_ITEM'
export const UPDATE_ITEM = 'UPDATE_ITEM'

const initialState = {
    items: []
}


export function itemReducer(state = initialState, action) {
    let items = [...state.items]
    switch (action.type) {
        case SET_ITEMS:
            return { ...state, items: action.items }
        case ADD_ITEM:
            items.push({ ...action.item, num: items.length + 1 })
            return { ...state, items }
        case REMOVE_ITEM:
            items = items.filter(item => item._id !== action.item._id)
            return { ...state, items }
        case UPDATE_ITEM:
            const itemIndex = items.findIndex(item => item._id === action.item._id)
            items[itemIndex] = action.item
            return { ...state, items }
        default:
            return state
    }
}

