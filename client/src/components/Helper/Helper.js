import React from 'react'
import {Link} from 'react-router-dom'
import {useSelector} from 'react-redux'

import './Helper.scss'

export const Helper = () => {
    const {darkmode} = useSelector(({themes}) => themes)

    return (
        <div className={darkmode ? 'container-helper dark' : 'container-helper'}>
            <div className="container-helper-message">
                <p className={darkmode ? 'container-helper-message__title-txt dark' : 'container-helper-message__title-txt'}>Поиск сохранён в разделе «Избранное»</p>
            </div>
            <div className='container-helper-button'>
                <Link to="/favorites" className='container-helper-button__btn'>Перейти в избранное</Link>
            </div>
        </div>
    )
}
