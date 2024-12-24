(function () {
	'use strict';
	
	const sheet = document.styleSheets[0];
	sheet.insertRule('video { width: 100vh; height: 100vw; transform: rotate(90deg); transform-origin: bottom left; margin-top: -100vw; }', sheet.cssRules.length);
})();