import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'

import {Login} from './pages/Login/Login'
import {Search} from './pages/Search/Search'
import {Favorites} from './pages/Favorites/Favorites'
import {Registration} from './pages/Registration/Registration'
import {Reset} from './pages/Reset/Reset'
import {Profile} from './pages/Profile/Profile'
import {Recover} from './pages/Recover/Recover'
import {Settings} from './pages/Settings/Settings'
import {About} from './pages/About/About'
import {Privacy} from './pages/Privacy/Privacy'
import {Hiring} from './pages/Hiring/Hiring'
import {Press} from './pages/Press/Press'
import {Spread} from './pages/Spread/Spread'
import {Watch} from './pages/Watch/Watch'
import {Team} from './pages/Team/Team'
import {Contacts} from './pages/Contacts/Contacts'
import {Help} from './pages/Help/Help'
import {SettingUser} from './pages/SettingUser/SettingUser'
import {Analytics} from './pages/Analytics/Analytics'
import {QueryUser} from './pages/QueryUser/QueryUser'
import {Action} from './pages/Action/Action'

export const useRoutes = isAuthenticated => {
    if (isAuthenticated) {
        return (
            <Switch>
                <Route path='/search' exact>
                    <Search />
                </Route>
                <Route path='/favorites' exact>
                    <Favorites />
                </Route>
                <Route path='/profile'>
                    <Profile />
                </Route>
                <Route path='/watch'>
                    <Watch />
                </Route>
                <Route path='/spread'>
                    <Spread />
                </Route>
                <Route path='/help_center'>
                    <Help />
                </Route>
                <Route path='/settings_user'>
                    <SettingUser />
                </Route>
                <Route path='/analytics'>
                    <Analytics />
                </Route>
                <Route path='/query_user'>
                    <QueryUser />
                </Route>
                <Route path='/action'>
                    <Action />
                </Route>
                <Redirect to='/search' />
            </Switch>
        )
    }

    return (
        <Switch>
            <Route path='/login' exact>
                <Login />
            </Route>
            <Route path='/registration'>
                <Registration />
            </Route>
            <Route path='/reset'>
                <Reset />
            </Route>
            <Route path='/recover'>
                <Recover />
            </Route>
            <Route path='/watch'>
                <Watch />
            </Route>
            <Settings path='/settings' />
            <About path='/about'/>
            <Privacy path='/privacy' />
            <Hiring path='/hiring'/>
            <Press path='/press' />
            <Team path='/our_team' />
            <Contacts path='/contacts' />
            <Redirect to='/login' />
        </Switch>
    )
}
