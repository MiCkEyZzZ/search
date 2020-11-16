const {Router} = require('express')
const bcrypt = require('bcryptjs')
const crypto = require('crypto')
const nodemailer = require('nodemailer')
const sendgrid = require('nodemailer-sendgrid-transport')
const jwt = require('jsonwebtoken')
const config = require('config')
const {check, validationResult} = require('express-validator')
const User = require('../models/User')
const keys = require('../keys')
const regEmail = require('../emails/registration')
const resetEmail = require('../emails/reset')
const router = Router()

const transporter = nodemailer.createTransport(sendgrid({
    auth: {api_key: keys.SENDGRID_API_KEY}
}))

// /api/auth/registration
router.post(
    '/registration',
    [
        check('email', 'Введите правильный адрес эл. почты.').isEmail(),
        check('password', 'Длинна пароля не должна быть меньше 6 символов.')
            .isLength({min: 6})
    ],
    async (req, res) => {
        try {
            // создаем переменную errors куда передаем validationResult, который будет валидировать поля
            const errors = validationResult(req)

            // далее будем делать проверку если объект errors не пустой тогда вернём их на фронтедн, чтобы прирвать скрипт
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Неправильный адрес эл.почты или пароль.'
                })
            }

            const {name, email, password} = req.body

            // далее делаем логику регистрации и для начало нам нужно проверить если пользователь с таким email в базе
            const candidate = await User.findOne({email})

            if (candidate) {
                return res.status(400).json({message: 'Такой адрес эл. почты уже существует.'})
            }

            // создаём хеширование пароля
            const hashPassword = await bcrypt.hash(password, 12)
            const user = new User({name, email, password: hashPassword})

            // сохраняем пользователя в базе
            await user.save()

            // выводим сообщение пользователю, что его учетная запись была создана
            res.status(201).json({message: 'Поздравляем, пользователь создан.'})
            await transporter.sendMail(regEmail(email))

        } catch (e) {
            // вслучае неудачи либо по каким-то другим причинам будем выводить сообщение, что-то пошло не так
            res.status(500).json({message: 'Что-то пошло не так. Попробуйте снова.'})
        }
    })

// /api/auth/login
router.post(
    '/login',
    [
        check('email', 'Введите правильный адрес эл. почты.').normalizeEmail().isEmail(),
        check('password', 'Длинна пароля не должна быть меньше 6 символов.').exists()
    ],
    async (req, res) => {
        try {
            // создаем переменную errors куда передаем validationResult, который будет валидировать поля
            const errors = validationResult(req)

            // далее будем делать проверку если объект errors не пустой тогда вернём их на фронтедн, чтобы прервать скрипт
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Неправильный адрес эл.почты или пароль.'
                })
            }

            // получаем поля из req.body
            const {email, password} = req.body

            // далее делаем проверку, попробуем найти этого пользователя в DB
            const user = await User.findOne({email})

            if (!user) {
                return res.status(400).json({message: 'Пользователь не найден.'})
            }

            // далее будем проверять на совпадения паролей
            const isMatch = await bcrypt.compare(password, user.password)

            if (!isMatch) {
                return res.status(400).json({message: 'Неверный пароль.'})
            }

            const token = jwt.sign(
                {userId: user.id, userName: user.name, userEmail: user.email},
                config.get('jwtSecret'),
                {expiresIn: '1h'}
            )

            await res.json({token, userId: user.id, userName: user.name, userEmail: user.email})

        } catch (e) {
            res.status(500).json({message: 'Что-то пошло не так. Попробуйте снова.'})
        }
    })

// /api/auth/reset
router.post(
    '/reset',
    [
        check('email', 'Введите правильный адрес эл. почты.').normalizeEmail().isEmail()
    ],
    (req, res) => {
        try {

            // создаем переменную errors куда передаем validationResult, который будет валидировать поля
            const errors = validationResult(req)

            // далее будем делать проверку если объект errors не пустой тогда вернём их на фронтедн, чтобы прервать скрипт
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Неправильный адрес эл.почты.'
                })
            }

            // при помощи crypto и ее метода randomBytes передаем значение какой длинны будет token, а вторым парамтром передаем
            // callback, который будет ассинхронный и он будет содержать два параметра ошибка и buffer то есть сгенерированный
            // нами новый token
            crypto.randomBytes(32, async (e, buffer) => {

                // делаем проверку, если ошибка есть, то выводим сообщение
                if (e) {
                    return res.status(400).json({message: 'Что-то пошло не так. Попробуйте снова.'})
                }

                // далее так как buffer это новый token то при помощи метода toString делаем его строкой
                // и присваиваем его переменной token
                const token = buffer.toString('hex')

                // обращаемся к User где при помощи метода findOne проверяем если такой email  в базе, полученный ответ присваиваем
                // переменной candidate
                const candidate = await User.findOne({email: req.body.email})

                // далее делаем проверку если candidate все же есть тогда записываем в него resetToken and resetTokenExp
                // после этого сохраняем и отправляем письмо на почту и выводим сообщение о том что письмо ушло,
                // а если email нет, тогда выводим сообщение
                if (candidate) {
                    candidate.resetToken = token
                    candidate.resetTokenExp = Date.now() + 60 * 60 * 10000
                    await candidate.save()
                    await transporter.sendMail(resetEmail(candidate.email, token))
                    res.status(201).json({message: 'Сообщение было отправлено на ваш адрес эл. почты.'})
                } else {
                    res.status(400).json({
                        message: 'Такой пользователь не найден.'
                    })
                }
            })
        } catch (e) {
            res.status(500).json({message: 'Что-то пошло не так. Попробуйте снова.'})
        }
    }
)

// /api/auth/recover
router.post(
    '/recover',
    [
        check('password', 'Длинна пароля не должна быть меньше 6 символов.')
            .isLength({min: 6})
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Неправильный пароль.'
                })
            }

            const user = await User.findOne({
                _id: req.body.userId,
                resetToken: req.body.token,
                resetTokenExp: {$gt: Date.now()}
            })

            if (user) {
                user.password = await bcrypt.hash(req.body.password, 12)
                user.resetToken = undefined
                user.resetTokenExp = undefined

                await user.save()
                res.status(201).json({message: 'Пароль был успешно изменен.'})
            } else {
                res.status(408).json({message: 'Время жизни токена истекло.'})
            }

        } catch (e) {
            res.status(500).json({message: 'Что-то пошло не так. Попробуйте снова.'})
        }
    }
)

// /api/auth/upload
router.post('/upload', (req, res) => {})

module.exports = router
