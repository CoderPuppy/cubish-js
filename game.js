const eventy = require('./eventy')

function Game() {
	var game = {
		type: Game.instanceType,

		use: function(pl) {
			var impl = pl(this)

			if(typeof(impl.items) == 'object' && impl.items !== null) {
				Object.keys(impl.items).forEach(function(id) {
					const item = impl.items[id]

					item.plugin = impl
					item.id = id
					item.fullName = impl.id + '|' + item.id

					item.checkMatch = function(pile) {
						return typeof(pile) == 'object' && pile !== null && pile.type == 'cubish:pile' && pile.itemType == item
					}

					;(function() {
						if(typeof(item.nameKey) == 'string') {
							const nameKeyStr = item.nameKey
							item.nameKey = function(pile) {
								return nameKeyStr
							}
						} else if(typeof(item.nameKey) != 'function') {
							item.nameKey = function(pile) {
								return item.id
							}
						}
						const realFn = item.nameKey
						item.nameKey = function(pile) {
							const real = realFn.call(item, pile)
							if(real.indexOf('|')) {
								return real
							} else {
								return impl.id + '|' + real
							}
						}
					})()

					;(function() {
						if(typeof(item.maxQty) == 'number') {
							var num = item.maxQty
							item.maxQty = function(pile) {
								return num
							}
						} else if(typeof(item.maxQty) != 'function') {
							item.maxQty = function(pile) {
								return 64
							}
						}
					})()
				})
			}

			if(typeof(impl.handlers) == 'object' && impl.handlers !== null && typeof(impl.handlers.length) == 'number') {
				[].slice.call(impl.handlers).forEach(function(handler) {
					game.addHandler(handler)
				})
			}

			return impl
		}
	}
	eventy(game)

	return game
}
Game.instanceType = 'cubish|game'

module.exports = Game