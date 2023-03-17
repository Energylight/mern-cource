// Импортируем необходимые хуки
import { useState, useCallback, useEffect } from 'react'

// Указываем название для ключа в localStorage
const storageName = 'userData'

// Создаем кастомный хук useAuth
export const useAuth = () => {
    // С помощью useState создаем состояние token и userId
    const [token, setToken] = useState(null)
    const [ready, setReady] = useState(false)
    const [userId, setUserId] = useState(null)

    // Создаем функцию login, которая принимает параметры jwtToken и id 
    const login = useCallback( (jwtToken, id) => {
        // Устанавливаем значения для состояний token и userId
        setToken(jwtToken)
        setUserId(id)

        // Сохраняем значения для token и userId в localStorage
        localStorage.setItem(storageName, JSON.stringify({
            userId: id, token: jwtToken
        }))
    }, [])

    // Создаем функцию logout, которая очищает состояния token и userId и удаляет данные из localStorage
    const logout = useCallback( () => {
        setToken(null)
        setUserId(null)
        localStorage.removeItem(storageName)
    }, [])

    // Создаем эффект, который срабатывает при монтировании компонента и пытается получить данные из localStorage
    useEffect( () => {
        const data = JSON.parse(localStorage.getItem(storageName))
        // Если в localStorage есть данные и есть токен, то происходит автоматический вход
        if(data && data.token){
            login(data.token, data.userId)
        }
        setReady(true)
    }, [login])

    // Возвращаем объект с функциями login и logout, а также с состояниями token и userId
    return { login, logout, token, userId, ready }
}