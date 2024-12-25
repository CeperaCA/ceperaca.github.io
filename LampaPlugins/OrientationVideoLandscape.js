(function () {
  'use strict';
  
  // Используем MutationObserver для отслеживания добавления видео на страницу
  const observer = new MutationObserver(function(mutationsList, observer) {
    mutationsList.forEach(function(mutation) {
      // Для каждого добавленного элемента проверяем, является ли он видео
      mutation.addedNodes.forEach(function(node) {
        // Проверяем, если добавленный элемент имеет класс 'player'
        if (node.classList && node.classList.contains('player')) {
          // Получаем видео элемент
          const video = node.querySelector('video');
          
          if (video) {
            // Получаем текущие размеры видео
            const computedStyle = window.getComputedStyle(video);
            const oldWidth = computedStyle.width;
            const oldHeight = computedStyle.height;
            
            // Применяем стили для горизонтальной ориентации видео
            video.style.width = oldHeight;  // Переставляем ширину и высоту
            video.style.height = oldWidth;  // Переставляем ширину и высоту
            video.style.transform = "rotate(90deg)";
            video.style.transformOrigin = "bottom left";
            video.style.marginTop = "-100vw";
            video.style.objectFit = "cover";  // Убедимся, что видео не деформируется
          }
        }
      });
    });
  });

  // Настройки для наблюдения за DOM
  observer.observe(document.body, {
    childList: true, // Следим за добавлением новых элементов
    subtree: true    // Следим за вложенными изменениями
  });
})();