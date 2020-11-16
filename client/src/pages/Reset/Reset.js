import React, {useEffect, useState} from 'react'
import {useHistory} from 'react-router-dom'
import {useSelector} from 'react-redux'

import './Reset.scss'

import logo from '../../assets/logo.png'
import {useHttp} from '../../hooks/http.hook'
import {useMessage} from '../../hooks/message.hook'
import {Button} from '../../components/UI/Button/Button'

export const Reset = () => {
    const {darkmode} = useSelector(({themes}) => themes)
    const history = useHistory()
    const message = useMessage()
    const {loading, request, error, clearError} = useHttp()
    const [reset, setReset] = useState({
        email: ''
    })

    const handleChangeInput = evt => {
        setReset({...reset, [evt.target.name]: evt.target.value})
    }

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    const handleReset = async () => {
        try {
            const data = await request('/api/auth/reset', 'POST', {...reset})
            message(data.message)
            setReset({email: ''})
            history.push('/login')
        } catch (e) {}
    }

    const handleCancel = () => {
        history.push('/login')
    }

    return (
        <div className='auth-reset'>
            <div className={darkmode ? "auth-reset__form dark" : "auth-reset__form"}>
                <div className="auth-reset__form-logo">
                    <img src={logo} alt="logo" />
                </div>
                <h2 className={darkmode ? 'auth-reset__form-title dark' : 'auth-reset__form-title'}>Забыли пароль?</h2>
                <p className='auth-reset__form-subtitle'>Введите адрес эл. почты для сброса пароля</p>
                <div className='auth-reset__form-form'>
                    <div>
                        <div className="auth-reset__form-form-input">
                            <label className='auth-reset__form-form-input--lb' htmlFor="email">Адрес эл. почты</label>
                            <input
                                className={darkmode ? 'auth-reset__form-form-input--inp dark' : 'auth-reset__form-form-input--inp'}
                                id='email'
                                name='email'
                                type="text"
                                value={reset.email}
                                onChange={handleChangeInput}
                            />
                        </div>
                        <div className="auth-reset__form-form-button">
                            <Button
                                title='Отправить'
                                className={darkmode ? 'auth-reset__form-form-button--lg dark' : 'auth-reset__form-form-button--lg'}
                                onClickButton={handleReset}
                                disabled={loading}
                            />
                            <Button
                                title='Отменить'
                                className={darkmode ? 'auth-reset__form-form-button--cancel dark' : 'auth-reset__form-form-button--cancel'}
                                onClickButton={handleCancel}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
