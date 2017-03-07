
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
    self.checkForBust(self.player.hand)
  })

  // $('.stay')

  this.getCardTotal('player')
  this.getCardTotal('dealer')
}

Game.prototype.getCardTotal = function(who) {
  // get the dealer total of only face up card ( during player's turn )
  if (who == 'dealer' && this.whoseTurn == 'player') {
    this.dealerScore += this.dealer.hand[1].weight
    $('.dealer-card-total').html(this.dealerScore)
  }

  // get the dealer total if its their turn
  if (who == 'dealer' && this.whoseTurn == 'dealer') {
    for (var i = 0; i < this.dealer.hand.length; i++) {
      this.dealerScore += this.dealer.hand[i].weight
    }
    $('.dealer-card-total').html(this.dealerScore)
  }

  // get the players total
  if (who == 'player') {
    var score = 0
    for (var i = 0; i < this.player.hand.length; i++) {
      score += this.player.hand[i].weight
      this.playerScore = score
    }
    $('.player-card-total').html(this.playerScore)
  }
}

Game.prototype.checkForBust = function(hand, aces, total) {
  if(!aces || ! total){
    var aces = [];
    var total = 0;
  }
  for(var i = 0; i< hand.length; i++){
    if (hand[i].weight == 11){
      aces.push(i);
    }
    total += hand[i].total;
  }
  if(this.total > 21 && aces.length == 0){
    return this.total;
  }
  else if(this.total < 21){
    return this.total;
  }
  else{
    hand[aces[aces.length-1]].weight = 1;
    aces.pop();
    return(checkForBust(hand, aces, total));
  }
}
