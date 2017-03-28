
var table= [0,1,2,3,4,5,6,7,8];
var computer = 'O';
var human = 'X';
var keys = true; // to off or on keyboard
var btnOn = true; //to off or on switch buttons
 
function playX(){
   if(btnOn){
        human = 'X';
    computer ='O'
    }
          }// change turn 
 function playO(){
     if(btnOn){human='O';
     computer='X';
     $('#0').text(computer);
     table[0] = computer;          
 }
 }
//array of empty spots
function empty(arr){
    return arr.filter(function(item){
        return item != 'X' && item !='O';
    })
}

// Функция чтобы определить конец игры
 function checkWin(board,player){
     if(
     (board[0] == player && board[1] == player && board[2] == player) ||
    (board[3] == player && board[4] == player && board[5] == player) ||       
     (board[6] == player && board[7] == player && board[8] == player) ||
     (board[0] == player && board[3] == player && board[6] == player) ||
      (board[1] == player && board[4] == player && board[7] == player) ||
      (board[2] == player && board[5] == player && board[8] == player) ||
      (board[0] == player && board[4] == player && board[8] == player) ||     
     (board[2] == player && board[4] == player && board[6] == player)
     ){
         return true;
     }else{
         return false;
     }
 }
//minimax algorithm
function minimax(newBoard, player){
    var availSpots = empty(newBoard);
    
    if(checkWin(newBoard, human)){
        return {score:-10};
    }else if(checkWin(newBoard, computer)){
        return {score:10};
    }else if(availSpots.length ===0){
        return {score:0};
    }

var moves= [];
for(var i = 0;i< availSpots.length; i++){
    var move = {};
        move.index = newBoard[availSpots[i]];
    
    newBoard[availSpots[i]] = player;
    if(player == computer){
        var result = minimax(newBoard, human);
        move.score = result.score;
    }else{
        var result =minimax(newBoard, computer);
        move.score = result.score;
        
    }
    newBoard[availSpots[i]] = move.index;
    
    moves.push(move);
}
    var bestMove;
    if(player === computer){
        var bestScore = -1000;
        for(var i=0;i < moves.length; i++){
            if(moves[i].score > bestScore){
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    }else{
    
    var bestScore = 1000;
     for(var i = 0; i < moves.length;i++){
         if(moves[i].score < bestScore){
             bestScore = moves[i].score;
             bestMove = i;
         }
     }
    
    
}
     return moves[bestMove];
}

$('td').on('click', function(e){ // write X or O on click
  btnOn = false;
    if($(this).text() ===''){
        // check if square is empty
      if(keys){
        var id = $(this).attr('id');
        var tie = empty(table);
        $(this).text(human);
       
        table[id]=human; 
        id = minimax(table,computer);
        $('#'+ id.index).text(computer);
     table[id.index] = computer;
        if(checkWin(table,computer)){
            $('#result').text("Computer won!");
            keys=false;
        }
        if(tie.length===1 || tie.length===2){
             $('#result').text('Tie!');
            
        }
           
      }
        
    }
})
function reset(){
    table= [0,1,2,3,4,5,6,7,8];
    $('td').text('');
    keys=true;
    btnOn=true;
 $('#result').text('');
}
