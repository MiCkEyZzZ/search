import React from 'react'
import './Backdrop.scss'

export const Backdrop = ({onClick}) => {
    return (
        <div className='container-backdrop' onClick={onClick}></div>
    )
}
