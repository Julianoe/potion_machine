rpg_data = {};



function loadData() {
    //https://rpg.rigden.us/seeds_of_infinity/resources/json/all.json
    //all.json
    $.getJSON("frondlock.json", function(json_response) {
        rpg_data = json_response.data;
        // setModeDeluxePotion()
        // setModeBasicPotion()
        setModeFrondlockPotion()
    });
}


// mes fonctions d'appel au JSON
function getCaracteristic() {
  var index = Math.floor(Math.random()*rpg_data.caracteristics.length)
  var caracteristic = rpg_data.caracteristics[index];
  return caracteristic;
}
function getNiveau(){
  var index = Math.floor(Math.random()*rpg_data.niveaux.length)
  var niveau = rpg_data.niveaux[index];
  return niveau;
}
function getCouleur(){
  var index = Math.floor(Math.random()*rpg_data.couleurs.length)
  var couleur = rpg_data.couleurs[index];
  return couleur;
}
// mon générateur de potion
function generateFrondlockPotion() {
    var couleur = getCouleur();
    var niveau = getNiveau();
    var carac = getCaracteristic();
    var article = "A ";
    var potion = "Une potion de " + carac + " " + niveau + " de couleur " + couleur + ". ";
    return potion;
}
// envoi de la potion Frondlock dans le fichier html
function renderFrondlockPotion() {
    var potion = generateFrondlockPotion();
    $("#generated_potion").html(potion);
    ga('send', 'event', 'PotionMachine', 'click', 'FrondlockPotion()');
}
// calcul des possibilités pour les potions basiques
function getNumberOfFrondlockPotions() {
    combinations = rpg_data.couleurs.length * rpg_data.caracteristics.length * rpg_data.niveaux.length
    return combinations
}
function setModeFrondlockPotion() {
    var combinations = getNumberOfFrondlockPotions()
    renderFrondlockPotion()
    $("#potion_mode").text("Frondlock Potion Mode");
    $("#switch_mode_button").text("Switch to Basic Mode");
    $("#potion_combinations").text(numeral(combinations).format('0,0'));
    $( "#potion_button" ).click(function() {
        renderFrondlockPotion();
    });
    $( "#switch_mode_button" ).click(function() {
        setModeBasicPotion();
    });


}

//==============================================================================================
//==============================================================================================
//==============================================================================================
// fonctions faisant appel aux données du fichier JSON
// function getAlignment() {
//     var index = Math.floor(Math.random()*rpg_data.alignments.length)
//     var alignment = rpg_data.alignments[index];
//     return alignment;
// }
//
// function getCreature() {
//     var index = Math.floor(Math.random()*rpg_data.creatures.length)
//     var creature = rpg_data.creatures[index];
//     return creature;
// }
//
// function getColor() {
//     var index = Math.floor(Math.random()*rpg_data.colors.length)
//     var color = rpg_data.colors[index];
//     return color;
// }
//
// function getLiquidType() {
//     var index = Math.floor(Math.random()*rpg_data.liquid_types.length)
//     var liquid_type = rpg_data.liquid_types[index];
//     return liquid_type;
// }
//
// function getPersonality() {
//     var index = Math.floor(Math.random()*rpg_data.personalities.length)
//     var personality = rpg_data.personalities[index];
//     return personality;
// }
//
// function getSmell() {
//     var index = Math.floor(Math.random()*rpg_data.smells.length)
//     var smell = rpg_data.smells[index];
//     return smell;
// }
//
// function getTrait() {
//     var index = Math.floor(Math.random()*rpg_data.traits.length)
//     var trait = rpg_data.traits[index];
//     return trait;
// }
// // ----- fin des appels aux fichiers JSON
//
//
// // générateur de potion basique
// function generateBasicPotion() {
//     var color = getColor();
//     var smell = getSmell();
//     var liquid_type = getLiquidType();
//     var article = "A ";
//     var first_letter = liquid_type[0].toLowerCase()
//     if (first_letter == 'a' || first_letter == 'e' || first_letter == 'i' || first_letter == 'o' || first_letter == 'u' || first_letter == 'y') {
//         article = "An ";
//     }
//     var potion = article + liquid_type + " " + color + " potion that smells " +  smell + ". ";
//     return potion;
// }
// // générateur de potion Deluxe
// function generateDeluxPotion() {
//     var alignment = getAlignment();
//     var creature = getCreature();
//     var personality = getPersonality()
//     var trait = getTrait();
//     var basic = generateBasicPotion();
//     var deluxe = basic + "<br><br><strong>Effect:</strong> You become a " + trait + " " + alignment + " " + creature + " with a " + personality + " personality."
//     return deluxe;
// }
// // calcul des possibilités pour les potions basiques
// function getNumberOfBasicPotions() {
//     combinations = rpg_data.colors.length * rpg_data.liquid_types.length * rpg_data.smells.length
//     return combinations
// }
// // calcul des possibilités pour les potions Deluxe
// function getNumberOfDeluxePotions() {
//     combinations = getNumberOfBasicPotions() * rpg_data.traits.length * rpg_data.alignments.length * rpg_data.creatures.length * rpg_data.personalities.length
//     return combinations
// }
//
// // envoi de la potion Deluxe dans le fichier html
// function renderDeluxePotion() {
//     var potion = generateDeluxPotion();
//     $("#generated_potion").html(potion);
//     ga('send', 'event', 'PotionMachine', 'click', 'DeluxePotion()');
// }
// // envoi de la potion Basique dans le fichier html
// function renderBasicPotion() {
//     var potion = generateBasicPotion();
//     $("#generated_potion").html(potion);
//     ga('send', 'event', 'PotionMachine', 'click', 'BasicPotion()');
//
// }
//
// function setModeBasicPotion() {
//     var combinations = getNumberOfBasicPotions()
//     renderBasicPotion()
//     $("#potion_mode").text("Basic Potion Mode");
//     $("#switch_mode_button").text("Switch to Deluxe Mode");
//     $("#potion_combinations").text(numeral(combinations).format('0,0'));
//     $( "#potion_button" ).click(function() {
//         renderBasicPotion();
//     });
//     $( "#switch_mode_button" ).click(function() {
//         setModeDeluxePotion();
//     });
// }
//
// function setModeDeluxePotion() {
//     var combinations = getNumberOfDeluxePotions()
//     renderDeluxePotion()
//     $("#potion_mode").text("Deluxe Potion Mode");
//     $("#switch_mode_button").text("Switch to Basic Mode");
//     $("#potion_combinations").text(numeral(combinations).format('0,0'));
//     $( "#potion_button" ).click(function() {
//         renderDeluxePotion();
//     });
//     $( "#switch_mode_button" ).click(function() {
//         setModeBasicPotion();
//     });
//
//
// }


$( document ).ready(function() {
    loadData();
});
