// импортируем React и ReactDOM
import React from 'react'
import ReactDOM from 'react-dom/client'

// импортируем index.css, компонент App и функцию reportWebVitals
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'

// создаем корневой узел для приложения
const root = ReactDOM.createRoot(document.getElementById('root'))

// рендерим компонент App в корневой узел в режиме StrictMode
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

// вызываем функцию reportWebVitals
reportWebVitals()