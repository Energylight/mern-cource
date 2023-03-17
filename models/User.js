// Подключение зависимостей mongoose
const { Schema, model, Types } = require('mongoose')

// Создание схемы для коллекции пользователей
const schema = new Schema({
    email: { type: String, required: true, unique: true }, // Поле email, которое требуется, обязательное, должно быть уникальным
    password: { type: String, required: true }, // Поле password, которое требуется и обязательное
    links: [{ type: Types.ObjectId, ref: 'Link' }] // Поле links, которое является массивом и содержит ссылки на коллекцию Link
})

// Экспорт модели User с указанием названия коллекции и её схемы
module.exports = model('User', schema)