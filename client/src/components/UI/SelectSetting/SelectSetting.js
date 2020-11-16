import React from 'react'

import './SelectSetting.scss'

export const SelectSetting = React.memo(function SelectSetting({items, toggleVisible, visible, arrowDown, arrowUp, onClickSelectSortType, activeSelectType}) {
    const activeLabel = items.find((obj) => obj.type === activeSelectType).name

    const onSelectItem = (i) => {
        if (onClickSelectSortType) {
            onClickSelectSortType(i)
        }
    }

    return (
        <div className="container-settings-select">
            <div
                className="container-settings-select__input"
                onClick={toggleVisible}
            >
                {activeLabel}
                <i className="container-settings-select__input-icon">
                    {visible ? arrowUp : arrowDown}
                </i>
            </div>
            {visible && (
                <div className="container-settings-select-pane">
                    <ul className='container-settings-select-pane__list'>
                        {items && items.map((obj, i) => {
                            return (
                                <li
                                    key={`${obj.type}_${i}`}
                                    className={activeSelectType === obj.type ? 'container-settings-select-pane__item active' : 'container-settings-select-pane__item'}
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
})
