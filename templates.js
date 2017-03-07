
var Tmpls = {
  boardTmpl: function(playerName) {
    return `
    <div id="game">
      <div class="dealer">
        <h4>Dealer</h4>
      </div>

      <div class="player">
        <h4>Player ( ${playerName} )</h4>
      </div>

      <div class="actions">
        <button class="deal">Deal</button>
      </div>

      <hr>

      <div class="card-totals">
        <div>Player card total: <span class="player-card-total"></span></div>
        <div>Dealer card total: <span class="dealer-card-total"></span></div>
      </div>

      <hr>

      <div class="status">
        Player score: <span class="player-score">0</span> <br>
        dealer score: <span class="dealer-score">0</span>
      </div>
    </div>
    `
  }
}
