import React from 'react'

import './TabSecond.scss'

export const TabSecond = ({items, activeThemeType, onClickSelectThemeType, onSelectThemeChange}) => {
    const activeTheme = items.find((obj) => obj.type === activeThemeType).type

    const handleSelectTheme = (i) => {
        if (onClickSelectThemeType) {
            onClickSelectThemeType(i)
            onSelectThemeChange(i)
        }
    }

    return (
        <div className='container-second'>
            <ul className="container-second-list">
                {items && items.map((obj, i) => {
                    return (
                        <li
                            key={`${obj.type}_${i}`}
                            className='container-second-item'
                            onClick={() => handleSelectTheme(obj)}
                        >
                            <div className="container-second-item__set" style={obj.background}>
                                <span className='container-second-item__set-one' style={obj.colorOne}></span>
                                <span className='container-second-item__set-two' style={obj.colorTwo}></span>
                                <span className='container-second-item__set-three' style={obj.colorThree}></span>
                                {activeTheme === obj.type ? <span className='container-second-item__set-checked'>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="14" height="22.4"><g><path d="M9.86 18a1 1 0 01-.73-.32l-4.86-5.17a1 1 0 111.46-1.37l4.12 4.39 8.41-9.2a1 1 0 111.48 1.34l-9.14 10a1 1 0 01-.73.33z" fill="#ffffff" data-name="checkmark"/></g></svg>
                                </span> : null}
                            </div>
                            <div className="container-second-item__label">{obj.title}</div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}
