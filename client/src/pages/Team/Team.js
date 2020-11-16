import React from 'react'
import {Link} from 'react-router-dom'
import {useSelector} from 'react-redux'

import './Team.scss'

import logo from '../../assets/logo.png'

export const Team = () => {
    const {darkmode} = useSelector(({themes}) => themes)

    return (
        <>
            <div className='container-team'>
                <div className="container-team-context">
                    <Link to='/' className="container-team-context__logo">
                        <img src={logo} alt="logo"/>
                    </Link>
                    <div className="container-team-context__title">
                        <h1 className={darkmode ? 'container-team-context__title-text dark' : 'container-team-context__title-text'}>Наша команда</h1>
                    </div>
                </div>
            </div>
        </>
    )
}
