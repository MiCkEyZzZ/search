import React from 'react'
import {useSelector} from 'react-redux'

import './ButtonSetting.scss'

export const ButtonSetting = React.memo(function ButtonSetting({onsetBtn, setButtonActive}) {
    const {darkmode} = useSelector(({themes}) => themes)

    const toggleChangeClick = () => {
        if (onsetBtn) {
            onsetBtn()
        }
    }

    return (
        <div className={darkmode ? 'container-button-check dark' : 'container-button-check'}>
            <button
                className={setButtonActive ? 'container-button-check__btn active' : 'container-button-check__btn'}
                onClick={toggleChangeClick}
            >
                {setButtonActive ? 'Вкл.' : 'Выкл'}
            </button>
        </div>
    )
})
