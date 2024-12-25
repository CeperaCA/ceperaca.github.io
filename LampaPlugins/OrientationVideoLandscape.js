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
					video.style.width = "100vh";
					video.style.height = "100vw";
					video.style.transform = "rotate(90deg)";
					video.style.transformOrigin = "bottom left";
					video.style.marginTop = "-100vw";
					//video.style.cssText = "width: 100vh; height: 100vw; transform: rotate(90deg); transform-origin: bottom left; margin-top: -100vw;";
				}
			}
		});
	});
	});

	// Настройки для наблюдения за DOM
	observer.observe(document.body, {
		childList: true,      // Следим за добавлением новых элементов
		subtree: true         // Следим за вложенными изменениями
	});
})();