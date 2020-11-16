import React, {useCallback, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'

import './SettingUser.scss'

import {SelectSetting} from '../../components/UI/SelectSetting/SelectSetting'
import {setSelectPageLoader} from '../../redux/actions/selectAction'
import {ToggleSwitch} from '../../components/UI/ToggleSwitch/ToggleSwitch'
import {setSwitch} from '../../redux/actions/switchAction'
import {Button} from '../../components/UI/Button/Button'

const settingItem = [
    {label: 'Страница', type: 'page'},
    {label: 'Шапка', type: 'header'},
    {label: 'Подзаголовок', type: 'subheader'},
    {label: 'Контент', type: 'content'},
    {label: 'Aside', type: 'aside'},
    {label: 'Подвал', type: 'footer'}
]

const itemsFilter = [
    {name: 'disabled', type: 'default'},
    {name: 'spinner', type: 'spinner'},
    {name: 'spinner & Message', type: 'message'},
    {name: 'spinner & Logo', type: 'logo'}
]

const arrowDown = (
    <svg className='container-select-label__icon-down' width="10" height="5" viewBox="0 0 10 5" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.29289 4.29289L0.853553 0.853553C0.538571 0.538571 0.761654 0 1.20711 0H8.79289C9.23835 0 9.46143 0.53857 9.14645 0.853553L5.70711 4.29289C5.31658 4.68342 4.68342 4.68342 4.29289 4.29289Z" fill="#D1D1D1"/></svg>
)

const arrowUp = (
    <svg className='container-select-label__icon-up' width="10" height="5" viewBox="0 0 10 5" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.29289 4.29289L0.853553 0.853553C0.538571 0.538571 0.761654 0 1.20711 0H8.79289C9.23835 0 9.46143 0.53857 9.14645 0.853553L5.70711 4.29289C5.31658 4.68342 4.68342 4.68342 4.29289 4.29289Z" fill="#D1D1D1"/></svg>
)

const settingIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="39px" height="39px" viewBox="0 0 24 24" version="1.1"><g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"><rect x="0" y="0" width="24" height="24"></rect><path d="M15.9497475,3.80761184 L13.0246125,6.73274681 C12.2435639,7.51379539 12.2435639,8.78012535 13.0246125,9.56117394 L14.4388261,10.9753875 C15.2198746,11.7564361 16.4862046,11.7564361 17.2672532,10.9753875 L20.1923882,8.05025253 C20.7341101,10.0447871 20.2295941,12.2556873 18.674559,13.8107223 C16.8453326,15.6399488 14.1085592,16.0155296 11.8839934,14.9444337 L6.75735931,20.0710678 C5.97631073,20.8521164 4.70998077,20.8521164 3.92893219,20.0710678 C3.1478836,19.2900192 3.1478836,18.0236893 3.92893219,17.2426407 L9.05556629,12.1160066 C7.98447038,9.89144078 8.36005124,7.15466739 10.1892777,5.32544095 C11.7443127,3.77040588 13.9552129,3.26588995 15.9497475,3.80761184 Z" fill="#1390e5"></path><path d="M16.6568542,5.92893219 L18.0710678,7.34314575 C18.4615921,7.73367004 18.4615921,8.36683502 18.0710678,8.75735931 L16.6913928,10.1370344 C16.3008685,10.5275587 15.6677035,10.5275587 15.2771792,10.1370344 L13.8629656,8.7228208 C13.4724413,8.33229651 13.4724413,7.69913153 13.8629656,7.30860724 L15.2426407,5.92893219 C15.633165,5.5384079 16.26633,5.5384079 16.6568542,5.92893219 Z" fill="#1390e5" opacity="0.3"></path></g></svg>
)

export const SettingUser = () => {
    const dispatch = useDispatch()
    const {darkmode} = useSelector(({themes}) => themes)
    const {selectByPageLoader} = useSelector(({selection}) => selection)
    const {checked} = useSelector(({radio}) => radio)
    const [visiblePanelPageLoader, setVisiblePageLoader] = useState(false)

    const toggleVisiblePanelPageLoader = () => {
        setVisiblePageLoader(!visiblePanelPageLoader)
    }

    const onSelectItemPageLoader = useCallback((type) => {
        dispatch(setSelectPageLoader(type))
        setVisiblePageLoader(false)
    }, [dispatch])

    const onSetBtnSwitch = useCallback((type) => {
        dispatch(setSwitch(type))
    }, [dispatch])

    return (
        <div className='container-setting-user'>
            <div className="container-setting-user-container">
                <div className="container-setting-user__alert">
                    <div className='container-setting-user__alert-icon'>
                        <i className="container-setting-user__alert-icon-img">
                            {settingIcon}
                        </i>
                    </div>
                    <div className='container-setting-user__alert-text'>
                        <article className='container-setting-user__alert-text-txt'>Конструктор помогает вам устанавливать и конфигурировать предпочитаемые отображения внешнего вида вашего приложения, а так же просматривать изменения в реальном времени. Конфигурируйте внешний вид, настройки будут сохранены до вашего изменения или сброса. Используйте конструктор, выбирайте варианты стилей и нажимайте на кнопку&nbsp;
                            <code>Предпросмотр</code> для просмотра изминений, а так же нажимая на кнопку&nbsp;
                            <code>Экспорт</code>&nbsp;для возможности загрузить шиблон разметки и все включающие в него части изменений. В загрузочной папке разделы(шапки, подвала, aside, и.д.) будут размещены и разделены из базовой стилизации позволяющая вам интегрировать основные стили оформления в вашем приложении.</article>
                        <article className='container-setting-user__alert-text-txt'>
                            <span className="container-setting-user__alert-text-label">ВНИМАНИЕ:</span>Загружаемые
                            варианты настроек не включают в себя свойства папки создаваемая конструктором, главная
                            цель помочь с генерировать окончательные код разметки без каких-либо трудностей.</article>
                    </div>
                </div>
                <div className="container-setting-user__setting">
                    <div className="container-setting-user__setting-header">
                        <ul className="container-setting-user__setting-header-list">
                            {settingItem.map((item, i) => {
                                return (
                                    <li
                                        key={`${item}_${i}`}
                                        className="container-setting-user__setting-header-item">
                                        <span
                                            className='container-setting-user__setting-header-item-link'
                                        >
                                            {item.label}
                                        </span>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                    <div className="container-setting-user__setting-body">
                        <div className="container-setting-user__setting-body-tab">
                            <div className='container-setting-user__setting-body-first'>
                                <label className='container-setting-user__setting-body-label'>Page Loader:</label>
                                <div className="container-setting-user__setting-body-first-select">
                                    <SelectSetting
                                        toggleVisible={toggleVisiblePanelPageLoader}
                                        visible={visiblePanelPageLoader}
                                        arrowDown={arrowDown}
                                        arrowUp={arrowUp}
                                        items={itemsFilter}
                                        onClickSelectSortType={onSelectItemPageLoader}
                                        activeSelectType={selectByPageLoader.type}
                                    />
                                </div>
                            </div>
                            <div className='container-setting-user__setting-body-second'>
                                <label className='container-setting-user__setting-body-label'>Page Toolbar:</label>
                                <div className="container-setting-user__setting-body-second-switch">
                                    <ToggleSwitch
                                        activeSwitchType={checked}
                                        onToggleChecked={onSetBtnSwitch}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container-setting-user__setting-footer">
                        <div className="container-setting-user__setting-footer-row">
                            <Button
                                title='Применить'
                                className={darkmode ? 'container-setting-user__setting-footer-prev dark' : 'container-setting-user__setting-footer-prev'}
                            />
                            <Button
                                title='Экспортировать'
                                className={darkmode ? 'container-setting-user__setting-footer-exp dark' : 'container-setting-user__setting-footer-exp'}
                            />
                            <Button
                                title='Сбросить'
                                className={darkmode ? 'container-setting-user__setting-footer-res' : 'container-setting-user__setting-footer-res'}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
