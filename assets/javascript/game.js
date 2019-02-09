//Character Object Constructor
function Character(cName, cHealth, cImagePath, cSelectedByPlayer, cdefeatedByPlayer,cElementId,cAttackPower, cCounterAttackPower){
    this.name = cName;
    this.health = cHealth;
    this.imagePath = cImagePath;
    this.isSelectedByPlayer = cSelectedByPlayer;
    this.isDefeatedByPlayer = cdefeatedByPlayer;
    this.elementId = cElementId;
    this.attackPower = cAttackPower;
    this.counterAttackPower = cCounterAttackPower;
  }

var undefeatedCount = 8;
var characterBank = [];
var indexOfCurrentPlayer;
var indexOfCurrentOpponent = 0;
var health = 5;
var playerHealth = 15;
var counterAttack = 1;
var playerAttack = 5;
var themeSong;
var battleSong;


//CLICK EVENT
$("#click-to-play").click(function(){
    hideGameStart();
});

//ATTACK CLICK
$("#attack-button").click(function(){
    $(this).attr("disabled", "true");
    attack(indexOfCurrentPlayer);
});

function attack(playerOrOpponentIndex){
    var randomAttackAmount;
    if(playerOrOpponentIndex === indexOfCurrentPlayer){
        randomAttackAmount = randomAttack(characterBank[indexOfCurrentPlayer],indexOfCurrentPlayer);
        characterBank[indexOfCurrentOpponent].health -= randomAttackAmount;
        $("#attack-message").text("You Attacked: "+randomAttackAmount);
        $("#opponent").effect("shake",{},500);
        $("#attack-message").effect("puff",{percent:110},1000,function(){
            $("#attack-message").text("");
            //Check if opponent is defeated
            console.log("Check if opponent is still alive");
            if(characterBank[indexOfCurrentOpponent].health > 0){
                
                loadOpponent(characterBank[indexOfCurrentOpponent]);
                //counter attack
                attack(indexOfCurrentOpponent);
            }else{
                    console.log("Opponent is dead");
                    health +=5;
                    characterBank[indexOfCurrentPlayer].health = playerHealth;
                    loadPlayer(characterBank[indexOfCurrentPlayer]);
                    defeatStateFor(indexOfCurrentOpponent);
                    selectNextOpponent();
            }
            });
        
         
    }else if(playerOrOpponentIndex === indexOfCurrentOpponent){
        randomAttackAmount = randomAttack(characterBank[indexOfCurrentOpponent],indexOfCurrentOpponent);
        characterBank[indexOfCurrentPlayer].health -= randomAttackAmount;
        $("#attack-message").text("They Attacked: "+randomAttackAmount);
        $("#player").effect("shake",{},500);
        $("#attack-message").effect("puff", {percent:110}, 1000,function(){
            $("#attack-message").text("");
            //Check if player is defeated
            console.log("Check if player is still alive");
            if(characterBank[indexOfCurrentPlayer].health > 0){
                
               loadPlayer(characterBank[indexOfCurrentPlayer]);
               
                //counter attack
               // attack(indexOfCurrentOpponent);
            }else{
                    console.log("Playter is dead");
                    defeatStateFor(indexOfCurrentPlayer);
                    //selectNextOpponent();
            }
            });
        
        $("#attack-button").removeAttr("disabled");
        // console.log("Opponent Attack");
        // //Update Player UI here
        // loadPlayer(characterBank[indexOfCurrentPlayer]);
        // $("#player").effect("shake",{},500,function(){
        //     $("#attack-button").removeAttr("disabled");
        // });
    }else{
        console.log("ERROR IN ATTACK")
    }

    console.log("Player Health: " + characterBank[indexOfCurrentPlayer].health);
    console.log("Opponent Health: " + characterBank[indexOfCurrentOpponent].health);

}

function randomAttack(characterObject, indexOfPlayerOrOpponent){

    if(indexOfPlayerOrOpponent === indexOfCurrentPlayer){
        var actualAttack = Math.floor(Math.random() * characterObject.attackPower) + 1;
        console.log("Player Attack actual: " + actualAttack);
        console.log("Player Base Attack: " + characterObject.attackPower);
            return actualAttack
          
    }else if(indexOfPlayerOrOpponent === indexOfCurrentOpponent){
        var actualAttack = Math.floor(Math.random() * characterObject.counterAttackPower) + 1;

        console.log("Opponent Counter actual: " + actualAttack);
        console.log("Opponent Base Counter: " + characterObject.counterAttackPower);
            return actualAttack

    }else{
        console.log("Error in random attack");
    }
   
}

// if (typeof jQuery.ui != 'undefined') {
//     // UI loaded
//     console.log("Loaded UI");
//   }


//CLICK EVENT
$(".player-selection-card").click(function (){
    console.log("Click player selection");
    console.log(this);
    
    
    toggleSelectionOrBattleContainer($(this));
    setBattleContainer($(this));
    themeSong = $("#starWarsThemeSong");
    themeSong.trigger('pause');
    battleSong = $("#starWarsBattleSong");
    battleSong.trigger('play');
    
});

//HIDE GAME START UI
function hideGameStart(){
    var gameStartContainer = $("#game-start-container");
    gameStartContainer.removeClass('visible').addClass('hidden');
    $("#player-selection-container").removeClass('hidden').addClass('visible');
    var themeSong = $("#starWarsThemeSong");
     themeSong.trigger('play');
}

//CONTAINER TOGGLE
function toggleSelectionOrBattleContainer(element){
    var $battleContainer = $("#battle-container");
    var $playerSelectionContainer = $("#player-selection-container");

    if(element.attr("id") === "battle-container"){ 
        console.log("Battle container is visible");
        $battleContainer.removeClass('visible').addClass('hidden');
        $playerSelectionContainer.removeClass('hidden').addClass('visible');

        
    }else if(element.hasClass("player-selection-card")){
        console.log("Player container is visible, when user clicked");
        $playerSelectionContainer.removeClass('visible').addClass('hidden');
       $battleContainer.removeClass('hidden').addClass('visible');
    }else{
        console.log("Error");
    }
}

// BATTLE CONTAINER
function setBattleContainer(selectedByPlayer){
    var selectedElementId = getElementIdFromSelectionCard(selectedByPlayer);

    //Mark the selection as selected in the character bank
    for(var i=0;i<characterBank.length;i++){
        if(selectedElementId === characterBank[i].elementId){
            characterBank[i].isSelectedByPlayer = true;
            //ADD CHARACTER TO PLAYER UI
            indexOfCurrentPlayer = i;
            characterBank[i].attackPower = playerAttack;
            characterBank[i].health = playerHealth;
            loadPlayer(characterBank[i]);
            //break;
        }
    }
    //FIND SEQUENTIAL  OPPONENT
    selectNextOpponent();
}


    function selectNextOpponent(){
        if(undefeatedCount > 0){  
            var nextOpponent = characterBank[indexOfCurrentOpponent];
            if(!nextOpponent.isDefeatedByPlayer && !nextOpponent.isSelectedByPlayer){
                console.log("Found Next Opponent: " + characterBank[indexOfCurrentOpponent]);
                characterBank[indexOfCurrentOpponent].health = health;
                loadOpponent(characterBank[indexOfCurrentOpponent]);
            }else{
                indexOfCurrentOpponent++;
                selectNextOpponent();
            }
            
        }else{
            //Show Win Message
            console.log("You Won!");
            alert("You Won!");
            restartGameWithModal(false);
        }
    }

// //CHECK FOR DEFEAT
function defeatStateFor(indexOfPlayerOrOpponent){
   //Update users to defeat
   console.log(indexOfCurrentOpponent);


   if(indexOfPlayerOrOpponent === indexOfCurrentOpponent){
        characterBank[indexOfCurrentOpponent].isDefeatedByPlayer = true;
        console.log("Opponent Defeat Status"+characterBank[indexOfCurrentOpponent].isDefeatedByPlayer);
        // $("#opponent").effect("explode");
        $("#opponent-health").text("0");
        $("#attack-button").removeAttr("disabled");
        undefeatedCount--;

        //CHANGE PLAYER ATTACK
        characterBank[indexOfCurrentPlayer].attackPower++;

        console.log("Undefeated Count "+undefeatedCount);
   }else if(indexOfPlayerOrOpponent === indexOfCurrentPlayer){
       console.log("Player Dead")
       alert("You Lost!");
       restartGameWithModal(false);

   }
   

}

function restartGameWithModal(modalBool){
    if(modalBool){

    }else{
        undefeatedCount = 8;
        indexOfCurrentOpponent = 0;
        indexOfCurrentPlayer = 0;
        characterBank.length = 0;
        counterAttack = 1;
        health = 10;
        battleSong.trigger('pause');
        $("#battle-container").removeClass('visible').addClass('hidden');
        hideGameStart();
        addCharacterstoHeroBank();
        console.log(characterBank);
    }
}


    // function selectRandomOpponent(){
    // //Are all characters defeated?
    //   if(undefeatedCount > 0){

        
    //     //If not pick a character
    //     var randomIndex = Math.floor(Math.random()*characterBank.length);
    //     var opponent = characterBank[randomIndex];

    //     //If character is qualified
    //     if(!opponent.isDefeatedByPlayer && !opponent.isSelectedByPlayer){
    //         //Choose Character
    //         indexOfCurrentOpponent = randomIndex;
    //         loadOpponent(opponent);
    //     //If character is not qualified, try again
    //     }else{
    //         selectRandomOpponent();
    //     }
    //   }else{
    //     //All Characters are defeated, show win message
    //   } 
    // }

    function loadOpponent(opponent){
        $("#opponent-health").text("Hit Points: "+opponent.health);
        $("#opponent-picture").attr('src',opponent.imagePath);
        $("#opponent-name").text(opponent.name);
    }

    function loadPlayer(player){
        $("#player-health").text("Hit Points: " +player.health);
        $("#player-picture").attr('src',player.imagePath);
        $("#player-name").text(player.name);
    }

    

$(document).ready(function(){
    addCharacterstoHeroBank();

});

    function addCharacterstoHeroBank(){
        iterateThroughCharacterRow($("#character-row-one"));
        iterateThroughCharacterRow($("#character-row-two"));
        iterateThroughCharacterRow($("#character-row-three"));
        console.log(characterBank);

    }

        function iterateThroughCharacterRow(characterRowElement){
            
            characterRowElement.children().each(function( index ) {
                var imagePath = $(this).children('img').attr('src');
                var name = $(this).children('div').children('h5').text();
                var elementId = getElementIdFromSelectionCard(this);
                var attack = 0;
                characterBank.push(new Character(name,health,imagePath,false,false,elementId,attack,counterAttack));
                counterAttack++;
              }
        
              );
        }

            function getElementIdFromSelectionCard(card){
                return $(card).children('div').children('h5').attr('id');
            }


var audio = $("#saber");
$(".player-selection-card").hover(function(){
    console.log(audio);
   audio.trigger('play');
});


