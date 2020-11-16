import {createContext} from 'react'

function foo () {}

export const AuthContext = createContext({
    token: null,
    userId: null,
    login: foo,
    logOut: foo,
    isAuthenticated: false,
    userName: '',
    modalOpen: foo
})
