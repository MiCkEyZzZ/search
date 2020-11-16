import React, {useState} from 'react'

import './Watch.scss'
import {Header} from '../../components/Header/Header'

const items = new Array(16)
    .fill('Joe Rogan Experience #1558 - Tristan Harris')

export const Watch = () => {
    const [service, setService] = useState(false)

    const toggleOpenService = () => {
        setService(!service)
    }

    return (
        <>
            <Header />
            <div className='container-watch'>
                <div className="container-watch-wrapper">
                    <div className="container-watch-primary">
                        <div className="container-watch-primary__screen"></div>

                        <div className="container-watch-primary__title">
                            <div className="container-watch-primary__title-container">
                                <h1 className='container-watch-primary__title-text'>Мощный пожар в Твери - горят ангары</h1>
                                <div className="container-watch-primary__control">
                                    <div className="container-watch-primary__control-info">
                                        <div className="container-watch-primary__control-views">
                                            <span className='container-watch-primary__control-views-txt'>2,138 views</span>
                                        </div>
                                        <div className="container-watch-primary__control-date">
                                            <span className='container-watch-primary__control-date-point'>•</span>
                                            <span className='container-watch-primary__control-date-txt'>Nov 3, 2020</span>
                                        </div>
                                    </div>
                                    <div className="container-watch-primary__control-menu">
                                        <div className="container-watch-primary__control-menu-link">
                                            <div className="container-watch-primary__control-menu-link-like"></div>
                                            <div className="container-watch-primary__control-menu-link-dislike"></div>
                                            <div className="container-watch-primary__control-menu-link-share"></div>
                                            <div className="container-watch-primary__control-menu-link-save"></div>
                                        </div>
                                        <div className="container-watch-primary__control-menu-share">
                                            <button
                                                className='container-watch-primary__control-menu-share-btn'
                                                onClick={toggleOpenService}
                                            >
                                                <span className='container-watch-primary__control-menu-icon'>
                                                    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" width='24' height='24'><path d="M16 13c-1.654 0-3 1.346-3 3s1.346 3 3 3 3-1.346 3-3-1.346-3-3-3zM6 13c-1.654 0-3 1.346-3 3s1.346 3 3 3 3-1.346 3-3-1.346-3-3-3zM26 13c-1.654 0-3 1.346-3 3s1.346 3 3 3 3-1.346 3-3-1.346-3-3-3z"/></svg>
                                                </span>
                                            </button>
                                            {service ? <div className="container-watch-primary__control-menu-share-panel">
                                                <ul className="container-watch-primary__control-menu-share-list">
                                                    <li className='container-watch-primary__control-menu-share-item'>
                                                        Отчёт
                                                    </li>
                                                    <li className='container-watch-primary__control-menu-share-item'>
                                                        Транскрипция
                                                    </li>
                                                </ul>
                                            </div> : null}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="container-watch-primary-chanel">
                            <div className='container-watch-primary-chanel__name'>
                                <a href="#" className="container-watch-primary-chanel__name-icon">
                                    <div className='container-watch-primary-chanel__name-icon-img'>
                                        <img src="https://yt3.ggpht.com/a/AATXAJxzmmsgkFcMEL5clzccNb3GcMLu2i7xc6KzUOXi5g=s48-c-k-c0xffffffff-no-rj-mo" alt=""/>
                                    </div>
                                </a>
                                <div className="container-watch-primary-chanel__name-title">
                                    <div className="container-watch-primary-chanel__name-title-context">
                                        <a href="#" className='container-watch-primary-chanel__name-title-context-link'>Телеканал 360</a>
                                    </div>
                                    <div className="container-watch-primary-chanel__name-title-viewers">
                                        <span className='container-watch-primary-chanel__name-title-viewers-text'>747тыс. подписчиков</span>
                                    </div>
                                </div>
                            </div>
                            <div className='container-watch-primary-chanel__description-video'></div>
                        </div>
                        <div className="container-watch-primary-comment"></div>
                    </div>
                    <div className="container-watch-secondary">
                        <ul className="container-watch-secondary-list">
                            {items.map((item, i) => {
                                return (
                                    <li
                                        key={i}
                                        className="container-watch-secondary-item"
                                    >
                                        <div className="container-watch-secondary-item__screen"></div>
                                        <div className="container-watch-secondary-item__info">
                                            <a href="#" className='container-watch-secondary-item__info-title'>{item}</a>
                                            <div className="container-watch-secondary-item__info-description"></div>
                                        </div>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}
