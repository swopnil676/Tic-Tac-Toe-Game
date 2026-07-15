let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#reset-btn");
let newbtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turn0 = true; //playerX, playerO
let count = 0; // 🆕 tracks number of clicks

const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

    //🔥reset the game for new winner
const resetGame = () => {
    turn0 = true;
    count = 0; // 🆕 reset count on new game
    msg.classList.remove("draw"); // 🆕 clean up on reset
    enableBoxes();
    msgContainer.classList.add("hide");
}
const enableBoxes = () => {
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
        box.style.color = ""; // 🆕 reset color on new game
    }
}

    //🔵functinality of O and X
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    // console.log("box was clicked!");
    if (turn0) {
      //playerO
      box.innerText = "O";
      box.style.setProperty("color", "green", "important"); // 🆕
      turn0 = false;
    } else {
      //playerX
      box.innerText = "X";
      box.style.setProperty("color", "red", "important"); // 🆕 optional
      turn0 = true;
    }
    box.disabled = true;
    count++; // 🆕 increment count on every click

    checkWinner();
  });
});

    //🔥disabled all buttons when get a winner
const disableBoxes = () => {
    for(let box of boxes){
        box.disabled = true;
    }
}

//🔴showing who is winner
const showWinner = (winner) => {
    msg.classList.remove("draw"); // 🆕 remove draw class if any
    msg.innerText = `Congratulations, Winner is ${winner} !!`;
    msgContainer.classList.remove("hide");
    disableBoxes();
}

//🔥separate function to show draw message
const showDraw = () => {
    msg.classList.add("draw"); // 🆕 add draw class
    msg.innerText = "It's a Draw! No Winner this time.";
    msgContainer.classList.remove("hide");
}

    //🟡checking the pattern for win
const checkWinner = () => {
    for (let pattern of winPatterns) {
        // console.log(pattern[0], pattern[1], pattern[2]);
        // console.log(
        //     boxes[pattern[0]].innerText, 
        //     boxes[pattern[1]].innerText, 
        //     boxes[pattern[2]].innerText
        // );

        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;
    
        if(pos1Val != "" && pos2Val != "" && pos3Val != ""){
            if(pos1Val===pos2Val && pos2Val===pos3Val){
                // console.log("winner!", pos1Val);
                showWinner(pos1Val);
                return; // 🆕 stop checking after a winner is found
            }
        }
    }
        // 🆕 if all 9 boxes are clicked and no winner → it's a draw
    if(count === 9){
        showDraw();
    }
};

newbtn.addEventListener("click", resetGame);
resetbtn.addEventListener("click", resetGame);