import React, {useEffect, useRef, useState} from 'react'
import {useSelector} from 'react-redux'

import './Select.scss'

const arrowDown = (
    <svg className='container-select-label__icon-down' width="10" height="5" viewBox="0 0 10 5" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.29289 4.29289L0.853553 0.853553C0.538571 0.538571 0.761654 0 1.20711 0H8.79289C9.23835 0 9.46143 0.53857 9.14645 0.853553L5.70711 4.29289C5.31658 4.68342 4.68342 4.68342 4.29289 4.29289Z" fill="#D1D1D1"/></svg>
)

const arrowUp = (
    <svg className='container-select-label__icon-up' width="10" height="5" viewBox="0 0 10 5" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.29289 4.29289L0.853553 0.853553C0.538571 0.538571 0.761654 0 1.20711 0H8.79289C9.23835 0 9.46143 0.53857 9.14645 0.853553L5.70711 4.29289C5.31658 4.68342 4.68342 4.68342 4.29289 4.29289Z" fill="#D1D1D1"/></svg>
)

export const Select = ({items, activeSelectType, onClickSelectSortType}) => {
    const {darkmode} = useSelector(({themes}) => themes)
    const [visiblePanel, setVisiblePanel] = useState(false)
    const sortRef = useRef()
    const activeLabel = items.find((obj) => obj.type === activeSelectType).name

    const toggleVisiblePanel = () => {
        setVisiblePanel(!visiblePanel)
    }

    const handleOutsideClick = (event) => {
        const path = event.path || (event.composedPath && event.composedPath())
        if (!path.includes(sortRef.current)) {
            setVisiblePanel(false)
        }
    };

    const onSelectItem = (i) => {
        if (onClickSelectSortType) {
            onClickSelectSortType(i)
        }

        setVisiblePanel(false)
    }

    useEffect(() => {
        document.body.addEventListener('click', handleOutsideClick)

        return () => {
            document.removeEventListener('click', handleOutsideClick)
        }
    }, [])

    return (
        <div ref={sortRef} className="container-select">
            <div
                className={darkmode ? "container-select-label dark" : "container-select-label"}
                onClick={toggleVisiblePanel}
            >
                {activeLabel}
                <i className="container-select-label__icon">
                    {visiblePanel ? arrowUp : arrowDown}
                </i>
            </div>
            {visiblePanel && (
                <div className={darkmode ? "container-select-panel dark" : "container-select-panel"}>
                    <ul className='container-select-panel__list'>
                        {items && items.map((obj, i) => {
                            return (
                                <li
                                    key={`${obj.type}_${i}`}
                                    className={activeSelectType === obj.type ? 'container-select-panel__item active' : 'container-select-panel__item'}
                                    onClick={() => onSelectItem(obj)}
                                >
                                    {obj.name}
                                </li>
                            )
                        })}
                    </ul>
                </div>
            )}
        </div>
    )
}
