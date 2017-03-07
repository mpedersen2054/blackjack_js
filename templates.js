
var Tmpls = {
  boardTmpl: function(playerName) {
    return `
    <div id="game">
      <div class="dealer">
        <h2>Dealer</h2>
      </div>

      <div class="player">
        <h2>Player ( ${playerName} )</h2>
      </div>

      <div class="actions">
        <button class="deal">Deal</button>
        <button class="hit">Hit</button>
        <button class="stay">Stay</button>
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
