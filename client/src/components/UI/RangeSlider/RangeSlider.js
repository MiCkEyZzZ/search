import React from 'react'
import {useSelector} from 'react-redux'

import './RangeSlider.scss'

export const RangeSlider = ({value, onChangeRange, defaultValue}) => {
    const {darkmode} = useSelector(({themes}) => themes)

    return (
        <div className="container-range-slider">
            <div className='container-range-slider-title'>
                <p className='container-range-slider-title__txt'>Максимальное количество</p>
            </div>
            <div type="slider" className='container-range-slider-slider'>
                <input
                    type="range"
                    value={value}
                    className={darkmode ? 'container-range-slider-slider__input dark' : 'container-range-slider-slider__input'}
                    onChange={onChangeRange}
                />
                <div
                    className={darkmode ? 'container-range-slider-slider__result dark' : 'container-range-slider-slider__result'}
                >
                    {defaultValue}
                </div>
            </div>
        </div>
    )
}
