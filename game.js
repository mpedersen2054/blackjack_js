
function Game(player, dealer) {

  this.player = player
  this.dealer = dealer
  this.deck = new Deck()

  this.playerWins = 0
  this.dealerWins = 0

  this.playerScore = 0
  this.dealerScore = 0
  this.whoseTurn = 'player'

}

Game.prototype.dealCards = function() {
  var self = this

  // instantiate new deck(shuffles on instantiation)
  this.deck = new Deck()

  // sets the hand scores to 0. used so we can called
  // this.dealCards() once a round is over to reset cards on table
  this.dealerScore = 0
  this.playerScore = 0
  $('.player-card-total').html(this.playerTotal)
  $('.dealer-card-total').html(this.dealerTotal)

  // reset the players hands
  this.player.hand = []
  this.dealer.hand = []

  // draw 2 cards for player/dealer
  this.player.draw(this.deck).draw(this.deck)
  this.dealer.draw(this.deck).draw(this.deck)

  // show the hexidecimal cards for hand
  this.player.showHand($('.player'))
  this.dealer.showHand($('.dealer'))

  // if the dealer has 21 (even before user makes move)
  // dealer will win automatically
  if (this.checkForBust(this.dealer.hand) == 21) {
    this.whoseTurn = 'dealer'
    this.player.showHand($('.dealer'))

    // handle dealer win
  }
  else if (this.checkForBust(this.player.hand) == 21) {
    // handle player auto win
  }

  // hide the 'deal' btn, show the 'hit' & 'stay' btns
  $('.after-game-btns').css('display', 'none')
  $('.during-game-btns').css('display', 'block')

  // attach e handler onto DOM that will deal the player
  // a new card, and handle logic depending on what the card is
  $('.hit').on('click', function() {
    self.player.draw(self.deck)
    self.player.showHand($('.player'))
    self.playerTotal = self.checkForBust(self.player.hand)
    self.getCardTotal('player')

    if (self.playerTotal == 21) {
      console.log('DEALER TURN NOW')
      self.dealerTurn(this.dealer.hand, this.player.playerTotal)
      self.handleEndGame()
    }
    else if (self.playerTotal > 21) {
      console.log('HANDLE BUSSSSSTTTT')
      self.handleEndGame()
    }
    else {
      console.log('KEEEEPPPPPPP GOIN')
    }
  })

  // attach e handler onto DOM that will start the dealer's
  //turn if the user stays
  $('.stay').on('click', function() {
    self.dealerTurn(this.dealer.hand, this.player.playerTotal)
    self.handleEndGame()
  })

  // gets/updates DOM with the new totals
  this.getCardTotal('player')
  this.getCardTotal('dealer')

  console.log(this.deck)
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

// handle aces logic. if playerTotal > 21 & has ace(s), make
// ace(s) worth 1 instead of 11 until the total is below 21
Game.prototype.checkForBust = function(hand, aces, total) {
  if (!aces || ! total) {
    var aces = []
    var total = 0
  }
  for (var i = 0; i< hand.length; i++) {
    if (hand[i].weight == 11){
      aces.push(i)
    }
    total += hand[i].weight
  }

  if (total > 21 && aces.length == 0) {
    return total
  }
  else if (total < 22) {
    return total
  }
  else{
    hand[aces[aces.length-1]].weight = 1;
    aces.pop()

    // recursively call method incase there is more
    // than 1 ace
    this.checkForBust(hand, aces, total)
  }
}

// modify player/dealer win score, hide 'hit' & 'stay' btns
// show 'deal' btn again
Game.prototype.handleEndGame = function() {
  if (this.dealerScore > 21) {
    this.playerWins++
    $('.player-score').html(this.playerWins)
  }
  else{
    this.dealerWins++
    $(`.dealer-score`).html(this.dealerWins)
  }

  $('.after-game-btns').css('display', 'block')
  $('.during-game-btns').css('display', 'none')

  $('.hit').off()
}

//loop that checks dealer score against player score and 21
Game.prototype.dealerTurn = function(dealerHand, playerTotal){
  while(this.checkForBust(dealerHand) < playerTotal || this.checkForBust(dealerHand) < 22){
    self.dealer.draw(self.deck)
    self.dealer.showHand($('.dealer'))
    self.dealerTotal = self.checkForBust(self.dealer.hand)
    self.getCardTotal('dealer')
    setInterval(1500)
  }
}
