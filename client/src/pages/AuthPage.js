import React, { useContext, useState, useEffect } from "react";
// Импортируем контекст авторизации
import { AuthContext } from "../context/AuthContext";
// Импортируем кастомный хук для отправки http запросов
import { useHttp } from "../hooks/http.hook";
// Импортируем кастомный хук для вывода системных сообщений
import { useMessage } from "../hooks/message.hook";

export const AuthPage = () => {

  // Используем контекст авторизации
  const auth = useContext(AuthContext);
  // Используем кастомный хук для вывода системных сообщений
  const message = useMessage();
  // Используем кастомный хук для отправки http запросов
  const { loading, error, request, clearError } = useHttp();

  // Создаём стейт для управления формой авторизации
  const [form, setForm] = useState({ email: '', password: '' });

  // useEffect, для вывода ошибки на экран, если она возникает
  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  // useEffect, для кастомизации input-ов Materialize
  useEffect(() => {
    window.M.updateTextFields();
  }, []);

  // Функция изменения стейта формы
  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  // Функция для отправки запроса на регистрацию
  const registerHandler = async () => {
    try {
      const data = await request('/api/auth/register', 'POST', { ...form });
      message(data.message);
    } catch (e) { }
  }

  // Функция для отправки запроса на авторизацию
  const loginHandler = async () => {
    try {
      const data = await request('/api/auth/login', 'POST', { ...form });
      auth.login(data.token, data.userId);
    } catch (e) { }
  }

  // Возвращаем форму авторизации
  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <h3>Авторизация</h3>
        <div className="card blue darken-1">
          <div className="card-content white-text">
            <span className="card-title">Авторизация</span>
            <div>
              <div className="input-field">
                <input
                  placeholder="Введите Email"
                  id="email"
                  type="text"
                  name="email"
                  className="yellow-input"
                  value={form.email}
                  onChange={changeHandler}
                />
                <label htmlFor="email">Email</label>
              </div>

              <div className="input-field">
                <input
                  placeholder="Введите Пароль"
                  id="password"
                  type="password"
                  name="password"
                  className="yellow-input"
                  value={form.password}
                  onChange={changeHandler}
                />
                <label htmlFor="password">Пароль</label>
              </div>
            </div>
          </div>
          <div className="card-action">
            <button
              className="btn yellow darken-4 margin-right-10"
              onClick={loginHandler}
              disabled={loading}
            >
              Войти
            </button>
            <button
              className="btn grey lighten-1 black-text"
              onClick={registerHandler}
              disabled={loading}
            >
              Регистрация
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}