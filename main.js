
var name = prompt('What is your name?')

// append game html to DOM
$('#main').append(Tmpls.boardTmpl(name))

var game = new Game(new Player(name), new Dealer())
game.init()
