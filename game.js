
function Game(player, dealer) {

  this.player = player
  this.dealer = dealer
  this.deck = new Deck()

  this.playerScore = 0
  this.dealerScore = 0
  this.whoseTurn = 'player'

}

Game.prototype.dealCards = function() {
  var self = this

  this.player.draw(this.deck).draw(this.deck)
  this.dealer.draw(this.deck).draw(this.deck)

  this.player.showHand($('.player'))
  this.dealer.showHand($('.dealer'))

  $('.actions').html(`<button class="hit">Hit</button><button class="stay">Stay</button>`)
  $('.hit').on('click', function() {
    if (self.playerScore > 21) {
      console.log('YOU LOOOOOOOOOSE')
    }
    else {
      console.log('DEALING ANOTHER CARRDDDDDDDD')
      self.player.draw(self.deck)
      self.player.showHand($('.player'))
      self.getCardTotal('player')
    }
  })
  $('.stay')

  this.getCardTotal('player')
  this.getCardTotal('dealer')
}

Game.prototype.getCardTotal = function(who) {
  if (who == 'dealer' && this.whoseTurn == 'player') {
    this.dealerScore += this.dealer.hand[1].weight
    $('.dealer-card-total').html(this.dealerScore)
  }
  if (who == 'dealer' && this.whoseTurn == 'dealer') {
    for (var i = 0; i < this.dealer.hand.length; i++) {
      this.dealerScore += this.dealer.hand[i].weight
    }
    $('.dealer-card-total').html(this.dealerScore)
  }
  if (who == 'player') {
    var score = 0
    for (var i = 0; i < this.player.hand.length; i++) {
      score += this.player.hand[i].weight
      this.playerScore = score
    }
    $('.player-card-total').html(this.playerScore)
  }
}

Game.prototype.checkForBust
