import React, {useCallback, useContext, useEffect, useRef, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {NavLink, useHistory} from 'react-router-dom'
import {Link} from 'react-router-dom'

import './Navbar.scss'

import {AuthContext} from '../../../context/AuthContext'
import {Plate} from '../../UI/Plate/Plate'
import {setPlate} from '../../../redux/actions/plateAction'
import {Button} from '../../UI/Button/Button'

const emailIcon = (
    <svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1"><g stroke="none" strokeWidth="1" fill="none"><rect x="0" y="0" width="24" height="24"></rect><path d="M21,12.0829584 C20.6747915,12.0283988 20.3407122,12 20,12 C16.6862915,12 14,14.6862915 14,18 C14,18.3407122 14.0283988,18.6747915 14.0829584,19 L5,19 C3.8954305,19 3,18.1045695 3,17 L3,8 C3,6.8954305 3.8954305,6 5,6 L19,6 C20.1045695,6 21,6.8954305 21,8 L21,12.0829584 Z M18.1444251,7.83964668 L12,11.1481833 L5.85557487,7.83964668 C5.4908718,7.6432681 5.03602525,7.77972206 4.83964668,8.14442513 C4.6432681,8.5091282 4.77972206,8.96397475 5.14442513,9.16035332 L11.6444251,12.6603533 C11.8664074,12.7798822 12.1335926,12.7798822 12.3555749,12.6603533 L18.8555749,9.16035332 C19.2202779,8.96397475 19.3567319,8.5091282 19.1603533,8.14442513 C18.9639747,7.77972206 18.5091282,7.6432681 18.1444251,7.83964668 Z" fill="#1390e5"></path><circle fill="#007bff" opacity="0.3" cx="19.5" cy="17.5" r="2.5"></circle></g></svg>
)

const profileIcon = (
    <svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1"><g stroke="none" strokeWidth="1" fill="none"><rect x="0" y="0" width="24" height="24"></rect><path d="M13.2070325,4 C13.0721672,4.47683179 13,4.97998812 13,5.5 C13,8.53756612 15.4624339,11 18.5,11 C19.0200119,11 19.5231682,10.9278328 20,10.7929675 L20,17 C20,18.6568542 18.6568542,20 17,20 L7,20 C5.34314575,20 4,18.6568542 4,17 L4,7 C4,5.34314575 5.34314575,4 7,4 L13.2070325,4 Z" fill="#28a745"></path><circle fill="#28a745" opacity="0.3" cx="18.5" cy="5.5" r="2.5"></circle></g></svg>
)

const actionIcon = (
    <svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1"><g stroke="none" strokeWidth="1" fill="none"><polygon points="0 0 24 0 24 24 0 24"></polygon><path d="M4.85714286,1 L11.7364114,1 C12.0910962,1 12.4343066,1.12568431 12.7051108,1.35473959 L17.4686994,5.3839416 C17.8056532,5.66894833 18,6.08787823 18,6.52920201 L18,19.0833333 C18,20.8738751 17.9795521,21 16.1428571,21 L4.85714286,21 C3.02044787,21 3,20.8738751 3,19.0833333 L3,2.91666667 C3,1.12612489 3.02044787,1 4.85714286,1 Z M8,12 C7.44771525,12 7,12.4477153 7,13 C7,13.5522847 7.44771525,14 8,14 L15,14 C15.5522847,14 16,13.5522847 16,13 C16,12.4477153 15.5522847,12 15,12 L8,12 Z M8,16 C7.44771525,16 7,16.4477153 7,17 C7,17.5522847 7.44771525,18 8,18 L11,18 C11.5522847,18 12,17.5522847 12,17 C12,16.4477153 11.5522847,16 11,16 L8,16 Z" fill="#dc3545" opacity="0.3"></path><path d="M6.85714286,3 L14.7364114,3 C15.0910962,3 15.4343066,3.12568431 15.7051108,3.35473959 L20.4686994,7.3839416 C20.8056532,7.66894833 21,8.08787823 21,8.52920201 L21,21.0833333 C21,22.8738751 20.9795521,23 19.1428571,23 L6.85714286,23 C5.02044787,23 5,22.8738751 5,21.0833333 L5,4.91666667 C5,3.12612489 5.02044787,3 6.85714286,3 Z M8,12 C7.44771525,12 7,12.4477153 7,13 C7,13.5522847 7.44771525,14 8,14 L15,14 C15.5522847,14 16,13.5522847 16,13 C16,12.4477153 15.5522847,12 15,12 L8,12 Z M8,16 C7.44771525,16 7,16.4477153 7,17 C7,17.5522847 7.44771525,18 8,18 L11,18 C11.5522847,18 12,17.5522847 12,17 C12,16.4477153 11.5522847,16 11,16 L8,16 Z" fill="#dc3545"></path></g></svg>
)

const queryIcon = (
    <svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1"><g stroke="none" strokeWidth="1" fill="none"><rect x="0" y="0" width="24" height="24"></rect><path d="M6,2 L18,2 C18.5522847,2 19,2.44771525 19,3 L19,12 C19,12.5522847 18.5522847,13 18,13 L6,13 C5.44771525,13 5,12.5522847 5,12 L5,3 C5,2.44771525 5.44771525,2 6,2 Z M7.5,5 C7.22385763,5 7,5.22385763 7,5.5 C7,5.77614237 7.22385763,6 7.5,6 L13.5,6 C13.7761424,6 14,5.77614237 14,5.5 C14,5.22385763 13.7761424,5 13.5,5 L7.5,5 Z M7.5,7 C7.22385763,7 7,7.22385763 7,7.5 C7,7.77614237 7.22385763,8 7.5,8 L10.5,8 C10.7761424,8 11,7.77614237 11,7.5 C11,7.22385763 10.7761424,7 10.5,7 L7.5,7 Z" fill="#3699FF" opacity="0.3"></path><path d="M3.79274528,6.57253826 L12,12.5 L20.2072547,6.57253826 C20.4311176,6.4108595 20.7436609,6.46126971 20.9053396,6.68513259 C20.9668779,6.77033951 21,6.87277228 21,6.97787787 L21,17 C21,18.1045695 20.1045695,19 19,19 L5,19 C3.8954305,19 3,18.1045695 3,17 L3,6.97787787 C3,6.70173549 3.22385763,6.47787787 3.5,6.47787787 C3.60510559,6.47787787 3.70753836,6.51099993 3.79274528,6.57253826 Z" fill="#3699FF"></path></g></svg>
)

const settingIcon = (
    <svg width="24" height="24" viewBox="-3 -4 24 24" fill="none"><path d="M15.453 7.167c-.024-.21-.27-.37-.482-.37a1.666 1.666 0 01-1.553-1.027 1.67 1.67 0 01.419-1.854.417.417 0 00.046-.566 7.42 7.42 0 00-1.189-1.2.417.417 0 00-.57.046c-.447.495-1.25.68-1.87.42A1.666 1.666 0 019.24.988.416.416 0 008.873.55 7.488 7.488 0 007.185.545a.417.417 0 00-.37.43 1.669 1.669 0 01-1.028 1.6c-.613.25-1.41.068-1.857-.423a.418.418 0 00-.566-.048c-.449.353-.858.757-1.213 1.2a.417.417 0 00.045.57c.522.473.69 1.225.42 1.871-.26.617-.9 1.014-1.633 1.014a.408.408 0 00-.433.368 7.513 7.513 0 00-.003 1.706c.024.212.277.369.492.369a1.645 1.645 0 011.543 1.028c.262.639.094 1.384-.42 1.854a.417.417 0 00-.045.565c.348.444.748.848 1.186 1.2a.417.417 0 00.571-.044c.449-.497 1.252-.68 1.87-.421.647.27 1.055.925 1.015 1.628a.417.417 0 00.368.438 7.462 7.462 0 001.687.004.417.417 0 00.371-.43 1.667 1.667 0 011.027-1.598c.617-.253 1.41-.068 1.857.422.148.161.393.18.566.047a7.463 7.463 0 001.213-1.2.416.416 0 00-.045-.57 1.662 1.662 0 01-.42-1.87 1.68 1.68 0 011.535-1.017l.092.003a.417.417 0 00.44-.368 7.506 7.506 0 00.003-1.706zm-7.441 3.35A2.504 2.504 0 015.51 8.017a2.504 2.504 0 012.502-2.502 2.504 2.504 0 012.501 2.502 2.504 2.504 0 01-2.501 2.502z" fill="#ffa800"/></svg>
)

const analyticsIcon = (
    <svg width="24" height="24" viewBox="0 0 24 24" version="1.1"><g stroke="none" fill="none"><rect x="0" y="0"></rect><path d="M4.00246329,12.2004927 L13,14 L13,4.06189375 C16.9463116,4.55399184 20,7.92038235 20,12 C20,16.418278 16.418278,20 12,20 C7.64874861,20 4.10886412,16.5261253 4.00246329,12.2004927 Z" fill="#000000" opacity="0.3"></path><path d="M3.0603968,10.0120794 C3.54712466,6.05992157 6.91622084,3 11,3 L11,11.6 L3.0603968,10.0120794 Z" fill="#000000"></path></g></svg>
)

const logoIcon = (
    <svg width="45" height="45" fill="none"><g><path d="M32.263 23.764l-18.8 9.485v10.06l18.8-9.485v-10.06z" fill="#1390E5"/><path d="M13.463 14.28l18.8 9.484v10.06l-18.8-9.485V14.28z" fill="#1180CB"/><path d="M32.263 4.795l-18.8 9.485v10.06l18.8-9.485V4.795z" fill="#35A2EC"/></g><defs><clipPath><path fill="#fff" d="M0 0h48v48H0z"/></clipPath></defs></svg>
)

const links = [
    {to: '/search', label: 'Поиск', exact: true},
    {to: '/favorites', label: 'Избранное', exact: false},
    {to: '/help_center', label: 'Помощь', exact: false}
]

const profileLinks = [
    {to: '/profile', label: 'Профиль', type: 'profile', icon: profileIcon},
    {to: '/action', label: 'Активность', type: 'action', icon: actionIcon},
    {to: '/query_user', label: 'Запросы', type: 'query', icon: queryIcon},
    {to: '/settings_user', label: 'Настройки', type: 'setting', icon: settingIcon},
    {to: '/analytics', label: 'Аналитика', type: 'analytics', icon: analyticsIcon}
]

export const Navbar = ({name, email}) => {
    const plateRef = useRef()
    const dispatch = useDispatch()
    const {setPlateByType} = useSelector(({plate}) => plate)
    const [platePopup, setPlatePopup] = useState(false)
    const {darkmode} = useSelector(({themes}) => themes)
    const history = useHistory()
    const auth = useContext(AuthContext)

    const toggleOpenPlate = () => {
        setPlatePopup(!platePopup)
    }

    const renderLinks = () => {
        return links.map((link, i) => {
            return (
                <li
                    key={`${link} ${i}`}
                    className='navigation__nav-list-item'
                >
                    <NavLink
                        to={link.to}
                        exact={link.exact}
                        className='navigation__nav-list-item--link'
                        activeClassName='active'
                    >
                        {link.label}
                    </NavLink>
                </li>
            )
        })
    }

    const handleLogOut = () => {
        auth.logOut()
        history.push('/')
    }

    const onPlateType = useCallback((type) => {
        dispatch(setPlate(type))
    }, [dispatch])

    const handleOutsideClick = event => {
        const path = event.path || (event.composedPath && event.composedPath())
        if (!path.includes(plateRef.current)) {
            setPlatePopup(false)
        }
    }

    useEffect(() => {
        document.addEventListener('click', handleOutsideClick)

        return () => {
            document.removeEventListener('click', handleOutsideClick)
        }
    }, [])

    return (
        <div className={darkmode ? "navigation dark" : "navigation"}>
            <div className="navigation-wrapper">
                <div className="navigation__logo">
                    <Link
                        to="/"
                        className='navigation__logo-link'
                    >
                        {logoIcon}
                    </Link>
                </div>
                <nav className="navigation__nav">
                    <ul className="navigation__nav-list">
                        {renderLinks()}
                    </ul>
                    <ul className="navigation__user">
                        <li ref={plateRef} className='navigation__user-item navigation__user-profile'>
                            <Plate
                                activePlateType={setPlateByType.type}
                                name={name}
                                email={email}
                                items={profileLinks}
                                onClickPlateType={onPlateType}
                                toggleOpenPlate={toggleOpenPlate}
                                platePopup={platePopup}
                                setPlatePopup={setPlatePopup}
                                icon={emailIcon}
                            />
                        </li>
                        <li className='navigation__user-item'>
                            <Button
                                title='Выйти'
                                className='navigation__user-item-btn'
                                onClickButton={handleLogOut}
                            />
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    )
}
