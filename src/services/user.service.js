import { httpService } from './http.service'

const AUTH_URL = 'auth/'
const USER_URL = 'user/'
const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'

export const userService = {
    login,
    logout,
    signup,
    getLoggedinUser,
    saveLocalUser,
    getById,
    getUsers,
    update,
    getEmptyCredentials,
    updateLikeSong,
    updateLikeStation
}

window.userService = userService

async function getById(userId) {
    return httpService.get(USER_URL + userId)
}

async function getUsers() {
    return httpService.get(USER_URL)
}

async function login(userCred) {
    const user = await httpService.post(AUTH_URL + 'login', userCred)
    return saveLocalUser(user)
}

async function signup(userCred) {
    userCred.likedSongs = []
    userCred.likedStations = []
    const user = await httpService.post(AUTH_URL + 'signup', userCred)
    return saveLocalUser(user)
}

async function logout() {
    await httpService.post(AUTH_URL + 'logout')
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
}

async function update(user) {
    const newUser = await httpService.put(USER_URL + '/' + user._id, user)
    if (getLoggedinUser()._id === user._id) saveLocalUser(newUser)
    return newUser
}

function saveLocalUser(user) {
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}

function getEmptyCredentials() {
    return {
        fullname: '',
        email: '',
        username: '',
        password: '',
    }
}

async function updateLikeSong(song) {
    const user = getLoggedinUser()
    const isAdd = !user.likedSongs.find(({ id }) => id === song.id)
    if (isAdd) user.likedSongs.push(song)
    else user.likedSongs = user.likedSongs.filter(({ id }) => id !== song.id)
    const updatedUser = await update(user)
    return updatedUser
}

async function updateLikeStation(currStation) {
    const user = getLoggedinUser()
    const { _id, name, imgUrl, songs, description } = currStation
    const station = {
        _id,
        name,
        imgUrl,
        songs,
        description
    }
    const isAdd = !user.likedStations.find(({ _id }) => _id === station._id)
    if (isAdd) user.likedStations.push(station)
    else user.likedStations = user.likedStations.filter(({ _id }) => _id !== station._id)
    const updatedUser = await update(user)
    return updatedUser
}