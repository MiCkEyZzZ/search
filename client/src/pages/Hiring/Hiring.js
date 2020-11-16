import React from 'react'
import {Link} from 'react-router-dom'
import {useSelector} from 'react-redux'

import './Hiring.scss'

import logo from '../../assets/logo.png'
import {Header} from '../../components/Header/Header'

export const Hiring = () => {
    const {darkmode} = useSelector(({themes}) => themes)

    return (
        <>
            <Header />
            <div className='container-hiring'>
                <div className="container-hiring-context">
                    <Link to='/' className="container-hiring-context__logo">
                        <img src={logo} alt="logo"/>
                    </Link>
                    <div className="container-about-context__title">
                        <h1 className={darkmode ? 'container-about-context__title-text dark' : 'container-about-context__title-text'}>Карьера в Поиске</h1>
                    </div>
                </div>
            </div>
        </>
    )
}
