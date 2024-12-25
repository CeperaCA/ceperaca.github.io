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
					// Применяем стили для горизонтальной ориентации видео
					video.style.cssText = "width: 100vh !important; height: 100vw !important; transform: rotate(90deg) !important; transform-origin: bottom left !important; margin-top: -100vw !important;";
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