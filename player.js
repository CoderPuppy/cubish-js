module.exports = function(game) {
	const Health = require('./health')(game)

	function Player() {
		var player = {
			type: Player.instanceType
		}

		player.health = Health(player)

		return player
	}
	Player.instanceType = 'cubish|player'

	return Player
}