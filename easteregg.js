// 1. Получаем ссылки на все элементы
const body = document.body;
const audio = document.getElementById('backgroundMusic');
const flash = document.getElementById('flashOverlay');
const image = document.getElementById('mainImage'); // Получаем элемент изображения

// Переменные состояния
let isActivated = false; // Флаг, чтобы событие сработало только один раз
const targetImageSrc = 'scarystep.png'; // Путь к новому изображению

// 2. Добавляем слушатель события нажатия клавиши
document.addEventListener('keydown', (event) => {
    // Активируем по нажатию Пробела ('Space') и если еще не активировано
    if (event.code === 'KeyA' && !isActivated) { 
        event.preventDefault(); 
        isActivated = true; // Блокируем повторный запуск
        
        // -------------------------
        // ШАГ 1: Запуск белого перехода (ВСПЫШКА)
        // -------------------------
        
        // 1.1 Делаем фон белым и показываем оверлей
        body.style.backgroundColor = 'white';
        flash.style.visibility = 'visible';
        flash.style.opacity = '1';
        
        // -------------------------
        // ШАГ 2: Смена изображения и запуск музыки (через 0.5 секунды)
        // -------------------------
        setTimeout(() => {
            
            // 2.1 Смена изображения
            image.src = targetImageSrc;
            image.alt = "Фото Эльдаринга";
            
            // 2.2 Запуск жуткой музыки
            if (audio.paused) {
                audio.play()
                    .catch(error => {
                        console.error('Ошибка воспроизведения аудио:', error);
                    });
            }
            
            // -------------------------
            // ШАГ 3: Завершение перехода (через 1 секунду)
            // -------------------------
            setTimeout(() => {
                // 3.1 Скрываем белый оверлей
                flash.style.opacity = '0';
                
                // 3.2 Устанавливаем целевой цвет страницы
                body.style.backgroundColor = '#1a0000'; 
                
                // 3.3 Через небольшой таймаут окончательно убираем оверлей
                setTimeout(() => {
                    flash.style.visibility = 'hidden';
                }, 500);
                
                console.log('Эффект перехода завершен. Музыка играет.');
                
            }, 1000); // Задержка 1000 мс (1 секунда) после смены изображения
            
        }, 500); // Задержка 500 мс (0.5 секунды) для белой вспышки
        
    } else if (event.code === 'Space' && isActivated) {
        // Если уже активировано, можно использовать ту же клавишу для паузы
        if (audio.paused) {
            audio.play().catch(e => console.error(e));
        } else {
            audio.pause();
        }
    }
});