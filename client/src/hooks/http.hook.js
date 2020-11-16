import {useState, useCallback} from 'react'

// создаем функию useHttp, в которой будем делать асинхронные запросы на сервер
export const useHttp = () => {

    // устанавливаем states для loading and error взначении false
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    // создаем функцию, которая будет делать запрос на сервер она будет асинхронной.
    // В качестве параметров будем передвать url, method, body and headers и устанавливаем setLoading со значеним true
    const request = useCallback(async(url, method = 'GET', body = null, headers = {}) => {
        setLoading(true)

        try {
            // делаем проверку, если передаем body в  method request
            if (body) {
                body = JSON.stringify(body)
                headers['Content-Type'] = 'application/json'
            }

            // после того, как дождались запроса на сервер
            // получаем object response и после чего нам нужно его распарсить
            // помещаем ответ в переменную response для удобства работы в будущем
            const response = await fetch(url, {method, body, headers})
            const data = await response.json()

            // далее делаем проверку, если поле response.ok на состояние ok, и если оно не ok, тогда мы будем выкидывать
            // ошибку
            // поле message мы определили в backend, но если этого поля нет тогда выводим 'Something wrong!', а если все ok
            // тогда возвращаем data, которая прилетит с сервера
            if (!response.ok) {
                throw new Error(data.message || 'Something wrong!')
            }

            // и после этого устанавливаем setLoading со значением false
            setLoading(false)

            return data

        } catch (e) {
            // в блоке catch если мы словили ошибку и перешли в блок catch, то устанавливаем setLoading со значением false
            // и в setError будем выводить сообщение об ошибке
            setLoading(false)
            setError(e.message)
            throw e
        }
    }, [])

    // после чего будем вызывать функцию clear для удаления ошибки
    const clearError = useCallback(() => setError(null), [])

    return {loading, request, error, clearError}
}