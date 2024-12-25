(function () {
	'use strict';
	
	// Используем MutationObserver для отслеживания добавления видео на страницу
	const observer = new MutationObserver(function(mutationsList, observer) {
	mutationsList.forEach(function(mutation) {
		// Для каждого добавленного элемента проверяем, является ли он видео
		mutation.addedNodes.forEach(function(node) {
			console.log("node.className="+node.className);
			if (node.classList[0] === 'player') {
				video = node.childNodes[0].childNodes[0].childNodes[0];
				video.style.cssText = "width: 100vh; height: 100vw; transform: rotate(90deg); transform-origin: bottom left; margin-top: -100vw;";
			}
		});
	});
	});

	// Настройки для наблюдения за DOM
	observer.observe(document.body, {
		childList: true,      // Следим за добавлением новых элементов
		subtree: false         // Следим за вложенными изменениями
	});
})();