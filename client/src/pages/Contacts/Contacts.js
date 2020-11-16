import React from 'react'
import {Link} from 'react-router-dom'
import {useSelector} from 'react-redux'

import './Contacts.scss'

import {Header} from '../../components/Header/Header'
import logo from '../../assets/logo.png'

export const Contacts = () => {
    const {darkmode} = useSelector(({themes}) => themes)

    return (
        <>
            <Header />
            <div className='container-contacts'>
                <div className="container-contacts-context">
                    <Link to='/' className="container-contacts-context__logo">
                        <img src={logo} alt="logo"/>
                    </Link>
                    <div className="container-contacts-context__title">
                        <h1 className={darkmode ? 'container-contacts-context__title-text dark' : 'container-contacts-context__title-text'}>Наши контакты</h1>
                    </div>
                </div>
            </div>
        </>
    )
}
