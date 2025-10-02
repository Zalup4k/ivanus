 // Объявление переменных
        let currentSlide = 0; // Текущий активный слайд
        let autoPlayInterval; // Переменная для хранения интервала автопрокрутки
        const slideCount = document.querySelectorAll('.carousel-slide').length; // Количество слайдов
        const carouselWrapper = document.getElementById('carouselWrapper'); // Обертка слайдов
        const indicatorsContainer = document.getElementById('indicators'); // Контейнер индикаторов

        // Функция инициализации карусели
        function initCarousel() {
            // Создание индикаторов для каждого слайда
            for (let i = 0; i < slideCount; i++) {
                const indicator = document.createElement('div');
                indicator.className = 'indicator';
                if (i === 0) indicator.classList.add('active');
                indicator.addEventListener('click', () => goToSlide(i));
                indicatorsContainer.appendChild(indicator);
            }
            
            // Запуск автоматической прокрутки
            startAutoPlay();
        }

        // Функция перехода к конкретному слайду
        function goToSlide(slideIndex) {
            currentSlide = slideIndex; // Обновление текущего слайда
            updateCarousel(); // Обновление отображения
            resetAutoPlay(); // Сброс таймера автопрокрутки
        }

        // Функция обновления отображения карусели
        function updateCarousel() {
            // Перемещение обертки слайдов
            carouselWrapper.style.transform = `translateX(-${currentSlide * 100}%)`;
            
            // Обновление активного индикатора
            document.querySelectorAll('.indicator').forEach((indicator, index) => {
                indicator.classList.toggle('active', index === currentSlide);
            });
        }

        // Функция перехода к следующему слайду
        function nextSlide() {
            currentSlide = (currentSlide + 1) % slideCount; // Циклическое переключение
            updateCarousel(); // Обновление отображения
            resetAutoPlay(); // Сброс таймера автопрокрутки
        }

        // Функция перехода к предыдущему слайду
        function prevSlide() {
            currentSlide = (currentSlide - 1 + slideCount) % slideCount; // Циклическое переключение
            updateCarousel(); // Обновление отображения
            resetAutoPlay(); // Сброс таймера автопрокрутки
        }

        // Функция запуска автоматической прокрутки
        function startAutoPlay() {
            autoPlayInterval = setInterval(nextSlide, 10000); // Переключение каждые 10 секунд
        }

        // Функция остановки автоматической прокрутки
        function stopAutoPlay() {
            clearInterval(autoPlayInterval); // Очистка интервала
        }

        // Функция сброса автоматической прокрутки
        function resetAutoPlay() {
            stopAutoPlay(); // Остановка текущего интервала
            startAutoPlay(); // Запуск нового интервала
        }

        // Остановка автопрокрутки при наведении мыши на карусель
        carouselWrapper.parentElement.addEventListener('mouseenter', stopAutoPlay);
        // Возобновление автопрокрутки при уходе мыши с карусели
        carouselWrapper.parentElement.addEventListener('mouseleave', startAutoPlay);

        // Инициализация карусели при загрузке страницы
        document.addEventListener('DOMContentLoaded', initCarousel);

        