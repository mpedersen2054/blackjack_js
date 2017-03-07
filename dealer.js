
var hideHexi = 'x1f0a0'

function Dealer() {

  this.hand = []
}

Dealer.prototype.hideCard = function() {
  if (this.hand.length) {
    this.hand[0].cardImg = hideHexi
  }
}

Dealer.prototype.draw = function(deck) {
  if (!deck || deck.deck.length < 1) {
    console.log('There are no cards left in the deck.')
    return -1
  }
  var card = deck.deal()
  this.hand.push(card)
  return this
}

// pass in jquery elem and appends card w/ unicode
Dealer.prototype.showHand = function(elem) {
  for (var i = 0; i < this.hand.length; i++) {
    elem.append(`<div class="card">&#${this.hand[i].cardImg};</div>`)
  }
}
