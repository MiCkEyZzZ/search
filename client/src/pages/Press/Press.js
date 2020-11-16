import React from 'react'
import {Link} from 'react-router-dom'
import {useSelector} from 'react-redux'

import './Press.scss'

import logo from '../../assets/logo.png'
import {Header} from '../../components/Header/Header'

export const Press = () => {
    const {darkmode} = useSelector(({themes}) => themes)

    return (
        <>
            <Header />
            <div className='container-press'>
                <div className="container-press-context">
                    <Link to='/' className="container-press-context__logo">
                        <img src={logo} alt="logo"/>
                    </Link>
                    <div className="container-press-context__title">
                        <h1 className={darkmode ? 'container-press-context__title-text dark' : 'container-press-context__title-text'}>Пресс центр</h1>
                    </div>
                </div>
            </div>
        </>
    )
}
