import React, {useCallback, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'

import './TabFirst.scss'

import {setSelectCountry, setSelectLanguage, setSelectSave} from '../../../../redux/actions/selectAction'
import {SelectSetting} from '../../SelectSetting/SelectSetting'
import {ButtonSetting} from '../../ButtonSetting/ButtonSetting'
import {
    setBtnAd,
    setBtnAuto,
    setBtnAutoLoad,
    setBtnHot,
    setBtnPrompt,
    setBtnQuick,
    setBtnWindow
} from '../../../../redux/actions/btnAction'

const countryItems = [
    {name: 'Все регионы', type: 'all'},
    {name: 'Россия', type: 'россия'},
    {name: 'France', type: 'france'},
    {name: 'Deutschland', type: 'deutschland'},
    {name: 'España', type: 'españa'},
    {name: '日本', type: '日本'},
    {name: '中華人民共和國', type: '中華人民共和國'},
    {name: 'المملكة العربية السعودية', type: 'المملكة العربية السعودية'},
    {name: 'Türkiye', type: 'türkiye'},
    {name: 'Português', type: 'português'},
    {name: 'England', type: 'england'}
]

const countryLanguage = [
    {name: 'Русский', type: 'ru'},
    {name: 'Français', type: 'fr'},
    {name: 'Deutsch', type: 'du'},
    {name: 'Español', type: 'esp'},
    {name: '日本語', type: '日本'},
    {name: '漢語, 汉语', type: '中華'},
    {name: 'عربي', type: 'ar'},
    {name: 'Türkçe', type: 'tu'},
    {name: 'Portugal', type: 'prt'},
    {name: 'English', type: 'eng'}
]

const countrySave = [
    {name: 'Умеренный', type: 'mild'},
    {name: 'Строгий', type: 'strong'},
    {name: 'Выкл.', type: 'off'}
]

export const TabFirst = React.memo(function TabFirst({arrowDown, arrowUp}) {
    const dispatch = useDispatch()
    const {selectByCountry, selectByLanguage, selectBySave} = useSelector(({selection}) => selection)
    const {
            setButtonQuick,
            setButtonAutoLoad,
            setButtonAuto,
            setButtonPrompt,
            setButtonWindow,
            setButtonAd,
            setButtonHot
        } = useSelector(({button}) => button)
    const [visiblePanelCountry, setVisiblePanelCountry] = useState(false)
    const [visiblePanelLanguage, setVisiblePanelLanguage] = useState(false)
    const [visiblePanelSave, setVisiblePanelSave] = useState(false)

    const toggleVisiblePanelCountry = () => {
        setVisiblePanelCountry(!visiblePanelCountry)
    }

    const toggleVisiblePanelLanguage = () => {
        setVisiblePanelLanguage(!visiblePanelLanguage)
    }

    const toggleVisiblePanelSave = () => {
        setVisiblePanelSave(!visiblePanelSave)
    }

    const onSelectItemCountry = useCallback((type) => {
        dispatch(setSelectCountry(type))
        setVisiblePanelCountry(false)
    }, [dispatch])

    const onSelectItemLanguage = useCallback((type) => {
        dispatch(setSelectLanguage(type))
        setVisiblePanelLanguage(false)
    }, [dispatch])

    const onSelectItemSave = useCallback((type) => {
        dispatch(setSelectSave(type))
        setVisiblePanelSave(false)
    }, [dispatch])

    const onSetBtnQuick = useCallback((type) => {
        dispatch(setBtnQuick(type))
    }, [dispatch])

    const onSetBtnAutoLoad = useCallback((type) => {
        dispatch(setBtnAutoLoad(type))
    }, [dispatch])

    const onSetBtnAuto = useCallback((type) => {
        dispatch(setBtnAuto(type))
    }, [dispatch])

    const onSetBtnPrompt = useCallback((type) => {
        dispatch(setBtnPrompt(type))
    }, [dispatch])

    const onSetBtnWindow = useCallback((type) => {
        dispatch(setBtnWindow(type))
    }, [dispatch])

    const onSetBtnAd = useCallback((type) => {
        dispatch(setBtnAd(type))
    }, [dispatch])

    const onSetBtnHot = useCallback((type) => {
        dispatch(setBtnHot(type))
    }, [dispatch])

    return (
        <div className="container-first">
            <ul className="container-first-list">
                <li className="container-first-item">
                    <div className="container-first-context">
                        <div className="container-first-context__title">Регион</div>
                        <div className="container-first-context__description">Меняет результаты выдачи на специфичные для данного региона.</div>
                    </div>
                    <SelectSetting
                        toggleVisible={toggleVisiblePanelCountry}
                        visible={visiblePanelCountry}
                        arrowDown={arrowDown}
                        arrowUp={arrowUp}
                        items={countryItems}
                        onClickSelectSortType={onSelectItemCountry}
                        activeSelectType={selectByCountry.type}
                    />
                </li>
                <li className="container-first-item">
                    <div className="container-first-context">
                        <div className="container-first-context__title">Язык</div>
                        <div className="container-first-context__description">Меняет язык на всём сайте.</div>
                    </div>
                    <SelectSetting
                        toggleVisible={toggleVisiblePanelLanguage}
                        visible={visiblePanelLanguage}
                        arrowDown={arrowDown}
                        arrowUp={arrowUp}
                        items={countryLanguage}
                        onClickSelectSortType={onSelectItemLanguage}
                        activeSelectType={selectByLanguage.type}
                    />
                </li>
                <li className='container-first-item-divide'></li>
                <li className="container-first-item">
                    <div className="container-first-context">
                        <div className="container-first-context__title">Безопасный поиск</div>
                        <div className="container-first-context__description">Исключает из выдачи нежелательные материалы.</div>
                    </div>
                    <SelectSetting
                        toggleVisible={toggleVisiblePanelSave}
                        visible={visiblePanelSave}
                        arrowDown={arrowDown}
                        arrowUp={arrowUp}
                        items={countrySave}
                        onClickSelectSortType={onSelectItemSave}
                        activeSelectType={selectBySave.type}
                    />
                </li>
                <li className="container-first-item">
                    <div className="container-first-context">
                        <div className="container-first-context__title">Быстрые ответы</div>
                        <div className="container-first-context__description">Автоматически открывать подходящие Быстрые Ответы.</div>
                    </div>
                    <ButtonSetting
                        onsetBtn={onSetBtnQuick}
                        setButtonActive={setButtonQuick}
                    />
                </li>
                <li className='container-first-item-divide'></li>
                <li className="container-first-item">
                    <div className="container-first-context">
                        <div className="container-first-context__title">Автоматическая прогрузка страницы изображений и видео</div>
                        <div className="container-first-context__description">Загружать больше картинок и видео при скролинге.</div>
                    </div>
                    <ButtonSetting
                        onsetBtn={onSetBtnAutoLoad}
                        setButtonActive={setButtonAutoLoad}
                    />
                </li>
                <li className="container-first-item">
                    <div className="container-first-context">
                        <div className="container-first-context__title">Автозагрузка</div>
                        <div className="container-first-context__description">Подгружает дополнительные результаты при прокрутке.</div>
                    </div>
                    <ButtonSetting
                        onsetBtn={onSetBtnAuto}
                        setButtonActive={setButtonAuto}
                    />
                </li>
                <li className="container-first-item">
                    <div className="container-first-context">
                        <div className="container-first-context__title">Авто-подсказки</div>
                        <div className="container-first-context__description">Показывать предложения под строкой поиска во время ввода.</div>
                    </div>
                    <ButtonSetting
                        onsetBtn={onSetBtnPrompt}
                        setButtonActive={setButtonPrompt}
                    />
                </li>
                <li className="container-first-item">
                    <div className="container-first-context">
                        <div className="container-first-context__title">Новое окно</div>
                        <div className="container-first-context__description">Открывать ссылки результата поиска в новом окне/вкладке.</div>
                    </div>
                    <ButtonSetting
                        onsetBtn={onSetBtnWindow}
                        setButtonActive={setButtonWindow}
                    />
                </li>
                <li className="container-first-item">
                    <div className="container-first-context">
                        <div className="container-first-context__title">Реклама</div>
                        <div className="container-first-context__description">Если хотите поддержать нас, помогите распространить Поиск видео.</div>
                    </div>
                    <ButtonSetting
                        onsetBtn={onSetBtnAd}
                        setButtonActive={setButtonAd}
                    />
                </li>
                <li className="container-first-item">
                    <div className="container-first-context">
                        <div className="container-first-context__title">Горячие клавиши</div>
                        <div className="container-first-context__description">Включить горячие клавиши на сайте.</div>
                    </div>
                    <ButtonSetting
                        onsetBtn={onSetBtnHot}
                        setButtonActive={setButtonHot}
                    />
                </li>
            </ul>
        </div>
    )
})
