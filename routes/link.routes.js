//Импорт основных модулей
const { Router } = require('express')
const config = require('config')
const Link = require('../models/Link')
const auth = require('../middleware/auth.middleware')
const shortid = require('shortid')

// Создаем экземпляр роутера Express
const router = Router()

//Добавляем обработчик событий для URL '/generate'
//auth - Middleware, которая проверяет, авторизован ли пользователь
router.post('/generate', auth, async (req, res) => {
    try {
        const baseUrl = config.get('baseUrl')
        const { from } = req.body 

        // Генерируем уникальный код используя библиотеку shortid
        const code = shortid.generate()

        //Ищем в базе данных уже существующую ссылку и возвращаем ее
        const existing = await Link.findOne({ from })

        //если ссылка уже существует возвращаем ее
        if (existing) {
           return res.json( {link: existing} )
        }

        // Формируем короткую ссылку - адрес сервера плюс уникальный код
        const to = baseUrl + '/t/' + code

        //создаем новую ссылку 
        const link = new Link({ 
            code, to, from, owner: req.user.userId
        })
        
        //сохраняем ссылку в базе данных
        await link.save()

        //отправляем ответ в JSON формате с созданной ссылкой и статусом 201
        res.status(201).json({ link })

    } catch (e) {
        //отправляем ошибку сервера в JSON формате с сообщением об ошибке и статусом 500
        res.status(500).json({ message: 'Что-то пошло не так' })
    }
})

//Добавляем обработчик событий для URL '/'
router.get('/', auth, async (req, res) => {
    try{
        //искать все ссылки для данного пользователя
        const links = await Link.find({ owner: req.user.userId })
        //отправляем ответ в JSON формате с ссылками, найденными в базе данных
        res.json(links)
        
    } catch (e) {
        //отправляем ошибку сервера в JSON формате с сообщением об ошибке и статусом 500
        res.status(500).json({ message: 'Что-то пошло не так' })
    }
})

//Добавляем обработчик событий для URL '/:id'
router.get('/:id', auth, async (req, res) => {
    try{
        //искать ссылку в базе данных по переданному id
        const link = await Link.findById(req.params.id)
        //отправляем ответ в JSON формате с найденной ссылкой
        res.json(link)
        
    } catch (e) {
        //отправляем ошибку сервера в JSON формате с сообщением об ошибке и статусом 500
        res.status(500).json({ message: 'Что-то пошло не так' })
    }
})

//экспортируем наш роутер
module.exports = router