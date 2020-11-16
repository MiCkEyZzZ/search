import React, {useCallback, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'

import './TabThird.scss'

import {
    setSelectFont,
    setSelectFontSize,
    setSelectPageSize,
    setSelectTitle
} from '../../../../redux/actions/selectAction'
import {SelectSetting} from '../../SelectSetting/SelectSetting'
import {ButtonSetting} from '../../ButtonSetting/ButtonSetting'
import {setBtnPosition} from '../../../../redux/actions/btnAction'

const fontsItems = [
    {name: 'Arial', type: 'ar'},
    {name: 'Proxima Nova', type: 'pn'},
    {name: 'Century Gothic', type: 'cg'},
    {name: 'Georgia', type: 'ga'},
    {name: 'Helvetica', type: 'ha'},
    {name: 'Helvetica Neue', type: 'hn'},
    {name: 'Tahoma', type: 'ta'}
]

const fontsSizeItems = [
    {name: 'Наибольший', type: 'most'},
    {name: 'Большой', type: 'large'},
    {name: 'Средний', type: 'mild'},
    {name: 'Маленький', type: 'small'}
]

const sizePageItems = [
    {name: 'Очнь широко', type: 'broad'},
    {name: 'Широко', type: 'wild'},
    {name: 'Нормально', type: 'normal'}
]

const styleTitleItems = [
    {name: 'On & Fixed', type: 'of'},
    {name: 'Выкл.', type: 'off'},
    {name: 'On & Dynamic', type: 'od'},
    {name: 'On & Scrolling', type: 'os'}
]

export const TabThird = ({arrowDown, arrowUp}) => {
    const dispatch = useDispatch()
    const {selectByFont, selectByFontSize, selectByPageSize, selectByTitle} = useSelector(({selection}) => selection)
    const {setButtonPosition} = useSelector(({button}) => button)
    const [visiblePanelFonts, setVisiblePanelFonts] = useState(false)
    const [visiblePanelFontsSize, setVisiblePanelFontsSize] = useState(false)
    const [visiblePanelSizePage, setVisiblePanelSizePage] = useState(false)
    const [visiblePanelStyleTitle, setVisiblePanelStyleTitle] = useState(false)

    const toggleVisiblePanelFonts = () => {
        setVisiblePanelFonts(!visiblePanelFonts)
    }

    const toggleVisiblePanelFontsSize = () => {
        setVisiblePanelFontsSize(!visiblePanelFontsSize)
    }

    const toggleVisiblePanelSizePage = () => {
        setVisiblePanelSizePage(!visiblePanelSizePage)
    }

    const toggleVisiblePanelStyleTitle = () => {
        setVisiblePanelStyleTitle(!visiblePanelStyleTitle)
    }

    const onSelectItemFonts = useCallback((type) => {
        dispatch(setSelectFont(type))
        setVisiblePanelFonts(false)
    }, [dispatch])

    const onSelectItemFontsSize = useCallback((type) => {
        dispatch(setSelectFontSize(type))
        setVisiblePanelFontsSize(false)
    }, [dispatch])

    const onSelectItemSizePage = useCallback((type) => {
        dispatch(setSelectPageSize(type))
        setVisiblePanelSizePage(false)
    }, [dispatch])

    const onSelectItemStyleTitle = useCallback((type) => {
        dispatch(setSelectTitle(type))
        setVisiblePanelStyleTitle(false)
    }, [dispatch])

    const onSetBtnPosition = useCallback((type) => {
        dispatch(setBtnPosition(type))
    }, [dispatch])

    return (
        <div className='container-third'>
            <div className="container-third-title">
                <h3 className='container-third-title__txt'>Внешний вид страницы</h3>
            </div>
            <ul className="container-third-list">
                <li className="container-third-item">
                    <div className='container-third-item-context'>
                        <div className="container-third-item-context__title">Шрифт</div>
                        <div className="container-third-item-context__description">Меняет шрифт на всём сайте</div>
                    </div>
                    <SelectSetting
                        toggleVisible={toggleVisiblePanelFonts}
                        visible={visiblePanelFonts}
                        arrowDown={arrowDown}
                        arrowUp={arrowUp}
                        items={fontsItems}
                        onClickSelectSortType={onSelectItemFonts}
                        activeSelectType={selectByFont.type}
                    />
                </li>
                <li className="container-third-item">
                    <div className='container-third-item-context'>
                        <div className="container-third-item-context__title">Размер шрифта</div>
                        <div className="container-third-item-context__description">Меняет размер шрифта на всём сайте</div>
                    </div>
                    <SelectSetting
                        toggleVisible={toggleVisiblePanelFontsSize}
                        visible={visiblePanelFontsSize}
                        arrowDown={arrowDown}
                        arrowUp={arrowUp}
                        items={fontsSizeItems}
                        onClickSelectSortType={onSelectItemFontsSize}
                        activeSelectType={selectByFontSize.type}
                    />
                </li>
                <li className="container-third-item">
                    <div className='container-third-item-context'>
                        <div className="container-third-item-context__title">Ширина страницы</div>
                        <div className="container-third-item-context__description">Регулирует ширину строки поиска и результатов</div>
                    </div>
                    <SelectSetting
                        toggleVisible={toggleVisiblePanelSizePage}
                        visible={visiblePanelSizePage}
                        arrowDown={arrowDown}
                        arrowUp={arrowUp}
                        items={sizePageItems}
                        onClickSelectSortType={onSelectItemSizePage}
                        activeSelectType={selectByPageSize.type}
                    />
                </li>
                <li className="container-third-item">
                    <div className='container-third-item-context'>
                        <div className="container-third-item-context__title">Располагать по центру</div>
                        <div className="container-third-item-context__description">Расположить результаты поиска по центру (по умолчанию — по левому краю)</div>
                    </div>
                    <ButtonSetting
                        onsetBtn={onSetBtnPosition}
                        setButtonActive={setButtonPosition}
                    />
                </li>
                <li className='container-third-item-dived'></li>
            </ul>
            <div className="container-third-title">
                <h3 className='container-third-title__txt'>Внешний вид шапки</h3>
            </div>
            <ul className="container-third-list">
                <li className="container-third-item">
                    <div className='container-third-item-context'>
                        <div className="container-third-item-context__title">Поведение заголовков</div>
                        <div className="container-third-item-context__description">Определяет, сколько места занимает заголовок и что происходит с ним при прокрутке </div>
                    </div>
                    <SelectSetting
                        toggleVisible={toggleVisiblePanelStyleTitle}
                        visible={visiblePanelStyleTitle}
                        arrowDown={arrowDown}
                        arrowUp={arrowUp}
                        items={styleTitleItems}
                        onClickSelectSortType={onSelectItemStyleTitle}
                        activeSelectType={selectByTitle.type}
                    />
                </li>
            </ul>
        </div>
    )
}
