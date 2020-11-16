import {useState, useCallback, useEffect} from 'react'

// создаем storageName, где будем хранить полученные token and userId
const storageName = 'userData'

// создаем функцию useAuth, в которой будем определять состояние token, userId and userName, а также создавать функции
// login, logOut and useEffect
export const useAuth = () => {

    // устанавливаем состояние token, userId and userName null
    const [token, setToken] = useState(null)
    const [userId, setUserId] = useState(null)
    const [userName, setUserName] = useState(null)
    const [userResetToken, setUserResetToken] = useState(null)
    const [userEmail, setUserEmail] = useState(null)

    // создаем функцию login. В этой функции мы установим setToken, как jwtToken получаемый в backend
    // и setUserId будет равным id, который также будем получать с backend
    // setUserName будет равным name
    const login = useCallback((jwtToken, id, name, email) => {
        setToken(jwtToken)
        setUserId(id)
        setUserName(name)
        setUserEmail(email)

        // далее в localStorage в storageName будем заносить полученные token, userId and userName
        localStorage.setItem(storageName, JSON.stringify({
            userId: id, token: jwtToken, userName: name, userEmail: email
        }))
    }, [])

    const registration = useCallback((jwtToken, id , name, email) => {
        setToken(jwtToken)
        setUserId(id)
        setUserName(name)
        setUserEmail(email)
    }, [])

    // создаем функцию logOut. В этой функции будем устанавливать, что setToken and setUserId будут равны null
    // и после чего будем удалять storageName из localStorage
    const logOut = useCallback(() => {

        // устанвливаем setToken and setUserId значение null
        setToken(null)
        setUserId(null)
        setUserName(null)
        setUserEmail(null)

        // после чего удаляем из localStorage storageName)
        localStorage.removeItem(storageName)
    }, [])

    // создаем функцию reset.
    const reset = useCallback((jwtToken, id) => {
        setToken(jwtToken)
        setUserId(id)
    }, [])

    // создаем функцию recover.
    const recover = useCallback((id, token) => {
        setUserId(id)
        setUserResetToken(token)
    }, [])

    // создаем useEffect, где мы будем парсить данные в localStorage и проверять если этих данные
    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(storageName))

        if (data && data.token) {
            login(data.token, data.userId, data.userName, data.userEmail)
        }
    }, [login])

    return {login, logOut, token, userId, registration, userName, reset, recover, userResetToken, userEmail}
}
