import React from 'react'
import {Link} from 'react-router-dom'
import {useSelector} from 'react-redux'

import './Footer.scss'

export const Footer = () => {
    const {darkmode} = useSelector(({themes}) => themes)

    return (
        <div className={darkmode ? 'container-footer dark' : 'container-footer'}>
            <div className="container-footer-container">
                <p className='container-footer-container__copyright'>ООО «Поиск» 2020</p>
                <ul className="container-footer-container-list">
                    <li className='container-footer-container-item'>
                        <Link className='container-footer-container-item__link' to='/about'>О компании</Link>
                    </li>
                    <li className='container-footer-container-item'>
                        <Link className='container-footer-container-item__link' to='/our_team'>Команда</Link>
                    </li>
                    <li className='container-footer-container-item'>
                        <Link className='container-footer-container-item__link' to='/contacts'>Контакты</Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}
