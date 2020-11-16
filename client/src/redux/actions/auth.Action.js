import {LOGIN_REQUEST, LOGOUT_REQUEST, REGISTRATION_REQUEST} from '../types'

export const registration = (name, email, password) => ({
    type: REGISTRATION_REQUEST
})

export const login = (email, password) => ({
    type: LOGIN_REQUEST
})

export const logout = () => ({
    type: LOGOUT_REQUEST
})
