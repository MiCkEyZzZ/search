import React from 'react'
import {Link} from 'react-router-dom'
import {useSelector} from 'react-redux'

import './Privacy.scss'

import logo from '../../assets/logo.png'
import {Header} from '../../components/Header/Header'

export const Privacy = () => {
    const {darkmode} = useSelector(({themes}) => themes)

    return (
        <>
            <Header />
            <div className='container-privacy'>
                <div className="container-privacy-context">
                    <Link to='/' className="container-privacy-context__logo">
                        <img src={logo} alt="logo"/>
                    </Link>
                    <div className="container-privacy-context__title">
                        <h1 className={darkmode ? 'container-privacy-context__title-text dark' : 'container-privacy-context__title-text'}>Мы не собираем и делимся персональной информацией.</h1>
                    </div>
                </div>
            </div>
        </>
    )
}
