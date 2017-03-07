
function Game(player, dealer) {

  this.player = player
  this.dealer = dealer
  this.deck = new Deck()

}

Game.prototype.init = function() {
  console.log('initting game!!!')
  console.log(this.player, this.dealer, this.deck)
}
