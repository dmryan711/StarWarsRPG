


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
    
});

//CONTAINER TOGGLE
function toggleSelectionOrBattleContainer(element){
    var $battleContainer = $("#battle-container");
    var $playerSelectionContainer = $("#player-selection-container");

    if(element.attr("id") === "battle-container"){ // NEED TO UPDATE THIS TO BATTLE CLASS?
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

function toggler(){
    var $battleContainer = $("#battle-container");
    var $playerSelectionContainer = $("#player-selection-container");

    $battleContainer.toggle();
}

