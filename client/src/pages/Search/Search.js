import React, {useState} from 'react'
import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom'

import './Search.scss'

import {Modal} from '../../components/Modal/Modal'
import {Grid} from '../../components/Grid/Grid'
import {Helper} from '../../components/Helper/Helper'
import {YOUTUBE_API_KEY, YOUTUBE_SEARCH} from '../../apis/api'

const list = (
    <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><g stroke="#272727" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/></g></svg>
)

const listDark = (
    <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><g stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/></g></svg>
)

const grid = (
    <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path stroke="#272727" d="M10 5H5v5h5V5zM19 5h-5v5h5V5zM19 14h-5v5h5v-5zM10 14H5v5h5v-5z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
)

const gridDark = (
    <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path stroke="#ffffff" d="M10 5H5v5h5V5zM19 5h-5v5h5V5zM19 14h-5v5h5v-5zM10 14H5v5h5v-5z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
)

const saveIcon = (
    <svg width="24" height="22" viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20.8401 3.60999C20.3294 3.099 19.7229 2.69364 19.0555 2.41708C18.388 2.14052 17.6726 1.99817 16.9501 1.99817C16.2276 1.99817 15.5122 2.14052 14.8448 2.41708C14.1773 2.69364 13.5709 3.099 13.0601 3.60999L12.0001 4.66999L10.9401 3.60999C9.90843 2.5783 8.50915 1.9987 7.05012 1.9987C5.59109 1.9987 4.19181 2.5783 3.16012 3.60999C2.12843 4.64169 1.54883 6.04096 1.54883 7.49999C1.54883 8.95903 2.12843 10.3583 3.16012 11.39L4.22012 12.45L12.0001 20.23L19.7801 12.45L20.8401 11.39C21.3511 10.8792 21.7565 10.2728 22.033 9.60535C22.3096 8.93789 22.4519 8.22248 22.4519 7.49999C22.4519 6.77751 22.3096 6.0621 22.033 5.39464C21.7565 4.72718 21.3511 4.12075 20.8401 3.60999V3.60999Z" stroke="#1390E5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
)

const savedIcon = (
    <svg width="24" height="22" viewBox="0 0 24 22" fill="#c5e4f9" xmlns="http://www.w3.org/2000/svg"><path d="M20.8401 3.60999C20.3294 3.099 19.7229 2.69364 19.0555 2.41708C18.388 2.14052 17.6726 1.99817 16.9501 1.99817C16.2276 1.99817 15.5122 2.14052 14.8448 2.41708C14.1773 2.69364 13.5709 3.099 13.0601 3.60999L12.0001 4.66999L10.9401 3.60999C9.90843 2.5783 8.50915 1.9987 7.05012 1.9987C5.59109 1.9987 4.19181 2.5783 3.16012 3.60999C2.12843 4.64169 1.54883 6.04096 1.54883 7.49999C1.54883 8.95903 2.12843 10.3583 3.16012 11.39L4.22012 12.45L12.0001 20.23L19.7801 12.45L20.8401 11.39C21.3511 10.8792 21.7565 10.2728 22.033 9.60535C22.3096 8.93789 22.4519 8.22248 22.4519 7.49999C22.4519 6.77751 22.3096 6.0621 22.033 5.39464C21.7565 4.72718 21.3511 4.12075 20.8401 3.60999V3.60999Z" stroke="#1390E5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
)

const searchIcon = (
    <svg height="32" width="32" xmlns="http://www.w3.org/2000/svg"><path d="M19.427 21.427a8.5 8.5 0 112-2l5.585 5.585c.55.55.546 1.43 0 1.976l-.024.024a1.399 1.399 0 01-1.976 0l-5.585-5.585zM14.5 21a6.5 6.5 0 100-13 6.5 6.5 0 000 13z" fillRule="evenodd"/></svg>
)

export const Search = () => {
    const {darkmode} = useSelector(({themes}) => themes)
    const [modalOpen, setModalOpen] = useState(false)
    const [helperOpen, setHelperOpen] = useState(false)
    const [query, setQuery] = useState('')
    const [videos, setVideos] = useState([])
    const [queryTitle, setQueryTitle] = useState('')
    const [active, setActive] = useState(false)
    const [activeGrid, setActiveGrid] = useState(true)
    const [activeList, setActiveList] = useState(false)
    const [result, setResult] = useState('')

    const handleModalOpen = () => {
        if (query === '') {
            setModalOpen(false)
            return console.log('Please, enter your Query')
        }

        setModalOpen(true)
    }

    const handleModalClose = () => {
        setModalOpen(false)
    }

    const handleChangeViewList = () => {
        setActiveGrid(false)
        setActiveList(true)
    }

    const handleChangeViewGrid = () => {
        setActiveList(false)
        setActiveGrid(true)
    }

    const handleClickSearch = async () => {
        if (!query || query.trim() === '') {
            setActive(false)
            return setVideos([])
        }

        try {
            const result = await fetch(`${YOUTUBE_SEARCH}?q=${query}&part=snippet&maxResults=12&videoType=any&type=video&key=${YOUTUBE_API_KEY}`)
            const data = await result.json()

            setVideos(data.items)

            const {pageInfo = {}} = data
            const {totalResults} = pageInfo
            setActive(true)
            setQueryTitle(query)
            setResult(totalResults)
        } catch (e) {}
    }

    return (
        <>
            <div className={!active ? 'search' : 'search active'}>
                <div className="search-wrapper">
                    <div className="search-container">
                        <div className="search-container__title">
                            <h1 className={darkmode ? 'search-container__title-text dark' : 'search-container__title-text'}>Поиск видео</h1>
                        </div>
                        <div className="search-container-controls">
                            <input
                                className={darkmode ? 'search-container-controls__input dark' : 'search-container-controls__input'}
                                id='query'
                                type="text"
                                autoComplete="off"
                                value={query}
                                onChange={evt => setQuery(evt.target.value)}
                            />
                            <button
                                className='search-container__save-button'
                                onClick={handleModalOpen}
                            >
                                {!helperOpen ? saveIcon : savedIcon}
                            </button>
                            <button
                                className={darkmode ? 'search-container-controls__button dark' : 'search-container-controls__button'}
                                type='submit'
                                onClick={handleClickSearch}
                            >
                                {searchIcon}
                            </button>
                        </div>
                        <div className="search-container-information">
                            <div className='search-container-information__text'>
                                Максимум конфиденциальности, минимум усилий.&nbsp;
                                <Link to='/spread' className='search-container-information__link'>Помогите распространить Поиск!</Link>
                            </div>
                        </div>
                    </div>
                    <div className="container-filters-panel">
                        <div className="container-filter-panel__result">
                            <div className='container-filter-panel__result-title'>
                                <p className={darkmode ? 'container-filter-panel__result-title--txt dark' : 'container-filter-panel__result-title--txt'}>
                                    Нашлось по запросу  <span className={darkmode ? 'container-filter-panel__result-title-weight dark' : 'container-filter-panel__result-title-weight'}>«{queryTitle}...»</span>
                                </p>
                            </div>
                            <div className='container-filter-panel__result-count'>
                                <p className={darkmode ? 'container-filter-panel__result-count--txt dark' : 'container-filter-panel__result-count--txt'}>{result}</p>
                            </div>
                        </div>
                        <div className="container-view">
                            <button
                                className={activeList ? 'container-view__list active' : 'container-view__list'}
                                type='button'
                                onClick={handleChangeViewList}
                            >
                                {darkmode ? listDark : list}
                            </button>
                            <button
                                className={activeGrid ? 'container-view__grid active' : 'container-view__grid'}
                                type='button'
                                onClick={handleChangeViewGrid}
                            >
                                {darkmode ? gridDark : grid}
                            </button>
                        </div>
                    </div>
                    {active ? <Grid items={videos} active={activeGrid} /> : null}
                </div>
                {modalOpen && (
                    <Modal
                        handleClose={handleModalClose}
                        setHelperOpen={setHelperOpen}
                        setModalOpen={setModalOpen}
                        query={query}
                        setQuery={setQuery}
                    />)}
                {helperOpen && <Helper />}
            </div>
        </>
    )
}
