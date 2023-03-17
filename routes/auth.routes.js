
const {Router} = require('express') // подключение модуля express.Router() в переменную Router
const bcrypt = require('bcrypt') // подключение модуля для шифрования пароля bcrypt 
const config = require('config') // подключение модуля для работы с конфигурационными файлами config
const jwt = require('jsonwebtoken') // подключение модуля для работы с токенами jsonwebtoken
const {check, validationResult} = require('express-validator') // подключение модуля express-validator в переменную check и validationResult
const User = require('../models/User') // подключение модели пользователя User
const router = Router() // инициализация объекта роутера

// Роут для регистрации нового пользователя
router.post(
    '/register',
    [
        check('email', 'Некорректный email').isEmail(), // валидация email
        check('password', 'Минимальная длина пароля 6 символов').isLength({min: 6}) // валидация пароля
    ],
    async (req, res) => {
    try{

        
        const errors = validationResult(req) // проверка на ошибки валидации
        
        if(!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array(), // передача ошибок в массиве объектов
                message: 'Некорректные данные при регистрации'
            })
        }

        const {email, password} = req.body // достаем email и password из запроса       
        const candidate = await User.findOne({ email }) // ищем пользователя с таким email в базе данных
        
    if(candidate){
        return res.status(400).json({ message: 'Такой пользователь уже существует' }) // если пользователь с таким email уже существует, то возвращаем ошибку
    }
    
    const hashedPassword = await bcrypt.hash(password, 12) // хэшируем пароль с помощью bcrypt
    

    const user = new User({ email, password: hashedPassword }) // создаем нового пользователя

    await user.save() // сохраняем пользователя в базе данных
    res.status(201).json({ message: 'Пользователь создан' }) // возвращаем ответ с сообщением, что пользователь создан
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так!' }) // обработка ошибки сервера
    }
})

// Роут для авторизации пользователя
router.post(
    '/login',
    [
        check('email', 'Некорректный email').normalizeEmail().isEmail(), // валидация email
        check('password', 'Введите пароль').exists() //валидация пароля
    ],
    async (req, res) => {
    try{
        const errors = validationResult(req) // проверка на ошибки валидации

        if(!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array(), // передача ошибок в массиве объектов
                message: 'Некорректные данные при входе'
            })
        }

    const {email, password} = req.body // достаем email и password из запроса
    const user = await User.findOne({ email }) // ищем пользователя с таким email в базе данных

    if (!user){
        return res.status(400).json({ message: 'Пользователь не найден'}) // если пользователь с таким email не найден, то возвращаем ошибку
    }

    const isMatch = await bcrypt.compare(password, user.password) // сравниваем пароли с помощью bcrypt

    if (!isMatch) {
        return res.status(400).json({ message: 'Неверный пароль'}) // если пароль не совпадает, то возвращаем ошибку
    }

    const token = jwt.sign(
        {userId: user.id}, // создаем уникальный идентификатор пользователя
        config.get('jwtSecret'), // задаем секретный ключ для создания токена
        { expiresIn: '1h'} // задаем время жизни токена
    )

    res.json({ token, userId: user.id }) // возвращаем ответ, состоящий из токена и идентификатора пользователя
        
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так' }) // обработка ошибки сервера
    }
})

module.exports = router // экспортируем роутер