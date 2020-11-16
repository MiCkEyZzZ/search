import React from 'react'

import './ToggleSwitch.scss'

export const ToggleSwitch = ({activeSwitchType, onToggleChecked}) => {
    const toggleChangeClick = () => {
        if (onToggleChecked) {
            onToggleChecked()
        }
    }

    return (
        <div
            className={!activeSwitchType ? 'container-checkbox' : 'container-checkbox isChecked'}
            onClick={toggleChangeClick}
        >
            <span className='hide'>Переключить</span>
        </div>
    )
}
