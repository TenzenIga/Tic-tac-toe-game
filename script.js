
/* the best article to learn how to implement minimax algorithm for tic-tac-toe is https://medium.freecodecamp.com/how-to-make-your-tic-tac-toe-game-unbeatable-by-using-the-minimax-algorithm-9d690bad4b37#.jv5w63sps
*/

/*$(window).on('resize', function() {
  var win = $(this);
  if (win.width() < 600) {

    $('#reset').addClass('btn-block');

  } else {
    $('#reset').removeClass('btn-block');
  }
}) */
var table= [0,1,2,3,4,5,6,7,8];
var keys = true; // to off or on keyboard
var btnOn = true; //to off or on switch buttons
 var ai = {
     sign:'O',
     className: 'text-danger'
 }
 var human = {
     sign:'X',
     className:'text-primary'
 }
function playX(){
   if(btnOn){
        human.sign = 'X';
       human.className = 'text-primary';
    ai.sign ='O';
    ai.className = 'text-danger';   
    }
          }// change turn 

 function playO(){
     if(btnOn){
        human.sign='O';
        human.className= 'text-danger';   
     
        ai.sign = 'X';
        ai.className = 'text-primary';       
     $('#0').text(ai.sign).addClass(ai.className);
     table[0] = ai.sign;          
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
    
    if(checkWin(newBoard, human.sign)){
        return {score:-10};
    }else if(checkWin(newBoard, ai.sign)){
        return {score:10};
    }else if(availSpots.length ===0){
        return {score:0};
    }

var moves= [];
for(var i = 0;i< availSpots.length; i++){
    var move = {};
        move.index = newBoard[availSpots[i]];
    
    newBoard[availSpots[i]] = player;
    if(player == ai.sign){
        var result = minimax(newBoard, human.sign);
        move.score = result.score;
    }else{
        var result =minimax(newBoard, ai.sign);
        move.score = result.score;
        
    }
    newBoard[availSpots[i]] = move.index;
    
    moves.push(move);
}
    var bestMove;
    if(player === ai.sign){
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
        $(this).text(human.sign).addClass(human.className);
       
        table[id]=human.sign; 
        id = minimax(table, ai.sign);
        $('#'+ id.index).text(ai.sign);
        $('#'+ id.index).addClass(ai.className);
     table[id.index] = ai.sign;
        if(checkWin(table, ai.sign)){
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
    $('td').removeClass('text-primary');
    $('td').removeClass('text-danger');
    keys=true;
    btnOn=true;
 $('#result').text('');
}
