import React from 'react'
import {BrowserRouter as Router} from 'react-router-dom'
import {useRoutes} from '../../routes'

import './Layout.scss'

import {useAuth} from '../../hooks/auth.hook'
import {AuthContext} from '../../context/AuthContext'
import {Navbar} from '../../components/Navigation/Navbar/Navbar'

export const Layout = () => {
    // получаем token, userId and login, logOut function
    const {token, login, logOut, userId, userName, userEmail} = useAuth()
    const isAuthenticated = !!token
    const routes = useRoutes(isAuthenticated)

    return (
        // далее в AuthContext Provider мы передаем полученные данные, чтобы мы могли пользоваться во всем приложении
        // тут проверяем если мы за логинены то тогда будем отображать Navbar, а если нет то будем показывать
        // страницу login or registration
        <AuthContext.Provider value={{token, login, logOut, userId, isAuthenticated, userName, userEmail}}>
            <Router>
                {isAuthenticated && <Navbar name={userName} email={userEmail} />}
                <>
                    {routes}
                </>
            </Router>
        </AuthContext.Provider>
    )
}
