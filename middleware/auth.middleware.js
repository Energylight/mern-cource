// подключение модуля для создания и верификации токенов Json Web Token
const jwt = require('jsonwebtoken')
// подключение модуля для использования настроек
const config = require('config')

// экспорт функции для обработки данных перед выполнением запроса
module.exports = (req, res, next) => {
    // если метод запроса OPTIONS, то передаем дальше
    if(req.method === 'OPTIONS'){
        return next()
    }
    try {
        // извлекаем токен из заголовка Authorization
        const token = req.headers.authorization.split(' ')[1] // Bearer TOKEN
        
        // если токена нет, то возвращаем ошибку авторизации
        if(!token) {
           return res.status(401).json({ message: 'Нет авторизации' })
        }

        // верификация токена и извлечение данных пользователя
        const decoded = jwt.verify(token, config.get('jwtSecret'))
        req.user = decoded
        next()
    } catch (e) {
        res.status(401).json({ message: 'Нет авторизации' })
    }
}