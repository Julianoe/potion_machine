rpg_data = {};



function loadData() {
    $.getJSON("frondlock.json", function(json_response) {
        rpg_data = json_response.data;
        setModeFrondlockPotion()
    });
}

////////////////////////////////////////////////////
////////////////////////////////////////////////////
// mes fonctions d'appel au JSON
function getCaracteristique() {
  var index = Math.floor(Math.random()*rpg_data.caracteristiques.length)
  var caracteristique = rpg_data.caracteristiques[index];
  return caracteristique;
}
function getPuissance(){
  var niveau = rpg_data.niveaux
  var raretee = rpg_data.niveauxPoids

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
  var valeursimple = Math.floor(Math.random() * (25 - 1 + 1)) + 1; // (max-min +1))+min
  return valeursimple;
}

// génère un valeur aléatoire comprise entre le maximum et le minimum entrés en paramètres
function getValeur(max, min){
  var valeur = Math.floor(Math.random() * (max - min + 1)) + min;
  return valeur;
}
// générer une valeur de temps et une durée
function getTemps(){
  var index = Math.floor(Math.random()*rpg_data.durees.length)
  var duree = rpg_data.durees[index];
  //génération d'un chiffre aléaoitre entre 1 et 10
  var temps = Math.floor(Math.random() * (10 - 1 + 1)) + 1;
  /*gestion du singulier pluriel !*/
  if (temps > 1){
    var duree = duree + "s";
  }
  return temps + " " + duree;
}
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////


function generateName(){
  var puissance = getPuissance;
  var carac = getCaracteristique();
  var effet = getEffets();
  return puissance;
  // echo(puissance);
}
//envoi du nom de la potion dans le fichier html
// function renderTitlePotion() {
//   var titre = generateName() ;
//   $("#nom_potion").html(titre);
//   ga('send', 'event', 'PotionMachine', 'click', 'FrondlockPotion()');

// }

// mon générateur de potion
function generateFrondlockPotion() {
    var couleur = getCouleur();
    var carac = getCaracteristique();
    var valeursimple = getValeurSimple();
    var temps = getTemps();
    // var effets = getEffets();
    var puissance = getPuissance();

    // if (puissance == 'mythique' & carac == 'force'){
    //   var name = "Une Potion de " + carac + " de géant<br><br>";
    // }
    // else{
    //   var name = "Potion classique<br><br>";
    // }


    // tester les checkbox
      // quel est le
      var bonuschecked = document.getElementById("check_bonus").checked;
      var maluschecked = document.getElementById("check_malus").checked;
      if (maluschecked && bonuschecked){
        var effets = getEffets();
      }
      else if ( maluschecked && bonuschecked==false ){
        effets = "malus";
      }
      else if ( bonuschecked && maluschecked==false ){
        effets = "bonus";
      }
      else if ( bonuschecked == false && maluschecked == false ) {
        var effets = getEffets();
      }




      if(effets == "bonus" ){
        var operande = "+";
      }
      else if (effets == "malus"){
        var operande = "-";
      }

      if(puissance=="mythique"){
          var valeur = getValeur(25, 18);
      }
      else if (puissance=="puissante") {
        var valeur = getValeur(17, 14);
      }
      else if (puissance=="majeure") {
        var valeur = getValeur(13, 9);
      }
      else if (puissance=="intermediaire") {
        var valeur = getValeur(8, 6);
      }
      else if (puissance=="standard") {
        var valeur = getValeur(6, 4);
      }
      else if (puissance=="faible") {
        var valeur = getValeur(4, 2);
      }
      else if (puissance=="minime") {
        var valeur = getValeur(2, 1);
      }


    var potion = "Une potion de <strong>" + effets + "</strong> de <br><strong>" + carac + "</strong><br/> <strong>" + puissance + "</strong><br> de couleur <strong>" + couleur + "</strong>. ";
    var effet = "<br><br><strong>Effet :</strong> " + operande   + valeur + " de " + carac ;
    var resultat = name + potion + effet + " pendant " + temps + ".";

    // generateName();

    return resultat;
}





// envoi de la potion Frondlock dans le fichier html
function renderFrondlockPotion() {
    var potion = generateFrondlockPotion()
    $("#generated_potion").html(potion);
    ga('send', 'event', 'PotionMachine', 'click', 'FrondlockPotion()');
}
// calcul du nombre de possibilités pour les potions basiques
function getNumberOfFrondlockPotions() {
    combinations = rpg_data.couleurs.length * rpg_data.caracteristiques.length * rpg_data.niveaux.length
    return combinations;
}
function setModeFrondlockPotion() {
    var combinations = getNumberOfFrondlockPotions()
    renderFrondlockPotion()
    // renderTitlePotion();
    $("#potion_mode").text("Frondlock Potion Mode");
    $("#switch_mode_button").text("Switch to Basic Mode");
    $("#potion_combinations").text(numeral(combinations).format('0,0'));
    $( "#potion_button" ).click(function() {
        renderFrondlockPotion();
        // renderTitlePotion();
    });
    $( "#switch_mode_button" ).click(function() {
        setModeBasicPotion();
    });
}






$( document ).ready(function() {
    loadData();
});
