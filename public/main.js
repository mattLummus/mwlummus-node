(function () {
	var app = require('./js/app')(),
		atom = app(),
		hg = require('mercury');

		hg.app(document.body, atom, app.render);
})();
