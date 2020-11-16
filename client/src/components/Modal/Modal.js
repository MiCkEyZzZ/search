import React, {useCallback, useContext, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'

import './Modal.scss'

import {Backdrop} from '../Backdrop/Backdrop'
import {Select} from '../Select/Select'
import {RangeSlider} from '../UI/RangeSlider/RangeSlider'
import {AuthContext} from '../../context/AuthContext'
import {useHttp} from '../../hooks/http.hook'
import {setSelect} from '../../redux/actions/selectAction'
import {Button} from '../UI/Button/Button'

const sortItems = [
    {name: 'По релевантности', type: 'relevant'},
    {name: 'По дате загрузки', type: 'date'},
    {name: 'По числу просмотров', type: 'viewers'},
    {name: 'По рейтингу', type: 'rank'}
]

export const Modal = ({query, handleClose, setHelperOpen, setModalOpen, setQuery}) => {
    const dispatch = useDispatch()
    const auth = useContext(AuthContext)
    const {request} = useHttp()
    const [title, setTitle] = useState('')
    const [valueRange, setValueRange] = useState()
    const {selectBySort} = useSelector(({selection}) => selection)
    const {darkmode} = useSelector(({themes}) => themes)
    const {setRangeSlider, defaultValue} = useSelector(({slider}) => slider)

    const handleSaveQuery = async () => {
        if (!query.trim() && !title.trim()) {
            return
        }

        try {
            await request('/api/query/generate', 'POST', {quest: query, title}, {
                Authorization: `Bearer ${auth.token}`
            })
        } catch (e) {}

        setModalOpen(false)

        setHelperOpen(true)
    }

    const onSelectSortType = useCallback((type) => {
        dispatch(setSelect(type))
    }, [dispatch])

    const onChangeRange = (evt) => {
        setValueRange(evt.target.value)
    }

    return (
        <>
            <div className={darkmode ? 'container-modal dark' : 'container-modal'}>
                <div className="container-modal-title">
                    <h3 className={darkmode ? 'container-modal-title__txt dark' : 'container-modal-title__txt'}>Сохранить запрос</h3>
                </div>
                <div className="container-modal__field">
                    <div className="container-modal__field-title">
                        <p className='container-modal__field-title-txt'>Запрос</p>
                    </div>
                    <input
                        className={darkmode ? 'container-modal__field-label dark' : 'container-modal__field-label'}
                        id='query'
                        type="text"
                        name='query'
                        value={query}
                        onChange={evt => setQuery(evt.target.value)}
                    />
                </div>
                <div className="container-modal__field">
                    <div className="container-modal__field-title">
                        <p className='container-modal__field-title-txt'>
                            <i className='container-modal__field-title-txt--point'>*</i>
                            Название
                        </p>
                    </div>
                    <input
                        className={darkmode ? 'container-modal__field-label dark' : 'container-modal__field-label'}
                        id='title'
                        type="text"
                        name='title'
                        value={title}
                        onChange={evt => setTitle(evt.target.value)}
                        placeholder='Укажите название'
                    />
                </div>
                <div className="container-modal__field">
                    <div className="container-modal__field-title">
                        <p className='container-modal__field-title-txt'>Сортировать по</p>
                    </div>
                    <Select
                        activeSelectType={selectBySort.type}
                        items={sortItems}
                        onClickSelectSortType={onSelectSortType}
                    />
                </div>
                <RangeSlider
                    defaultValue={defaultValue}
                    value={valueRange}
                    onChangeRange={onChangeRange}
                />
                <div className="container-modal__buttons">
                    <Button
                        title='Не сохранять'
                        className={darkmode ? 'container-modal__buttons-cancel dark' : 'container-modal__buttons-cancel'}
                        onClickButton={handleClose}
                    />
                    <Button
                        title='Сохранить'
                        className={darkmode ? 'container-modal__buttons-save dark' : 'container-modal__buttons-save'}
                        onClickButton={handleSaveQuery}
                    />
                </div>
            </div>
            {<Backdrop onClick={handleClose} />}
        </>
    )
}
