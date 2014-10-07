module.exports = function(game) {
	function World() {
		var world = {
			type: World.instanceType
		}

		return world
	}
	World.instanceType = 'cubish|world'

	return World
}