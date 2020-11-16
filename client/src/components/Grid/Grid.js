import React from 'react'
import {Link} from 'react-router-dom'
import {useSelector} from 'react-redux'

import './Grid.scss'

export const Grid = ({items, active}) => {
    const {darkmode} = useSelector(({themes}) => themes)

    return (
        <div className={active ? 'container-grid' : 'container-grid list'}>
            <ul className='container-grid__list'>
                {items.map((item, i) => {
                    const {snippet = {}} = item
                    const {title, channelTitle, thumbnails = {}, resourceId} = snippet
                    const {medium = {}} = thumbnails

                    return (
                        <li
                            key={`${item}_${i}`}
                            className='container-grid__list-item'
                        >
                            <img className="container-grid__list-item-screen" width={medium.width} height={medium.height} src={medium.url} alt='' />
                            <div className="container-grid__wrapper">
                                <div className='container-grid__list-item-title'>
                                    <Link className={darkmode ? 'container-grid__list-item-title--txt dark' : 'container-grid__list-item-title--txt'} to='/watch' target='_blank'>{title}</Link>
                                </div>
                                <div className='container-grid__description'>
                                    <Link className={darkmode ? 'container-grid__description--txt dark' : 'container-grid__description--txt'} to={`https://www.youtube.com/watch?v=${resourceId}`}>{channelTitle}</Link>
                                    <p className={darkmode ? 'container-grid__description--viewers dark' : 'container-grid__description--viewers'}>387 тыс. просмотров</p>
                                </div>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}
