module.exports = function(game) {
	function Health(container) {
		var health = {
			type: Health.instanceType,

			container: container,

			food: {
				current: 20,
				max: 20,

				add: function(amt) {
					this.current += Math.abs(amt)
					if(this.current > this.max) {
						game.trigger({
							type: 'cubish|throwup',
							health: health,
							container: health.container
						})
						this.current = 0
					}
				},

				remove: function(amt) {
					this.current -= Math.abs(amt)
					if(this.current < 0) this.current = 0
				},

				hasRoom: function() {
					return this.current < this.max
				}
			}
		}

		return health
	}
	Health.instanceType = 'cubish|health'

	return Health
}