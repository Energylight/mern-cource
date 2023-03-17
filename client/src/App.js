// Импорт необходимых модулей
import { BrowserRouter } from 'react-router-dom'
import { useRoutes } from './routes'
import { useAuth } from './hooks/auth.hook'
import { AuthContext } from './context/AuthContext'
import { Navbar } from './components/Navbar'
import { Loader } from './components/Loader'
import 'materialize-css'

function App() {
  // Получаем данные для авторизации из хука
  const { token, login, logout, userId, ready } = useAuth()
  // Создаем переменную, которая будет указывать на то, авторизован ли пользователь
  const isAuthenticated = !!token
  // Получаем роуты для приложения соответственно статусу авторизации пользователя
  const routes = useRoutes(isAuthenticated)
  
  if(!ready) {
    return <Loader />
  }

  // Возвращаем основной компонент приложения
  return (
    <AuthContext.Provider value={{ 
      token, login, logout, userId, isAuthenticated 
      }}> 
      <BrowserRouter> 
        {isAuthenticated && <Navbar />} 
        <div className="container">
          {routes} 
        </div>
      </BrowserRouter>
    </AuthContext.Provider>
  )
}

export default App
