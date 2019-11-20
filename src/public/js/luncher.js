// function luncher() {


//   // get the game box
//   let gameBox = document.getElementById('game-box');

//   gameBox.style.width = "100px";
//   gameBox.style.height = "100px";

// }

let luncher = {
  draw: function () {

    for (let i = 0; i <= 9; i++) {
      for (let j = 0; j <= 9; j++)
        document.getElementById('game-box').append(`<div class="cell" id="cell-${i}-${j}"></div>`)
    }
  }
}

function draw() {


}