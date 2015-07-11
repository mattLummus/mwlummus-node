// app.js is the atom (top level) of the application.

module.exports = function () {
	var hg = require('mercury'),
		h = hg.h;

	function App() {
		var state = hg.struct({
			time: hg.value(new Date())
		});

		function tick() {
			setTimeout(function () {
				state.time.set(new Date());
				tick();
			}, 1000);
		}

		tick();
		return state;
	}

	App.render = function render(state) {
		return h('.page', h('.wrapper', [
			h('h1', 'Hello World'),
			h('h3', 'The time is: ' + state.time)
		]));
	};

	return App;
}
