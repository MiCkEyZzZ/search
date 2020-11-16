import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useSelector} from 'react-redux'

import './Favorites.scss'

import {useHttp} from '../../hooks/http.hook'
import {AuthContext} from '../../context/AuthContext'
import {QueryList} from '../../components/QueryList/QueryList'
import {Modal} from '../../components/Modal/Modal'

export const Favorites = () => {
    const {darkmode} = useSelector(({themes}) => themes)
    const [modalOpen, setModalOpen] = useState(false)
    const [queries, setQueries] = useState([])
    const {loading, request} = useHttp()
    const {token} = useContext(AuthContext)

    const handleModalChange = () => {
        setModalOpen(true)
    }

    const handleModalClose = () => {
        setModalOpen(false)
    }

    const handleSaveQuery = async () => {
        console.log('Query was changed.')
        await request('/api/query/edit/:id', 'POST', null, {
            Authorization: `Bearer ${token}`
        })
        setModalOpen(false)
    }

    const fetchLinks = useCallback(async () => {
        try {
            const fetched = await request('/api/query', 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setQueries(fetched)
        } catch (e) {}
    }, [token, request])

    useEffect(() => {
        fetchLinks()
    }, [fetchLinks])

    const handleQueryRemove = async () => {
        await request('/api/query/delete/:id', 'delete', null, {
            Authorization: `Bearer ${token}`
        })

        fetchLinks()
    }

    return (
        <div className={darkmode ? 'favorites dark' : 'favorites'}>
            <div className="favorites-wrapper">
                <div className="favorites-container">
                    <div className="favorites-container__title">
                        <h1 className={darkmode ? 'favorites-container__title-text dark' : 'favorites-container__title-text'}>Избранное</h1>
                    </div>
                    {!loading && (
                        <QueryList
                            handleDelete={handleQueryRemove}
                            queries={queries}
                            handleChange={handleModalChange}
                            modalOpen={modalOpen}
                        />
                    )}
                </div>
            </div>
            {modalOpen && (
                <Modal
                    handleClose={handleModalClose}
                    handleSave={handleSaveQuery}
                    query={queries}
                />)}
        </div>
    )
}
