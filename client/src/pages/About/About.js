import React from 'react'
import {Link} from 'react-router-dom'
import {useSelector} from 'react-redux'

import './About.scss'

import logo from '../../assets/logo.png'
import {Header} from '../../components/Header/Header'

export const About = () => {
    const {darkmode} = useSelector(({themes}) => themes)

    return (
        <>
            <Header />
            <div className='container-about'>
                <div className="container-about-context">
                    <Link to='/' className="container-about-context__logo">
                        <img src={logo} alt="logo"/>
                    </Link>
                    <div className="container-about-context__title">
                        <h1 className={darkmode ? 'container-about-context__title-text dark' : 'container-about-context__title-text'}>Добропожаловать в Поиск</h1>
                    </div>
                </div>
            </div>
        </>
    )
}
