

//Character Object Constructor
function Character(cName, cHealth, cImagePath, cSelectedByPlayer,cElementId){
    this.name = cName;
    this.health = cHealth;
    this.imagePath = cImagePath;
    this.isSelectedByPlayer = cSelectedByPlayer;
    this.elementId = cElementId;

  }

var characterBank = [];

var health = 100;
var player = {
    name:"errorPlayerName",
    health: "errorPlayerHealth",
    imagePath: "errorPlayerPath"

};

var opponent = {
    name:"errorOpponentName",
    health: "errorOpponentHealth",
    imagePath: "errorOpponentPath"

};

//CLICK EVENT
$("#battle-container").click(function (){ //NEED TO CHANGE THIS LATER TO QUIT BUTTON
    console.log("Click battle container");
    
    toggleSelectionOrBattleContainer($(this));
    
});



//CLICK EVENT
$(".player-selection-card").click(function (){
    console.log("Click player selection");
    console.log(this);
    toggleSelectionOrBattleContainer($(this));
    //playSelectionAudio();
    setBattleContainer($(this));
    
});

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



// function playSelectionAudio(){
//     var audio = $("#saber") //PERSONALIZED AUDIO CLIPS HERE
//     audio.trigger('play');
// }

// BATTLE CONTAINER
function setBattleContainer(selectedByPlayer){
    var selectedElementId = getElementIdFromSelectionCard(selectedByPlayer);

    //Mark the selection as selected in the character bank
    for(var i=0;i<characterBank.length;i++){

        if(selectedElementId === characterBank[i].elementId){
            characterBank[i].isSelectedByPlayer = true;
            console.log("Updated Character bank with selection for: "+ i);
            console.log(characterBank);
        }
    }

    //
    setPlayerAndOpponentObjects();
    $("#player-health").text(player.health);
    $("#player-picture").attr('src',player.imagePath);
}

    //HELPER FUNCTIONS
    function setPlayerAndOpponentObjects(){
        setCharacter(player,"Luke","400","assets/images/darthMaul.jpeg");

    }

    function selectRandomOpponent(){

    }
        function setCharacter(characterObject,characterName,characterHealth,characterImagePath){
            characterObject.name = characterName;
            characterObject.health = characterHealth;
            characterObject.imagePath = characterImagePath;
        }

    

$(document).ready(function(){
    console.log("Theme Song");
    // var themeSong = $("#starWarsThemeSong");
    // themeSong.trigger('play');
    addCharacterstoHeroBank();
    

    // var themeSong = document.createElement('audio');
    // themeSong.setAttribute('src', 'assets/audio/star-wars-theme-song.mp3');
    
    // themeSong.addEventListener('ended', function() {
    //     this.play();
    // }, false);
    
    // themeSong.addEventListener("canplay",function(){
    //     this.play();
    //     // $("#length").text("Duration:" + audioElement.duration + " seconds");
    //     // $("#source").text("Source:" + audioElement.src);
    //     $("#audio-status").text("Status: Ready to play");
    // });
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
                characterBank.push(new Character(name,health,imagePath,false,elementId));
              }
        
              );
        }

            function getElementIdFromSelectionCard(card){
                return $(card).children('div').children('h5').attr('id');
            }


// TRYING TO ITERATE THROUGH EACH ELEMENT AND ADD TO OBJECT BANK

// var audio = $("#saber");
// $(".player-selection-card").hover(function(){
//     console.log(audio);
//    audio.trigger('play');
// });


