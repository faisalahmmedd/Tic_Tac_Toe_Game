let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGame = document.querySelector("#newGame-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");


let playerTurn=true;   

let cnt=0;


const winPatterns=[
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,4,8],
    [2,4,6] 
];

const resetGame = () => {
    playerTurn = true;
    cnt=0;
    enableBoxes();
    msgContainer.classList.add("hide");
}



boxes.forEach( (box) => {

   box.addEventListener("click", () => {

     if(playerTurn)
     {
        box.innerText = "O";
        playerTurn=false;
     }
     else
     {
        box.innerText = "X";
        playerTurn=true;
     }

     box.disabled = true;

     cnt++;

    let winner = checkWinner();

    if(cnt===9 && winner!=true)
    {
        gameDraw();
    }

   });

});

const gameDraw = () => {
    msg.innerText = "Game was a draw! Play Again";
    msgContainer.classList.remove("hide");
    disableBoxes();
}

const disableBoxes = () => {
    for(let box of boxes)
    {
        box.disabled = true;
    }
}

const enableBoxes = () => {
    for(let box of boxes)
    {
        box.disabled = false;
        box.innerText = "";
    }
}

const showWinner = (val1) => {
   msg.innerText = `Congratualtions! Winner is ${val1}`;
   msgContainer.classList.remove("hide");
   disableBoxes();
};

const checkWinner = () => {
    for(let pattern of winPatterns)
    {
       let val1=boxes[pattern[0]].innerText;
       let val2=boxes[pattern[1]].innerText;
       let val3=boxes[pattern[2]].innerText;

       if(val1!="" && val2!="" && val3!="")
       {
         if(val1===val2 && val2===val3)
         {
            showWinner(val1);
            return true;
         }
       }

    }
    return false;
};

newGame.addEventListener("click",resetGame);
resetBtn.addEventListener("click",resetGame);