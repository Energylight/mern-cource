// Импорт необходимых модулей
import { BrowserRouter } from 'react-router-dom';
import { useRoutes } from './routes';
import { useAuth } from './hooks/auth.hook';
import { AuthContext } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import 'materialize-css';

function App() {
  // Получаем данные для авторизации из хука
  const { token, login, logout, userId } = useAuth();
  // Создаем переменную, которая будет указывать на то, авторизован ли пользователь
  const isAuthenticated = !!token;
  // Получаем роуты для приложения соответственно статусу авторизации пользователя
  const routes = useRoutes(isAuthenticated);
  
  // Возвращаем основной компонент приложения
  return (
    <AuthContext.Provider value={{ token, login, logout, userId, isAuthenticated }}> // Оборачиваем приложение в AuthContext.Provider, чтобы передать авторизационные данные
      <BrowserRouter> // Оборачиваем приложение в BrowserRouter, чтобы применить роутинг
        {isAuthenticated && <Navbar />} {/* Выводим компонент навигации, если пользователь авторизован */}
        <div className="container">
          {routes} {/* Выводим дочерние компоненты соответственно выбранным роутам */}
        </div>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
