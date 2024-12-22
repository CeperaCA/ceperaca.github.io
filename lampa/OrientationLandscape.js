(function () {
	'use strict';
	
	if (document.getElementsByTagName("video")[0]) {
		document.body.classList.remove('orientation--portrait');
		document.body.classList.add('orientation--landscape');
	}
})();