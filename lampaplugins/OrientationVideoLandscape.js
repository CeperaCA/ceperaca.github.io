(function () {
	'use strict';
	let video = document.getElementsByTagName("video")[0];
	
	if (video) {
		if (document.body.classList.contains('orientation--portrait')) {
			document.body.classList.remove('orientation--portrait');
			document.body.classList.add('orientation--landscape');
			
			oldWidth = video.style.width;
			oldHeight = video.style.height;
			
			video.style.width = oldHeight;
			video.style.height = oldWidth;
		}
	}
})();