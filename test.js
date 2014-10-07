const game = require('./game')()

const BasicInventory = require('./basic-inv')(game)
const Pile = require('./pile')(game)
const Player = require('./player')(game)
const vanilla = game.use(require('./vanilla')())

var player = Player()
player.health.food.remove(10)

var inv = BasicInventory(5)

var beef = Pile(vanilla.items.beef, { cooked: true })
inv.add(beef)

inv.add(beef.ofSize(64))

console.log(inv)