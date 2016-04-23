rpg_data = {};



function loadData() {
    $.getJSON("frondlock.json", function(json_response) {
        rpg_data = json_response.data;
        setModeFrondlockPotion()
    });
}


// mes fonctions d'appel au JSON
function getCaracteristique() {
  var index = Math.floor(Math.random()*rpg_data.caracteristiques.length)
  var caracteristique = rpg_data.caracteristiques[index];
  return caracteristique;
}
function getNiveau(){
  var index = Math.floor(Math.random()*rpg_data.niveaux.length)
  var niveau = rpg_data.niveaux[index];
  return niveau;
}


function getPuissance(){
  var niveau = ["mythique","puissante","majeure","intermediaire","standard","faible","minime"]
  var raretee = [5, 10, 15, 20, 20, 15, 15]

  var totalraretee=eval(raretee.join("+")) //get total weight
  var puissance=new Array() //new array to hold "weighted" niveaux
  var currentpuissance=0

  while (currentpuissance<niveau.length){ //step through each niveau[] element
      for (i=0; i<raretee[currentpuissance]; i++)
          puissance[puissance.length]=niveau[currentpuissance]
      currentpuissance++
  }
  var randomnumber=Math.floor(Math.random()*totalraretee)

  return puissance[randomnumber];
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
// génère un chiffre aléatoirement entre 25 et 1
function getValeurSimple(){
  var valeursimple = Math.floor(Math.random() * (25 - 1 + 1)) + 1;
  return valeursimple;
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
    var carac = getCaracteristique();
    // var valeur = getValeur();
    var valeursimple = getValeurSimple();
    var temps = getTemps();
    var effets = getEffets();
    var puissance = getPuissance();

    var potion = "Une potion de " + carac + " <strong>" + puissance + "</strong> de couleur " + couleur + ". ";
    var effet = "<br><br><br><br><strong>Effet :</strong> " + effets + " de " + valeursimple + " de " + carac ;
    var resultat = potion + effet + " pendant " + temps + ".";
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
    combinations = rpg_data.couleurs.length * rpg_data.caracteristiques.length * rpg_data.niveaux.length
    return combinations;
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
