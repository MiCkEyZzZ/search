import React from 'react'
import {NavLink} from 'react-router-dom'

import './TabButton.scss'

export const TabButton = React.memo(function TabButton({items, activeTabType, onClickSelectTab}) {
    const activeTab = items.find((obj) => obj.type === activeTabType).type

    const handleSelectTab = (i) => {
        if (onClickSelectTab) {
            onClickSelectTab(i)
        }
    }

    return (
        items && items.map((obj, i) => {
            return (
                <NavLink
                    to={obj.to}
                    exact={obj.exact}
                    key={`${obj.type}_${i}`}
                    activeClassName={activeTab === obj.type ? 'container-settings-main__header-menu-item active' : 'container-settings-main__header-menu-item'}
                    onClick={() => handleSelectTab(obj)}
                >
                    {obj.name}
                </NavLink>
            )
        })
    )
})
