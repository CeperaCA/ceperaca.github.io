(function () {
	'use strict';

	// Используем MutationObserver для отслеживания добавления видео на страницу
	const observer = new MutationObserver(function(mutationsList, observer) {
		mutationsList.forEach(function(mutation) {
			// Для каждого добавленного элемента проверяем, является ли он видео
			mutation.addedNodes.forEach(function(node) {
				console.log('Добавлен новый элемент:', node);
				/* // Проверяем, если добавленный элемент имеет класс 'player'
				if (node.classList && node.classList.contains('player')) {
					// Получаем видео элемент
					const video = node.querySelector('video');

					if (video) {
						console.log(video.style.width);
						console.log(video.style.height);
						console.log(video.style.transform);
						// Применяем стили для горизонтальной ориентации видео
						video.style.width = "100vh";
						video.style.height = "100vw";
						video.style.transform = "rotate(90deg)";
						video.style.transformOrigin = "bottom left";
						video.style.marginTop = "-100vw";
						video.style.objectFit = "cover";  // Убедимся, что видео не деформируется
					}
				} */
			});
		});
	});

	// Настройки для наблюдения за DOM
	observer.observe(document.body, {
		childList: true, // Следим за добавлением новых элементов
		subtree: true    // Следим за вложенными изменениями
	});
})();