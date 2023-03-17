// Импорт зависимостей
import { useState, useEffect, useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { useHttp } from "../hooks/http.hook"
import { useNavigate } from "react-router-dom"

// Экспортируем компонент
export const CreatePage = () => {
    // Инициализация хука для работы с маршрутизацией
    const navigate = useNavigate()
    // Использование контекста, установленного в AuthContext
    const auth = useContext(AuthContext) 
    // Инициализация хука для отправки запроса на сервер
    const {request} = useHttp()
    // Инициализация стейта ссылки
    const [link, setLink] = useState('')

    // Вызов хука для обновления компонента
    useEffect(()=>{
        window.M.updateTextFields()
    }, [])

    // Обработчик события при нажатии на клавишу в поле ввода
    const pressHandler = async event => {
        if(event.key === 'Enter') {
            try {
                // Отправка запроса на сервер с токеном авторизации
                const data = await request('/api/link/generate', 'POST', {from: link}, {
                    Authorization: `Bearer ${auth.token}`
                })
                // Маршрутизация на страницу с деталями ссылки
                navigate(`/detail/${data.link._id}`)
            } catch (e) {}
        }
    }

    return (    
        //Форма для ввода новой ссылки    
        <div className="row">
            <div className="col s8 offset-s2" style={{ paddingTop: '2rem'}}>
            <div className="input-field">                        
                        <input 
                            placeholder="Вставьте ссылку" 
                            id="link" 
                            type="text"
                            value={link}
                            onChange={e => setLink(e.target.value)}     
                            onKeyDown={pressHandler}      
                        />                        
                        <label htmlFor="link">Введите ссылку</label>
                        </div>
            </div>
        </div>
    )
}
