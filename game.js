
function Game(player, dealer) {

  this.player = player
  this.dealer = dealer
  this.deck = new Deck()

  this.playerScore = 0
  this.dealerScore = 0
  this.whoseTurn = 'player'

}

Game.prototype.dealCards = function() {
  this.player.draw(this.deck).draw(this.deck)
  this.dealer.draw(this.deck).draw(this.deck)

  this.player.showHand($('.player'))
  this.dealer.showHand($('.dealer'))

  $('.actions').html(`<button class="hit">Hit</button><button class="stay">Stay</button>`)

  this.getCardTotal('player')
  this.getCardTotal('dealer')
}

Game.prototype.getCardTotal = function(who) {
  if (who == 'dealer' && whoseTurn == 'player') {
    this.dealerScore += this.dealer.hand[1].val
    $('.dealer-card-total').html(this.dealerScore)
  }
  if (who == 'dealer' && whoseTurn == 'dealer') {
    for (var i = 0; i < this.dealer.hand.length; i++) {
      this.dealerScore += this.dealer.hand[i].val
    }
    $('.dealer-card-total').html(this.dealerScore)
  }
  else {
    for (var i = 0; i < this.player.hand.length; i++) {
      this.playerScore += this.player.hand[i].val
    }
    $('.player-card-total').html(this.playerScore)
  }
}
