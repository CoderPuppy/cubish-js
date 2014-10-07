module.exports = function(id, definition) { return function(game) {
	var pl = {
		id: id,

		items: {},
		handlers: []
	}

	var def = {
		items: pl.items,
		item: function(name, definition) {
			return pl.items[name] = definition
		},

		handlers: pl.handlers,
		handle: function(filters, handler) {
			pl.handlers.push([ filters, handler ])
		}
	}
	definition.call(def, def, pl)

	return pl
} }