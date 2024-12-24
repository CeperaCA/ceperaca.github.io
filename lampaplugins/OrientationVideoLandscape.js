(function () {
	'use strict';
	let video = document.getElementsByTagName("video")[0];
	
	if (video) {
		if (document.body.classList.contains('orientation--portrait')) {
			oldWidth = video.style.width;
			oldHeight = video.style.height;
			
			video.style.width = oldHeight;
			video.style.height = oldWidth;
		}
	}
})();