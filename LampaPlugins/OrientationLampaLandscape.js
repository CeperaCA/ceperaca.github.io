(function () {
	'use strict';

	console.log('[OrientationLampaLandscape]: ', 'v0.1');
	
	window.onload = function() {
		console.log('[OrientationLampaLandscape]: ', 'Страница загружен');
        $('body').removeClass('orientation--portrait orientation--landscape').addClass('orientation--landscape');
		console.log('[OrientationLampaLandscape]: ', 'Ориентация Lampa изменена на landscape');
    };
})();