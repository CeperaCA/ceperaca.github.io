(function () {
	'use strict';

	console.log('start OrientationVideoLandscape');
	
	// Используем MutationObserver для отслеживания добавления элемента video на страницу
	const observer = new MutationObserver(function(mutationsList, observer) {
		mutationsList.forEach(function(mutation) {
			// Для каждого добавленного элемента проверяем, является ли он video
			mutation.addedNodes.forEach(function(node) {
				// Проверяем, если добавленный элемент имеет класс player
				if (node.classList && node.classList.contains('player')) {
					// Получаем video элемент
					const video = node.querySelector('video');

					if (video) {
						setTimeout(function() {
							// Применяем стили для горизонтальной ориентации элемента video
							video.style.width           = "100vh";
							video.style.height          = "100vw";
							video.style.transform       = "rotate(90deg)";
							video.style.transformOrigin = "bottom left";
							video.style.marginTop       = "-100vw";
							video.style.objectFit       = "cover"; // Убедимся, что элемент video не деформируется
							
							console.log(video.style.width);
							console.log(video.style.height);
							console.log(video.style.transform);
							console.log(video.style.transformOrigin);
							console.log(video.style.marginTop);
							console.log(video.style.objectFit);
						}, 2000);
					}
				}
			});
		});
	});

	// Настройки для наблюдения за DOM
	observer.observe(document.body, {
		childList: true, // Следим за добавлением новых элементов
		subtree:   true  // Следим за вложенными изменениями
	});
})();