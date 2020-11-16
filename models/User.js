const {Schema, model, Types} = require('mongoose')

// создаем модель пользователя. В ней мы описываем базовые поля это email, password. Так же создаем array ссылок, которые будут добавлены для каждого
// пользователя свои и она будет называться Link - это будет будушая Schema
const schema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true, unique: true},
    resetToken: String,
    resetTokenExp: Date,
    queries : [{type: Types.ObjectId, ref: 'Query'}]
})

module.exports = model('User', schema)
