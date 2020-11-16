import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom'

import './Login.scss'

import logo from '../../assets/logo.png'

import {AuthContext} from '../../context/AuthContext'
import {useHttp} from '../../hooks/http.hook'
import {useMessage} from '../../hooks/message.hook'
import PropTypes from 'prop-types'
import {Button} from '../../components/UI/Button/Button'

const showIcon = (
    <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke= '#1390E5' strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 15a3 3 0 100-6 3 3 0 000 6z" stroke= '#1390E5' strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
)

const hideIcon = (
    <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.12 14.12a3.001 3.001 0 01-5.194-2.098A3 3 0 019.88 9.88m8.06 8.06A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94l11.88 11.88zM9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.498 18.498 0 01-2.16 3.19L9.9 4.24zM1 1l22 22" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
)

export const Login = () => {
    const {darkmode} = useSelector(({themes}) => themes)
    const message = useMessage()
    const auth = useContext(AuthContext)
    const {loading, request, error, clearError} = useHttp()
    const [form, setForm] = useState({
        email: '',
        password: ''
    })
    const [type, setType] = useState('password')

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    const changeTypeToggle = useCallback(() => {
        if (type) {
            setType('')
        } else {
            setType('password')
        }
    }, [type])

    const handleChangeInput = evt => {
        setForm({...form, [evt.target.name]: evt.target.value})
    }

    const handleLogin = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', {...form})
            auth.login(data.token, data.userId, data.userName, data.userEmail)
        } catch (e) {}
    }

    return (
        <div className='auth-login'>
            <div className={darkmode ? "auth-login__form dark" : "auth-login__form"}>
                <div className="auth-login__form-logo">
                    <img src={logo} alt="logo" />
                </div>
                <h2 className={darkmode ? 'auth-login__form-title dark' : 'auth-login__form-title'}>Вход в систему</h2>
                <p className='auth-login__form-subtitle'>Введите данные для входа в систему:</p>
                <div className='auth-login__form-form'>
                    <div>
                        <div className="auth-login__form-form-input">
                            <label className='auth-login__form-form-label' htmlFor="email">Адрес эл. почты</label>
                            <input
                                className={darkmode ? 'auth-login__form-form-inp dark' : 'auth-login__form-form-inp'}
                                id='email'
                                name='email'
                                type="text"
                                value={form.email}
                                onChange={handleChangeInput}
                            />
                        </div>
                        <div className="auth-login__form-form-input">
                            <label className='auth-login__form-form-label' htmlFor="password">Пароль</label>
                            <div className='auth-login__form-form-icon'>
                                <input
                                    className={darkmode ? 'auth-login__form-form-inp dark' : 'auth-login__form-form-inp'}
                                    id='password'
                                    name='password'
                                    type={type}
                                    value={form.password}
                                    onChange={handleChangeInput}
                                />
                                <button
                                    className="auth-login__form-form-icon--btn"
                                    onClick={changeTypeToggle}
                                >
                                    {type ? hideIcon : showIcon}
                                </button>
                            </div>
                        </div>
                        <div className="auth-login__form-form-input">
                            <Link
                                className={darkmode ? 'auth-login__form-form-forgot dark' : 'auth-login__form-form-forgot'}
                                to='/reset'
                            >
                                Забыли пароль ?
                            </Link>
                        </div>
                        <div className="auth-login__form-form-button">
                            <Button
                                title='Войти'
                                className={darkmode ? 'auth-login__form-form-button--lg dark' : 'auth-login__form-form-button--lg'}
                                onClickButton={handleLogin}
                                disabled={loading}
                            />
                            <Link
                                className={darkmode ? 'auth-login__form-form-button--link dark' : 'auth-login__form-form-button--link'}
                                to='/registration'
                            >
                                Создать аккаунт
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

Login.protoType = {
    handleChangeInput: PropTypes.func.isRequired,
    handleLogin: PropTypes.func.isRequired
}
