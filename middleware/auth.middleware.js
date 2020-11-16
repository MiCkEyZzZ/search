const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        return next()
    }

    // будем писать в try and catch так как могут возникнуть ошибки и будет очень удобно осуществлять
    // перехват ошибок.
    try {
        // далее нужно получеть объект token из req.headers и у headers есть спецмальное поле, которое
        // называется authorization - это будет строка, которую мы будем передавать с frontend

        const token = req.headers.authorization.split(' ')[1] // 'Bearer TOKEN'

        // и далее мы проверяем если нет token, тогда мы отвечаем, что у него статус 401
        if (!token) {
            return res.status(401).json({message: 'Нет авторизации.'})
        }

        // но если token есть, то нужно его раскодировать. Создаем переменную decoded
        // и обратившись к библиотеке jwt вызываем у нее встроенный метод verify
        // первым параметром передаем token, а вторым секретное слово.
        const decoded = jwt.verify(token, config.get('jwtSecret'))

        // и после этого раскодированный token мы можем положить в поле user
        req.user = decoded
        next()

    } catch (e) {
        res.status(401).json({message: 'Нет авторизации.'})
    }
}
