// Функция reportWebVitals принимает колбек onPerfEntry и импортирует пакет web-vitals.
// Если колбек есть и он является функцией, то получает значения основных метрик CLS, FID, FCP, LCP и TTFB, 
// используя соответствующие функции из пакета, и передает их в колбек.
// Если колбек отсутствует или не является функцией - ничего не делает.

const reportWebVitals = onPerfEntry => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry) // измерение и передача значения  Cumulative Layout Shift (CLS) в колбек
      getFID(onPerfEntry) // измерение и передача значения First Input Delay (FID) в колбек
      getFCP(onPerfEntry) // измерение и передача значения First Contentful Paint (FCP) в колбек
      getLCP(onPerfEntry) // измерение и передача значения Largest Contentful Paint (LCP) в колбек
      getTTFB(onPerfEntry) // измерение и передача значения Time to First Byte (TTFB) в колбек
    })
  }
}

export default reportWebVitals