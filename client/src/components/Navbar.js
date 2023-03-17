// Импортируем необходимые модули
import { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

// Создаем компонент Navbar
export const Navbar = () => {
  // Объявляем переменную navigate, которая будет использоваться для перехода по страницам
  const navigate = useNavigate();
  // Получаем контекст авторизации из AuthContext
  const auth = useContext(AuthContext);

  // Обработчик нажатия на кнопку "Выйти"
  const logoutHandler = event => {
    // Отменяем стандартное поведение браузера по клику на ссылку
    event.preventDefault();
    // Вызываем метод logout из контекста авторизации
    auth.logout();
    // Перенаправляем пользователя на главную страницу
    navigate('/');
  }

  // Возвращаем верстку навигационного меню
  return (
    <nav>
      <div className="nav-wrapper blue darken-1 padding-left" style={{padding: '0 2rem'}}>
        <span className="brand-logo"> Сокращение ссылок</span>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li><NavLink to="/create">Создать</NavLink></li>
          <li><NavLink to="/links">Ссылки</NavLink></li>
          <li><a href="/" onClick={logoutHandler}>Выйти</a></li>
        </ul>
      </div>
    </nav>
  );
};