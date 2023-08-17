import { store } from './store.js'


import { ADD_ITEM, REMOVE_ITEM, SET_ITEMS, UPDATE_ITEM } from "./item.reducer";


export async function setItems(items) {
    try {
        store.dispatch({ type: SET_ITEMS, items })
    } catch (err) {
        console.error('Cant set items', err)
    }
}

export async function addItem(item) {
    try {
        store.dispatch({ type: ADD_ITEM, item })
    } catch (err) {
        console.error('Cant add item', err)
    }
}

export async function removeItem(item) {
    try {
        store.dispatch({ type: REMOVE_ITEM, item })
    } catch (err) {
        console.error('Cant remove item', err)
    }
}

export async function updateItem(item) {
    console.log('In updateItem')
    try {
        store.dispatch({ type: UPDATE_ITEM, item })
    } catch (err) {
        console.error('Cant update item', err)
    }
}