(function () {
	'use strict';
	
	console.log('OrientationVideoLandscape v0.1');
	
	// Используем MutationObserver для отслеживания добавления элементов на страницу
	const observer = new MutationObserver(function(mutationsList, observer) {
		mutationsList.forEach(function(mutation) {
			// Проверяем каждый добавленный элемент
			mutation.addedNodes.forEach(function(node) {
				// Проверяем, если добавленный элемент имеет класс player
				if (node.classList && node.classList.contains('player')) {
					const panel = node.querySelector('.player-panel__right');

					if (panel) {
						panel.append(panel.lastElementChild);
						
						// Останавливаем наблюдение
						observer.disconnect();
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