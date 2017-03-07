
function Game(player, dealer) {

  this.player = player
  this.dealer = dealer
  this.deck = new Deck()

  this.playerScore = 0
  this.dealerScore = 0

}

Game.prototype.dealCards = function() {
  this.player.draw(this.deck).draw(this.deck)
  this.dealer.draw(this.deck).draw(this.deck)

  this.player.showHand($('.player'))
  this.dealer.showHand($('.dealer'))
  console.log(this.dealer.hand[0])
}
