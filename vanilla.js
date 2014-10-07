const plugin = require('./plugin')

module.exports = function() { return plugin('cubish:vanilla', function() {
	this.item('beef', {
		data: { cooked: Boolean }
	})

	this.handle({
		type: 'click',
		clicker: function(p) {
			return p.type == 'cubish|player' && p.health.food.hasRoom()
		},
		button: 'right',
		held: this.items.beef,
		on: null
	}, function(e) {
		e.clicker.health.food.add(8)
		console.log(e)
	})
}) }