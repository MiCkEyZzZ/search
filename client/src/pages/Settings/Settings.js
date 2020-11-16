import React, {useCallback} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {BrowserRouter as Router, Switch, Route, useHistory} from 'react-router-dom'
import {setTheme, setThemeChange} from '../../redux/actions/themeAction'

import './Settings.scss'

import {setTabs} from '../../redux/actions/tabsAction'
import {Header} from '../../components/Header/Header'
import {TabButton} from '../../components/UI/Tabs/TabButton/TabButton'
import {TabContent} from '../../components/UI/Tabs/TabContent/TabsContent'
import {TabFirst} from '../../components/UI/Tabs/TabsFirst/TabFirst'
import {TabSecond} from '../../components/UI/Tabs/TabSecond/TabSecond'
import {TabThird} from '../../components/UI/Tabs/TabThird/TabThird'
import {TabFourth} from '../../components/UI/Tabs/TabFourth/TabFourth'
import {Navbar} from '../../components/Navigation/Navbar/Navbar'
import {Button} from '../../components/UI/Button/Button'

const arrowDown = (
    <svg className='container-select-label__icon-down' width="10" height="5" viewBox="0 0 10 5" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.29289 4.29289L0.853553 0.853553C0.538571 0.538571 0.761654 0 1.20711 0H8.79289C9.23835 0 9.46143 0.53857 9.14645 0.853553L5.70711 4.29289C5.31658 4.68342 4.68342 4.68342 4.29289 4.29289Z" fill="#D1D1D1"/></svg>
)

const arrowUp = (
    <svg className='container-select-label__icon-up' width="10" height="5" viewBox="0 0 10 5" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.29289 4.29289L0.853553 0.853553C0.538571 0.538571 0.761654 0 1.20711 0H8.79289C9.23835 0 9.46143 0.53857 9.14645 0.853553L5.70711 4.29289C5.31658 4.68342 4.68342 4.68342 4.29289 4.29289Z" fill="#D1D1D1"/></svg>
)

const blueLine = {backgroundColor: '#084999'}
const greenLine = {backgroundColor: '#3f6e35'}
const grayLine = {backgroundColor: '#494949'}
const darkWhiteLine = {backgroundColor: '#cccccc'}
const lightGreenLine = {backgroundColor: '#50f148'}
const transparentGreenLine = {backgroundColor: '#a1ac25'}
const whiteBackground = {backgroundColor: '#ffffff'}
const blackBackground = {backgroundColor: '#1c1c1c'}

const themeItems = [
    {title: 'По умолчанию', type: 'default', colorOne: blueLine, colorTwo: greenLine, colorThree: grayLine, background: whiteBackground},
    {title: 'Темная', type: 'terminal', colorOne: lightGreenLine, colorTwo: transparentGreenLine, colorThree: darkWhiteLine, background: blackBackground}
]

const tabsItems = [
    {to: '/settings#general', type: 0, name: 'Общие', exact: true},
    {to: '/settings#theme', type: 1, name: 'Темы', exact: false},
    {to: '/settings#appearance', type: 2, name: 'Внешний вид', exact: false},
    {to: '/settings#privacy', type: 3, name: 'Конфиденциальность', exact: false},
]

export const Settings = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const {selectTheme, darkmode} = useSelector(({themes}) => themes)
    const {selectTabs} = useSelector(({tabs}) => tabs)

    const handleSelectTabs = useCallback((type) => {
        dispatch(setTabs(type))
    }, [dispatch])

    const onSelectThemeType = useCallback((type) => {
        dispatch(setTheme(type))
    }, [dispatch])

    const onSelectThemeChange = useCallback((darkmode) => {
        if (darkmode) {
            dispatch(setThemeChange(darkmode))
        }

        return
    }, [dispatch])

    const handleSaveSetting = () => {
        history.push('/login')
    }

    return (
        <>
            <Header />
            <div className='container-settings'>
                <div className="container-settings-wrapper">
                    <div className="container-settings-main">
                        <div className="container-settings-main__header">
                            <div className="container-settings-main__header-title">
                                <h1 className='container-settings-title'>Настройки</h1>
                            </div>
                            <div className="container-settings-main__header-menu-btn">
                                <ul className={darkmode ? "container-settings-main__header-menu-list dark" : "container-settings-main__header-menu-list"}>
                                    <TabButton
                                        activeTabType={selectTabs.type}
                                        items={tabsItems}
                                        onClickSelectTab={handleSelectTabs}
                                    />
                                </ul>
                            </div>
                        </div>
                        <div className="container-settings-main__plate">
                            <Router>
                                {/*<Switch>*/}
                                    <TabFirst
                                        path='/settings#general'
                                        arrowDown={arrowDown}
                                        arrowUp={arrowUp}
                                    />

                                    {/*<TabSecond*/}
                                    {/*    path='/settings#theme'*/}
                                    {/*    activeThemeType={selectTheme.type}*/}
                                    {/*    items={themeItems}*/}
                                    {/*    onClickSelectThemeType={onSelectThemeType}*/}
                                    {/*    onSelectThemeChange={onSelectThemeChange}*/}
                                    {/*/>*/}

                                    {/*<TabThird*/}
                                    {/*    path='/settings#appearance'*/}
                                    {/*    arrowDown={arrowDown}*/}
                                    {/*    arrowUp={arrowUp}*/}
                                    {/*/>*/}

                                    {/*<TabFourth*/}
                                    {/*    path='/settings#privacy'*/}
                                    {/*/>*/}
                                {/*</Switch>*/}
                            </Router>
                        </div>
                        {/*<TabContent*/}
                        {/*    items={tabsItems}*/}
                        {/*/>*/}
                        <div className="container-settings-main__footer">
                            <Button
                                title='Сохранить и выйти'
                                className={darkmode ? 'container-settings-main__footer-btn dark' : 'container-settings-main__footer-btn'}
                                onClickButton={handleSaveSetting}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
