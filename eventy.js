const assert = require('assert')

Object.prototype.checkMatch = function(o) {
	const self = this
	return Object.keys(this).every(function(key) {
		const val = self[key]
		// console.log(key, val, o[key] === val || val.checkMatch(o[key]))
		return o[key] === val || val.checkMatch(o[key])
	})
}

Function.prototype.checkMatch = function(o) {
	return this === o || this(o)
}

String.prototype.checkMatch = function(o) {
	return o === this
}

module.exports = function(o) {
	var handlers = []

	o.trigger = function(e) {
		handlers.filter(function(handler) {
			return handler[0].checkMatch(e)
		}).forEach(function(handler) {
			handler[1](e)
		})
	}

	o.addHandler = function(handler) {
		assert.equal(typeof(handler), 'object'); assert.notStrictEqual(handler, null)
		assert.equal(handler.length, 2)
		assert.equal(typeof(handler[1]), 'function')

		handlers.push(handler)
	}

	return o
}