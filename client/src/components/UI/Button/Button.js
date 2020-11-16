import React from 'react'

import './Button.scss'

export const Button = ({title, className, onClickButton, disabled}) => {
    return (
        <button
            className={`container-btn ${className}`}
            onClick={onClickButton}
            disabled={disabled}
        >
            {title}
        </button>
    )
}
