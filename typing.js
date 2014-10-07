function typing(o) {
	if(typeof(o) != 'object' || o === null) throw new Error('must be an object')
	if(typeof(o.type) != 'string') throw new Error('must have a type')

	return o
}
typing.cast = function(o, type) {
	if(typeof(o) != 'object' || o === null) throw new Error('must be an object')
	if(o.type == type) return o
	if(typeof(o.implements) == 'object' && o.implements !== null && typeof(o.implements.length) == 'number' && ~[].indexOf.call(o.implements, type))
		return o
	throw new Error('can\'t cast ' + o + ' to ' + type)
}

module.exports = typing