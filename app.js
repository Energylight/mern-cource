// Подключение необходимых модулей
const express = require('express');
const config = require('config');
const mongoose = require('mongoose');

// Создание приложения
const app = express();

// Настройка приложения для работы с JSON
app.use(express.json({ extended: true }));

// Подключение маршрутов для авторизации и работы с ссылками
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/link', require('./routes/link.routes'));

// Установка порта на котором будет запущено приложение, берется из конфига, если не указан, то по умолчанию 3000
const PORT = config.get('port') || 3000;

// Функция, которая запускает приложение и подключается к базе данных
async function start(){
    try{
        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        // Запуск приложения на указанном порту
        app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`))
        
    } catch (e) {
        // Вывод ошибки, если произошла ошибка подключения к базе данных
        console.log('Serever Error', e.message)
        process.exit(1)
    }
}

// Вызов функции старта приложения
start();