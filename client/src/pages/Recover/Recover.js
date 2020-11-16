import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import {useHistory} from 'react-router-dom'

import './Recover.scss'

import {useMessage} from '../../hooks/message.hook'
import {useHttp} from '../../hooks/http.hook'
import {AuthContext} from '../../context/AuthContext'

import logo from '../../assets/logo.png'
import {Button} from '../../components/UI/Button/Button'

const showIcon = (
    <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke= '#1390E5' strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 15a3 3 0 100-6 3 3 0 000 6z" stroke= '#1390E5' strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
)

const hideIcon = (
    <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.12 14.12a3.001 3.001 0 01-5.194-2.098A3 3 0 019.88 9.88m8.06 8.06A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94l11.88 11.88zM9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.498 18.498 0 01-2.16 3.19L9.9 4.24zM1 1l22 22" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
)

export const Recover = () => {
    const {darkmode} = useSelector(({themes}) => themes)
    const history = useHistory()
    const message = useMessage()
    const auth = useContext(AuthContext)
    const {userResetToken, loading, request, error, clearError} = useHttp()
    const [recover, setRecover] = useState({password: ''})
    const [type, setType] = useState('password')

    const handleChangeInput = evt => {
        setRecover({...recover, [evt.target.name]: evt.target.value})
    }

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    const handleRecover = async () => {
        try {
            const data = await request(`/api/auth/recover/${userResetToken}}`, 'POST', {...recover})
            auth.recover(data.token, data.userId)
            message(data.message)
            setRecover({password: ''})
            history.push('/login')
        } catch (e) {}
    }

    const changeTypeToggle = useCallback(() => {
        if (type) {
            setType('')
        } else {
            setType('password')
        }
    }, [type])

    return (
        <div className='auth-password'>
            <div className={darkmode ? "auth-password__form dark" : "auth-password__form"}>
                <div className="auth-password__form-logo">
                    <img src={logo} alt="logo" />
                </div>
                <h2 className={darkmode ? 'auth-password__form-title dark' : 'auth-password__form-title'}>Создать новый пароль</h2>
                <div className='auth-password__form-form'>
                    <div>
                        <div className="auth-password__form-form-input">
                            <label className='auth-password__form-form-input--lb' htmlFor="password">Новый пароль</label>
                            <div className="auth-password__form-form-input">
                                <input
                                    className='auth-password__form-form-input--inp'
                                    id='password'
                                    name='password'
                                    type={type}
                                    value={recover.password}
                                    onChange={handleChangeInput}
                                />
                                <button
                                    className="auth-password__form-form-icon--btn"
                                    onClick={changeTypeToggle}
                                >
                                    {type ? hideIcon : showIcon}
                                </button>
                            </div>
                        </div>
                        <div className="auth-password__form-form-button">
                            <Button
                                title='Изменить'
                                className={darkmode ? 'auth-reset__form-form-button--lg dark' : 'auth-reset__form-form-button--lg'}
                                onClickButton={handleRecover}
                                disabled={loading}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
