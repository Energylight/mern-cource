// Импортируем хук "useCallback" из библиотеки React
import { useCallback } from 'react';

// Экспортируем функцию "useMessage"
export const useMessage = () => {
  // Используем хук "useCallback", чтобы сохранить ссылку на функцию "toast" и избежать создания новой функции при каждом перерендеринге
  return useCallback((text) => {
    // Проверяем наличие объекта "window.M" и текста сообщения
    if (window.M && text) {
      // Вызываем метод "toast" объекта "M" и передаем текст сообщения в свойстве "html"
      window.M.toast({ html: text });
    }
  }, [] );
};