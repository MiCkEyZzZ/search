import React, {useState} from 'react'

import './Header.scss'

import {Navmenu} from '../Navigation/Navmenu/Navmenu'

export const Header = React.memo(function Header() {
    const [menuOpen, setMenuOpen] = useState(false)

    const handleOpenMenu = () => {
        setMenuOpen(true)
    }

    const handleCloseMenu = () => {
        setMenuOpen(false)
    }

    return (
        <div className='container-header'>
            <div className='container-header-navigation'>
                <Navmenu
                    onClickOpen={handleOpenMenu}
                    onClickClose={handleCloseMenu}
                    menuOpen={menuOpen}
                    setMenuOpen={setMenuOpen}
                />
            </div>
        </div>
    )
})
