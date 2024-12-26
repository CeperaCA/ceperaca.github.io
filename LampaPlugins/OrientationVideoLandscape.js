(function () {
	'use strict';
	
	console.log('[OrientationVideoLandscape]: ', 'v0.1');

	// Используем MutationObserver для отслеживания добавления элементов на страницу
	const observer = new MutationObserver(function(mutationsList, observer) {
		mutationsList.forEach(function(mutation) {
			// Проверяем каждый добавленный элемент
			mutation.addedNodes.forEach(function(node) {
				// Проверяем, если добавленный элемент имеет класс player
				if (node.classList && node.classList.contains('player')) {
					let panel = node.querySelector('.player-panel__right');

					if (panel) {
						let newDiv = document.createElement('div');
						newDiv.className = 'player-panel__rotate button';
						newDiv.innerHTML =
`<svg width="25" height="23" viewBox="0 0 25 23" fill="none" xmlns="http://www.w3.org/2000/svg">
	<!-- Левая стрелка -->
	<path d="M1,11 L3,8 L3,14 Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>

	<!-- Прямоугольник -->
	<rect x="7" y="5" width="12" height="13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>

	<!-- Правая стрелка -->
	<path d="M24,11 L22,8 L22,14 Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
</svg>`;

						newDiv.addEventListener('click', function() {
							console.log('[OrientationVideoLandscape]: ', 'Клик на новый элемент!');
						});

						panel.append(newDiv);

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