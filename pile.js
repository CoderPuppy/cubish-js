const eql = require('deep-equal')

module.exports = function(game) {
	function Pile(itemType, data, qty) {
		if(typeof(data) == 'number') qty = data, data = {}
		if(typeof(data) != 'object' || data === null) data = {}
		if(typeof(qty) != 'number') qty = 1

		var pile = {
			type: Pile.instanceType,
			itemType: itemType,
			data: data,
			qty: qty,

			maxQty: function() {
				return this.itemType.maxQty(this)
			},

			ofSize: function(qty) {
				return Pile(this.itemType, this.data, qty)
			},

			equals: function(other) {
				return this.itemType == other.itemType &&
				       eql(this.data, other.data)
			},

			inspect: function() {
				var res = this.itemType.fullName

				var keys = Object.keys(this.data)
				if(keys.length > 0) {
					res += '{'
					res += keys.map(function(key) {
						return key + ':' + JSON.stringify(data[key])
					}).join(', ')
					res += '}'
				}

				res += ' x ' + this.qty
				return res
			}
		}

		return pile
	}
	Pile.instanceType = 'cubish|pile'

	return Pile
}