// Импортировать React и компоненты маршрутизации из библиотеки react-router-dom
import React from 'react'
import {Routes, Route, Navigate} from 'react-router-dom'
// Импортировать страницы, которые будут отображаться в маршрутизации
import {LinksPage} from './pages/LinksPage'
import {CreatePage} from './pages/CreatePage'
import {DetailPage} from './pages/DetailPage'
import {AuthPage} from './pages/AuthPage'

// Объявить функцию useRoutes, которая возвращает объект маршрутов, в зависимости от параметра isAuthenticated
export const useRoutes = isAuthenticated => {
    // Если пользователь аутентифицирован - отобразить определенные маршруты
    if(isAuthenticated) {
        return (
            // Определить объект маршрутов Routes, содержащий определенные компоненты в зависимости от пути
            // Отобразить LinksPage по пути /links
            // Отобразить CreatePage по пути /create
            // Отобразить DetailPage по динамическому пути /detail/:id
            // Перенаправить на CreatePage по любому неизвестному пути
            <Routes>
                <Route path="/links" exact element={<LinksPage />} /> 
                <Route path="/create" exact element={<CreatePage />} /> 
                <Route path="/detail/:id" element={<DetailPage />} /> 
                <Route path="*" element={<Navigate to="/create" />} /> 
            </Routes>
        )
    }
    // Если пользователь не аутентифицирован - отобразить определенные маршруты
    return(
        // Определить объект маршрутов Routes, содержащий определенные компоненты в зависимости от пути
        // Отобразить AuthPage по пути /
        // Перенаправить на AuthPage по любому неизвестному пути
        <Routes>
            <Route path="/" exact element={<AuthPage />} /> 
            <Route path="*" element={<Navigate to="/" />} /> 
        </Routes>
    )
}