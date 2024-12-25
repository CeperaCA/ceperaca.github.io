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
						// Создаем новый элемент video с теми же аттрибутами
						const newVideo = document.createElement('video');

						// Копируем атрибуты, если необходимо
						newVideo.class = video.class;
						newVideo.poster = video.poster;
						newVideo.crossorigin = video.crossorigin;
						newVideo.playsinline = video.playsinline;
						newVideo.src = video.src;

						// Применяем стили для горизонтальной ориентации видео
						newVideo.style.width = '100vh';
						newVideo.style.height = '100vw';
						newVideo.style.transform = 'rotate(90deg)';
						newVideo.style.transformOrigin = 'bottom left';
						newVideo.style.marginTop = '-100vw';
						newVideo.style.objectFit = 'cover';  // Убедимся, что видео не деформируется

						// Заменяем старый элемент на новый
						video.parentNode.replaceChild(newVideo, video);
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