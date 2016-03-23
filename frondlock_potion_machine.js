rpg_data = {};



function loadData() {
    $.getJSON("frondlock.json", function(json_response) {
        rpg_data = json_response.data;
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
function getDuree(){
  var index = Math.floor(Math.random()*rpg_data.durees.length)
  var duree = rpg_data.durees[index];
  return duree;
}
function getValeur(){
  var valeur = Math.floor(Math.random() * (25 - 5 + 1)) + 5;
  return valeur;
}

// mon générateur de potion
function generateFrondlockPotion() {
    var couleur = getCouleur();
    var niveau = getNiveau();
    var carac = getCaracteristic();
    var duree = getDuree();
    var valeur = getValeur();
    var potion = "Une potion de " + carac + " " + niveau + " de couleur " + couleur + ". ";
    var effet = "<p><strong>Effet :</strong> Bonus de " + valeur + " de " + carac + ".</p>" ;
    var resultat = potion + effet ;
    return resultat;
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


$( document ).ready(function() {
    loadData();
});
