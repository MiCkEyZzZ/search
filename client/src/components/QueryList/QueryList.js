import React from 'react'
import {useSelector} from 'react-redux'

import './QueryList.scss'

const editIcon = (
    <svg width="16" height="16" fill="none"><path d="M14.138 2.986a1.5 1.5 0 01.021 2.1l-5.417 5.641a1.5 1.5 0 01-1.05.46l-2.275.049.048-2.291a1.5 1.5 0 01.442-1.032l5.537-5.506a1.5 1.5 0 012.118.003l.576.576z"/><path d="M8.6 1.333a.667.667 0 010 1.334H4c-.736 0-1.333.597-1.333 1.333v8c0 .736.597 1.333 1.333 1.333h8c.736 0 1.333-.597 1.333-1.333V8.667a.667.667 0 111.334 0V12A2.667 2.667 0 0112 14.667H4A2.667 2.667 0 011.333 12V4A2.667 2.667 0 014 1.333h4.6z"/></svg>
)

const trashIcon = (
    <svg width="18" height="18" fill="none"><path d="M4.5 6v9A1.5 1.5 0 006 16.5h6a1.5 1.5 0 001.5-1.5V6h-9z"/><path d="M10.5 3.375V3.25a1 1 0 00-1-1h-1a1 1 0 00-1 1v.125H4.25a.5.5 0 00-.5.5V4a.5.5 0 00.5.5h9.5a.5.5 0 00.5-.5v-.125a.5.5 0 00-.5-.5H10.5z"/></svg>
)

export const QueryList = ({queries, handleChange, handleDelete}) => {
    const {darkmode} = useSelector(({themes}) => themes)

    if (!queries.length) {
        return (
            <div className="container-query-items">
                <div className="container-query-items__empty">
                    <p className={darkmode ? 'container-query-items__empty-title dark' : 'container-query-items__empty-title'}>Сохранённых запросов пока нет.</p>
                </div>
            </div>
        )
    }

    return (
        <div className="container-query-items">
            <ul className={darkmode ? "container-query-items_list-items dark" : "container-query-items_list-items"}>
                {queries.map((query, i) => {
                    return (
                        <li
                            key={`${query.id}_${i}`}
                            className={darkmode ? 'container-query-items__list-item dark' : 'container-query-items__list-item'}
                        >
                            <p className={darkmode ? 'container-query-items__list-item--txt dark' : 'container-query-items__list-item--txt'}>{query.quest}</p>
                            <div className="container-query-items__control">
                                <button
                                    className='container-query-items__control-btn container-query-items__control-btn--change'
                                    type='button'
                                    onClick={handleChange}
                                >
                                    {editIcon}
                                </button>
                                <button
                                    className='container-query-items__control-btn container-query-items__control-btn--delete'
                                    type='button'
                                    onClick={handleDelete}
                                >
                                    {trashIcon}
                                </button>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}
