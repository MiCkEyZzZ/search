import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import {useSelector} from 'react-redux'

import './Plate.scss'

const closeIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M4.293 18.293L10.586 12 4.293 5.707a1 1 0 011.414-1.414L12 10.586l6.293-6.293a1 1 0 111.414 1.414L13.414 12l6.293 6.293a1 1 0 11-1.414 1.414L12 13.414l-6.293 6.293a1 1 0 01-1.414-1.414z"/></svg>
)

export const Plate = ({items, name, email, icon, onClickPlateType, toggleOpenPlate, platePopup, setPlatePopup}) => {
    const [uploadPopup, setUploadPopup] = useState(false)
    const {darkmode} = useSelector(({themes}) => themes)

    const onPlateItem = (i) => {
        if (onClickPlateType) {
            onClickPlateType(i)
        }

        setPlatePopup(false)
    }

    const handleOpenUploadPopup = (evt) => {
        evt.preventDefault()
        setUploadPopup(true)
    }

    const handleCloseUpdatePopup = () => {
        setUploadPopup(false)
    }

    return (
        <div className='container-plate'>
            <div
                className='container-plate-button'
                onClick={toggleOpenPlate}
            >
                <i className="container-plate-button__icon"></i>
            </div>

            {platePopup && <div className={darkmode ? "container-plate-container dark" : "container-plate-container"}>
                <div className="container-plate-container-info">
                    <div className="container-plate-container-info__image">
                        <i className="container-plate-container-info__image-icon"></i>
                        <div className="container-plate-container-info__image-add">
                            <Link
                                to='\'
                                className='container-plate-container-info__image-add--link'
                                onClick={handleOpenUploadPopup}
                            >
                                <svg className="gb_pb" enableBackground="new 0 0 24 24" focusable="false" height="26" fill='#5f6368' viewBox="0 0 24 24" width="18"><path d="M20 5h-3.17L15 3H9L7.17 5H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 14H4V7h16v12zM12 9c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4z"></path></svg>
                            </Link>
                        </div>
                    </div>
                    <div className="container-plate-container-info-title">
                        <span className='container-plate-container-info-title__nickname'>
                            {name}
                        </span>
                        <span className='container-plate-container-info-title-email'>
                            <i className='container-plate-container-info-title-email__icon'>
                                {icon}
                            </i>
                            <span className='container-plate-container-info-title-email__txt'>
                                {email}
                            </span>
                        </span>
                    </div>
                </div>
                <div className="container-plate-container-link">
                    <ul className="container-plate-container-link__list">
                        {items && items.map((obj, i) => {
                            return (
                                <li
                                    className='container-plate-container-link__item'
                                    key={`${obj.i}_${i}`}
                                >
                                    <Link
                                        className={darkmode ? 'container-plate-container-link__item-style dark' : 'container-plate-container-link__item-style'}
                                        to={obj.to}
                                        onClick={() => onPlateItem(obj)}
                                    >
                                        <i className='container-plate-container-link__item__icon'>{obj.icon}</i>
                                        {obj.label}
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>}
            {uploadPopup ? <div className="container-plate-popup">
                <div className='container-plate-popup-header'>
                    <div className='container-plate-popup-header__title'>
                        <h3 className='container-plate-popup-header__title-txt'>Добавить фото</h3>
                    </div>
                    <div className='container-plate-popup-header__btn'>
                        <button
                            className='container-plate-popup-header__btn-button'
                            onClick={handleCloseUpdatePopup}
                        >
                            {closeIcon}
                            <span className='hide'>Закрыть</span>
                        </button>
                    </div>
                </div>
                <div className='container-plate-popup-body'>
                    <div className="container-plate-popup-body__container">

                    </div>
                </div>
                <div className='container-plate-popup-footer'>
                    <button
                        className='container-plate-popup-footer__btn container-plate-popup-footer__btn-add'
                    >
                        Добавить фото
                    </button>
                    <button
                        className='container-plate-popup-footer__btn container-plate-popup-footer__btn-cancel'
                        onClick={handleCloseUpdatePopup}
                    >
                        Отмена
                    </button>
                </div>
            </div> : null}
        </div>
    )
}
