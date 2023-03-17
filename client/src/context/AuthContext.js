// Импортируем необходимую библиотеку React для работы с контекстом
import { createContext } from 'react'

// Функция-заглушка, которая будет использоваться по умолчанию в AuthContext
function noop() {}

// Создаём объект контекста AuthContext с помощью createContext
// Пока он будет содержать только несколько свойств в виде объекта:
// token - токен пользователя, null по умолчанию
// userId - ID пользователя, null по умолчанию
// login - функция входа, по умолчанию noop (ничего не делает)
// logout - функция выхода, по умолчанию noop (ничего не делает)
// isAuthenticated - флаг аутентификации пользователя, по умолчанию false
export const AuthContext = createContext({
    token: null,
    userId: null,
    login: noop,
    logout: noop,
    isAuthenticated: false
})