(function () {
	'use strict';

	console.log('[OrientationVideoLandscape]: ', 'v0.1');

	// Используем MutationObserver для отслеживания добавления элементов на страницу
	const observer = new MutationObserver(function(mutationsList, observer) {
        console.log('[OrientationVideoLandscape]: ', 'Старт отслеживания добавления элементов на страницу');

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
							`<svg width="25" height="23" viewBox="0 0 50 50" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
								<path d="M32.97 5.03c6.53 3.1 11.22 9.45 11.93 16.97h3c-1.02-12.32-11.32-22-23.9-22-.45 0-.88.04-1.33.07l7.63 7.63 2.67-2.67zm-12.51-1.54c-1.17-1.17-3.07-1.17-4.24 0l-12.73 12.73c-1.17 1.17-1.17 3.07 0 4.24l24.04 24.04c1.17 1.17 3.07 1.17 4.24 0l12.73-12.73c1.17-1.17 1.17-3.07 0-4.24l-24.04-24.04zm9.2 38.89l-24.05-24.04 12.73-12.73 24.04 24.04-12.72 12.73zm-14.63.59c-6.53-3.1-11.22-9.45-11.93-16.97h-3c1.02 12.32 11.32 22 23.9 22 .45 0 .88-.04 1.33-.07l-7.63-7.63-2.67 2.67z"/>
							</svg>`;

						// Добавляем обработчик события на клик
						newDiv.addEventListener('click', function() {
							console.log('[OrientationVideoLandscape]: ', 'Клик на кнопку поворота экрана');

                            // Получаем видео элемент
                            const video = document.body.querySelector('video');

                            if (video) {
                                // Применяем стили для горизонтальной ориентации видео
                                if (!video.getAttribute('style') || video.style.transform == 'unset') {
                                    video.style.width           = '100vh';
                                    video.style.height          = '100vw';
                                    video.style.transform       = 'rotate(90deg)';
                                    video.style.transformOrigin = 'bottom left';
                                    video.style.marginTop       = '-100vw';
                                } else {
                                    video.removeAttribute('style');
                                }
                            }
						});

						panel.append(newDiv);
                        console.log('[OrientationVideoLandscape]: ', 'Добавлена кнопка поворота экранов');

						// Останавливаем наблюдение
						observer.disconnect();
                        console.log('[OrientationVideoLandscape]: ', 'Остановка отслеживания добавления элементов на страницу');
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