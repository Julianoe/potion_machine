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


function getPuissance(){
  var niveauxarray = ["mythique","puissante","majeure","intermediaire","standard","faible","minime"]
  var poidsarray = [5, 10, 15, 20, 20, 15, 15]

  var totalpoids=eval(poidsarray.join("+")) //get total weight (in this case, 100)
  var niveaupoids=new Array() //new array to hold "weighted" niveaux
  var currentpuissance=0

  while (currentpuissance<niveauxarray.length){ //step through each fruit[] element
      for (i=0; i<poidsarray[currentpuissance]; i++)
          niveaupoids[niveaupoids.length]=niveauxarray[currentpuissance]
      currentpuissance++
  }
  var randomnumber=Math.floor(Math.random()*totalpoids)

  return niveaupoids[randomnumber];
}



function getCouleur(){
  var index = Math.floor(Math.random()*rpg_data.couleurs.length)
  var couleur = rpg_data.couleurs[index];
  return couleur;
}
function getEffets(){
  var index = Math.floor(Math.random()*rpg_data.effets.length)
  var effets = rpg_data.effets[index];
  return effets;
}
function getValeur(){
  var valeur = Math.floor(Math.random() * (25 - 1 + 1)) + 1;
  return valeur;
}
function getTemps(){
  var index = Math.floor(Math.random()*rpg_data.durees.length)
  var duree = rpg_data.durees[index];
  var temps = Math.floor(Math.random() * (10 - 1 + 1)) + 1;
  /*gestion du singulier pluriel !*/
  if (temps > 1){
    var duree = duree + "s";
  }
  return temps + " " + duree;
}




// mon générateur de potion
function generateFrondlockPotion() {
    var couleur = getCouleur();
    var niveau = getNiveau();
    var carac = getCaracteristic();
    var valeur = getValeur();
    var temps = getTemps();
    var effets = getEffets();
    var puissance = getPuissance();

    var potion = "Une potion de " + carac + " " + niveau + " de couleur " + couleur + ". ";
    var effet = "<p><strong>Effet :</strong> " + effets + " de " + valeur + " de " + carac ;
    var test = "<p>Puissance de l'effet non random : " + puissance + "</p>";
    var resultat = potion + effet + " pendant " + temps + "." + test ;
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
