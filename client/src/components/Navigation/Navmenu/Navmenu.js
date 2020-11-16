import React, {useEffect, useRef} from 'react'
import {Link} from 'react-router-dom'
import {useSelector} from 'react-redux'

import './Navmenu.scss'

const openIcon = (
    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" width="24" height="24"><g><path d="M28 10H4a1 1 0 010-2h24a1 1 0 010 2zM28 17H4a1 1 0 010-2h24a1 1 0 010 2zM28 24H4a1 1 0 010-2h24a1 1 0 010 2z"/></g><path fill="none" d="M0 0h32v32H0z"/></svg>
)

const closeIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M4.293 18.293L10.586 12 4.293 5.707a1 1 0 011.414-1.414L12 10.586l6.293-6.293a1 1 0 111.414 1.414L13.414 12l6.293 6.293a1 1 0 11-1.414 1.414L12 13.414l-6.293 6.293a1 1 0 01-1.414-1.414z"/></svg>
)

export const Navmenu = ({menuOpen, setMenuOpen, onClickOpen, onClickClose}) => {
    const menuRef = useRef()
    const {darkmode} = useSelector(({themes}) => themes)

    const handleOutsideClick = event => {
        const path = event.path || (event.composedPath && event.composedPath())
        if (!path.includes(menuRef.current)) {
            setMenuOpen(false)
        }
    }

    useEffect(() => {
        document.addEventListener('click', handleOutsideClick)

        return () => {
            document.removeEventListener('click', handleOutsideClick)
        }
    }, [])

    return (
        <div ref={menuRef} className={darkmode ? "container-navigation dark" : "container-navigation"}>
            <button
                className={darkmode ? 'container-navigation__open dark' : 'container-navigation__open'}
                onClick={onClickOpen}
            >
                <span className='hide'>Открыть</span>
                {menuOpen ? null : openIcon}
            </button>
            {menuOpen && (
                <nav className={menuOpen ? 'container-navigation-nav active' : 'container-navigation-nav'}>
                    <button
                        className={darkmode ? 'container-navigation__close dark' : 'container-navigation__close'}
                        onClick={onClickClose}
                    >
                        <span className='hide'>Скрыть</span>
                        {closeIcon}
                    </button>
                    <div className="container-navigation-setting">
                        <h4 className={darkmode ? 'container-navigation-title dark' : 'container-navigation-title'}>Настройки</h4>
                        <ul className="container-navigation-list">
                            <li className='container-navigation-list__item'>
                                <Link className={darkmode ? 'container-navigation-list__item--link dark' : 'container-navigation-list__item--link'} to='/settings#theme'>Темы</Link>
                            </li>
                            <li className='container-navigation-list__item'>
                                <Link className={darkmode ? 'container-navigation-list__item--link dark' : 'container-navigation-list__item--link'} to='/settings#general'>Прочие настройки</Link>
                            </li>
                            <li className='container-navigation-list__item'>
                                <Link className={darkmode ? 'container-navigation-list__item--link dark' : 'container-navigation-list__item--link'} to='/settings'>Быстрый поиск ярлыков</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="container-navigation-base">
                        <h4 className={darkmode ? 'container-navigation-title dark' : 'container-navigation-title'}>Основы конфиденциальности</h4>
                        <ul className="container-navigation-list">
                            <li className='container-navigation-list__item'>
                                <Link className={darkmode ? 'container-navigation-list__item--link dark' : 'container-navigation-list__item--link'} to='#'>Частный поиск</Link>
                            </li>
                            <li className='container-navigation-list__item'>
                                <Link className={darkmode ? 'container-navigation-list__item--link dark' : 'container-navigation-list__item--link'} to='#'>Приложение и рсширение</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="container-navigation-about">
                        <h4 className={darkmode ? 'container-navigation-title dark' : 'container-navigation-title'}>Кто мы</h4>
                        <ul className="container-navigation-list">
                            <li className='container-navigation-list__item'>
                                <Link className={darkmode ? 'container-navigation-list__item--link dark' : 'container-navigation-list__item--link'} to='/about'>О нас</Link>
                            </li>
                            <li className='container-navigation-list__item'>
                                <Link className={darkmode ? 'container-navigation-list__item--link dark' : 'container-navigation-list__item--link'} to='/privacy'>Политика конфиденциальности</Link>
                            </li>
                            <li className='container-navigation-list__item'>
                                <Link className={darkmode ? 'container-navigation-list__item--link dark' : 'container-navigation-list__item--link'} to='/hiring'>Вакансии</Link>
                            </li>
                            <li className='container-navigation-list__item'>
                                <Link className={darkmode ? 'container-navigation-list__item--link dark' : 'container-navigation-list__item--link'} to='/press'>Медиа</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="container-navigation-social">
                        <h4 className={darkmode ? 'container-navigation-title dark' : 'container-navigation-title'}>Оставайтесь на связи</h4>
                        <ul className="container-navigation-list">
                            <li className='container-navigation-list__item'>
                                <Link className={darkmode ? 'container-navigation-list__item--link dark' : 'container-navigation-list__item--link'} to='#'>Вконтакте</Link>
                            </li>
                            <li className='container-navigation-list__item'>
                                <Link className={darkmode ? 'container-navigation-list__item--link dark' : 'container-navigation-list__item--link'} to='#'>Телеграм</Link>
                            </li>
                            <li className='container-navigation-list__item'>
                                <Link className={darkmode ? 'container-navigation-list__item--link dark' : 'container-navigation-list__item--link'} to='#'>Помощь</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            )}
        </div>
    )
}
