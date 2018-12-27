/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scoreAll,
  scoreCurrent,
  activePlayer,
  gamePlaying,
  lastdice,
  lastdice1,
  scoreToWin = 100;

init();

function btn() {
  //do smth
}

document.querySelector(".btn-roll").addEventListener("click", function() {
  if (gamePlaying) {
    //1.ranodm number
    var dice = Math.floor(Math.random() * 6) + 1;
    var dice1 = Math.floor(Math.random() * 6) + 1;
    //2.display result

    
    var diceDOM = document.querySelector(".dice");
    //1
    document.querySelector(".dice1").style.display = "block";
    document.querySelector(".dice1").src = "dice-" + dice1 + ".png";
    //2
    diceDOM.style.display = "block";
    diceDOM.src = "dice-" + dice + ".png";
    //check
    console.log("dice:" + dice);
    console.log("lastdice:" + lastdice);
    console.log("dice1:" + dice1);
    console.log("lastdice1:" + lastdice1);

    //checking if there were two six in a row on one dice 
    if ((dice === 6 && lastdice === 6) || (dice1 === 6 && lastdice1 === 6)) {
      scoreAll[activePlayer] = 0;
      document.getElementById("score-" + activePlayer).textContent = "0";
      nextPlayer();
      lastdice = 0;
      lastdice1 = 0;
    } else {
      lastdice = dice;
      lastdice1 = dice1;
    }

    //3.upadate the round score IF the rolled number was NOT a 1 (Check for both dice)
    if (dice > 1 && dice1 > 1) {
      //add to current score
      scoreCurrent = scoreCurrent + dice + dice1;
      document.querySelector(
        "#current-" + activePlayer
      ).textContent = scoreCurrent;
    } else {
      //next player
      lastdice = 0;
      lastdice1 = 0;
      nextPlayer();
    }
  }
});

document.querySelector(".btn-hold").addEventListener("click", function() {
  if (gamePlaying) {
    // Add Current score to global score
    scoreAll[activePlayer] += scoreCurrent;

    //update the UI
    document.getElementById("score-" + activePlayer).textContent =
      scoreAll[activePlayer];
    //check if player won the game

    if (scoreAll[activePlayer] >= scoreToWin) {
      document.getElementById("name-" + activePlayer).textContent = "Winner!!!";
      document.querySelector(".dice").style.display = "none";
      document.querySelector(".dice1").style.display = "none";
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.add("winner");
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.remove("active");
      gamePlaying = false;
    } else {
      //next player
      nextPlayer();
    }
  }
});

function nextPlayer() {
  //next player
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0); //change of active player
  scoreCurrent = 0;

  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";

  //document.querySelector(".player-0-panel").classList.add("active");
  //document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");
  document.querySelector(".dice").style.display = "none";
  document.querySelector(".dice1").style.display = "none";
}

document.querySelector(".btn-new").addEventListener("click", init);
document.querySelector("input").addEventListener("keypress", function(event) {
  if (event.keyCode === 13) {
    init();
  }
});

function init() {
  gamePlaying = true;
  scoreAll = [0, 0];
  scoreCurrent = 0;
  activePlayer = 0;
  scoreToWin = Number(document.getElementById("fname").value);
  console.log(scoreToWin);
  if (scoreToWin === 0 || isNaN(scoreToWin)) {
    console.log("wartość nie podana");
    scoreToWin = 100;
  }
  //document.getElementById("fname").value = "";
  document.querySelector(".dice").style.display = "none";
  document.querySelector(".dice1").style.display = "none";
  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";
  document.getElementById("name-0").textContent = "Player 1";
  document.getElementById("name-1").textContent = "Player 2";
  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.add("active");
}

//document.querySelector("#current-"+activePlayer).innerHTML = "<em>"+dice+"</em>";
//document.querySelector("#current-"+activePlayer).textContent = dice;
