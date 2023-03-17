// Хук useHttp для отправки HTTP-запросов и использует useState и useCallback хуки из библиотеки React
import { useState, useCallback } from 'react'

// Создаём кастомный хук useHttp, который возвращает объект со следующими свойствами: loading, request, error, clearError
export const useHttp = () => {
    const [loading, setLoading] = useState(false) // Используем useState хук для установки и изменения состояния загрузки
    const [error, setError] = useState(null) // Используем useState хук для установки и изменения состояния ошибки

    // Используем useCallback хук для оптимизации кода и создания мемоизированной функции request
    const request = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
        setLoading(true) // Устанавливаем состояние загрузки до отправки запроса

        try {
            // Если тело запроса есть, преобразуем его в JSON формат и устанавливаем соответствующий заголовок
            if (body) {
                body = JSON.stringify(body)
                headers['Content-type'] = 'application/json'
            }

            // Отправляем запрос на сервер с заданными параметрами и ждем ответа через метод fetch
            const response = await fetch(url, { method, body, headers })
            const data = await response.json() // Преобразуем ответ в JSON формат

            // Если код ответа успешен, вернем полученные данные, иначе сгенерируем ошибку
            if (!response.ok) {
                throw new Error(data.message || 'Что-то пошло не так...')
            }

            setLoading(false) // Устанавливаем состояние загрузки в false после получения ответа
            return data // Возвращаем данные
        } catch (e) {
            setLoading(false) // Устанавливаем состояние загрузки в false, если произошла ошибка
            setError(e.message) // Устанавливаем состояние ошибки
            throw e // Генерируем ошибку
        }
    }, [])

    // Используем useCallback хук для оптимизации кода и создания мемоизированной функции clearError
    const clearError = useCallback(() => setError(null), [])

    return { loading, request, error, clearError } // Возвращаем объект с состояниями загрузки, ошибки, функцией запроса и функцией очистки ошибки
}