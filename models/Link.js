// Импортируем необходимые модули: Schema, model, Types из библиотеки Mongoose

const {Schema, model, Types} = require('mongoose')

// Создаем схему для коллекции Link с необходимыми параметрами
// from: ссылка, с которой начинается переход
// to: ссылка - переход на эту ссылку
// code: уникальный код страницы
// date: дата создания ссылки
// clicks: количество переходов по ссылке
// owner: создатель ссылки, ссылка на пользователя в коллекции User
const schema = new Schema({
    from: { type: String, required: true },
    to: { type: String, required: true, unique: true },
    code: { type: String, required: true, unique: true },
    date: { type: Date, default: Date.now },
    clicks: { type: Number, default: 0 },
    owner: {type: Types.ObjectId, ref: 'User'}
})

// Экспортируем модель Link
module.exports = model('Link', schema)