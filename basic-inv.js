module.exports = function(game) {
	var Pile = require('./pile')(game)

	function BasicInventory(size) {
		var inv = {
			type: BasicInventory.instanceType,
			implements: [ 'cubish|inv' ],

			size: size,
			slots: new Array(size).join().split(',').map(function() { return null }),

			add: function(newPile) {
				console.log('adding', newPile, this)
				var remaining = newPile.qty
				for (var slot = 0; slot < this.slots.length; slot++) {
					if(remaining == 0) return true

					var pile = this.slots[slot]
					if(pile == null) {
						this.slots[slot] = newPile.ofSize(remaining)
						return true
					} else if(pile.equals(newPile)) {
						var toAdd = Math.min(pile.maxQty() - pile.qty, remaining)
						remaining -= toAdd
						pile.qty += toAdd
					}
				}
				if(remaining == 0) return true
				return false
			}
		}

		return inv
	}
	BasicInventory.instanceType = 'cubish|basic-inv'

	return BasicInventory
}