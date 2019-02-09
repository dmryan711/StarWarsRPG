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
var indexOfCurrentOpponent;
var health = 100;


//CLICK EVENT
$("#click-to-play").click(function(){
    hideGameStart();
});

//ATTACK CLICK
$("#attack-button").click(function(){
    $("#attack-message").text(characterBank[indexOfCurrentPlayer].attackPower);
    console.log(characterBank[indexOfCurrentPlayer].attackPower);
    $("#attack-message").effect("puff", { }, 1000,function(){
        $("#attack-message").text("");
        //counter attack
        attack(indexOfCurrentOpponent);
    } );
    
    attack(indexOfCurrentPlayer);
});

function attack(playerOrOpponentIndex){

    if(playerOrOpponentIndex === indexOfCurrentPlayer){
        characterBank[indexOfCurrentOpponent].health -= characterBank[indexOfCurrentPlayer].attackPower;
        console.log("Player Attack");
        loadOpponent(characterBank[indexOfCurrentOpponent]);
        $("#opponent").effect("shake");
    }else if(playerOrOpponentIndex === indexOfCurrentOpponent){
        characterBank[indexOfCurrentPlayer].health -= characterBank[indexOfCurrentOpponent].counterAttackPower;
        console.log("Opponent Attack");
        //Update Player UI here
        loadPlayer(characterBank[indexOfCurrentPlayer]);
        $("#player").effect("shake");
    }else{
        console.log("ERROR IN ATTACK")
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
    //playSelectionAudio();
    setBattleContainer($(this));
    var themeSong = $("#starWarsThemeSong");
    themeSong.trigger('pause');
    var battleSong = $("#starWarsBattleSong");
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
            characterBank[i].attackPower = 1;
            loadPlayer(characterBank[i]);
            //break;
        }
    }
    //FIND RANDOM OPPONENT
    selectRandomOpponent();
}


    function selectRandomOpponent(){
    //Are all characters defeated?
      if(undefeatedCount > 0){

        
        //If not pick a character
        var randomIndex = Math.floor(Math.random()*characterBank.length);
        var opponent = characterBank[randomIndex];

        //If character is qualified
        if(!opponent.isDefeatedByPlayer && !opponent.isSelectedByPlayer){
            //Choose Character
            indexOfCurrentOpponent = randomIndex;
            loadOpponent(opponent);
        //If character is not qualified, try again
        }else{
            selectRandomOpponent();
        }
      }else{
        //All Characters are defeated, show win message
      } 
    }

    function loadOpponent(opponent){
        $("#opponent-health").text(opponent.health);
        $("#opponent-picture").attr('src',opponent.imagePath);
        $("#opponent-name").text(opponent.name);
    }

    function loadPlayer(player){
        $("#player-health").text(player.health);
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
            var counterAttack = 1;
            characterRowElement.children().each(function( index ) {
                var imagePath = $(this).children('img').attr('src');
                var name = $(this).children('div').children('h5').text();
                var elementId = getElementIdFromSelectionCard(this);
                var health = 100;
                var attack = 0;
                counterAttack++;
                characterBank.push(new Character(name,health,imagePath,false,false,elementId,attack,counterAttack));
                
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


