// Etablissement des variables qui seront ré-utilisées
let containerAccueil = document.getElementById('containerAccueil');
let containerDifficulty = document.getElementById('containerDifficulty');
let containerGameGrid = document.getElementById('containerGameGrid');
let playerDifficulty = document.getElementById('playerDifficulty');
let computerDifficulty = document.getElementById('computerDifficulty');
let computerDifficultyBox = document.getElementById('computerDifficultyBox');
let inputPseudo = document.getElementById('inputPseudo');
let inputValider = document.getElementById('inputValider');
let playerMode1 = document.getElementById('playerMode1');
let playerMode2 = document.getElementById('playerMode2');
let playerGrid = document.getElementById('playerGrid');
let computerGrid = document.getElementById('computerGrid');
let player2Grid = document.getElementById('player2Grid');
let shipPlaceBox = document.getElementById('shipPlaceBox');
let shipPlaceBoxEasy = document.getElementById('shipPlaceBoxEasy');
let shipPlaceBoxNormal = document.getElementById('shipPlaceBoxNormal');
let shipPlaceBoxHard = document.getElementById('shipPlaceBoxHard');
let shipPlacement = document.getElementById('shipPlacement');
let containerShip = document.querySelectorAll('.containerShip');
let containerCorvette = document.querySelectorAll('.containerCorvette');
let containerFrégate = document.querySelectorAll('.containerFrégate');
let containerCargo = document.querySelectorAll('.containerCargo');
let containerCuirassé = document.querySelectorAll('.containerCuirassé');
let containerNavette = document.querySelectorAll('.containerNavette');
let containerCroiseur = document.querySelectorAll('.containerCroiseur');
let containerCommandement = document.querySelectorAll('.containerVaisseau_de_Commandement');
let inputValiderDifficulty = document.getElementById('inputValiderDifficulty');
let jupiter = document.getElementById('imgJupiters');
let mars = document.getElementById('imgMars');
let uranus = document.getElementById('imgUranus');
let mercure = document.getElementById('imgMercure');
let ponyJoke = document.getElementById('ponyJoke');
let themeColorGreen = document.getElementById('themeColorGreen');
let themeColorRed = document.getElementById('themeColorRed');
let themeColorPurple = document.getElementById('themeColorPurple');
let themeColorOrange = document.getElementById('themeColorOrange');
let themeColorBlue = document.getElementById('themeColorBlue');
let themeColorPink = document.getElementById('imgNeptune');
let turnInfo = document.getElementById('turnInfo');
let userInfo = document.getElementById('otherInfo');
let playInput = document.getElementById('playInput');


// Tableau qui contiendront l'état des grilles de chaque "joueur"
let playerSpots = [];
let computerSpots = [];
let player2Spots = [];
let playerShipsList = [];
let spotTakken = [];

// Variable pour définir la largeur d'une grille de jeu, pour faciliter la manipulation
let gridWidth = 10;

// Par défaut, aucun des deux modes de jeu ne sera sélectionné.
playerMode1.checked = false;
playerMode2.checked = false;

// La position initiale des vaisseaux sera horizontale.
let posHorizontal = true;
let gameOverStatus = false;
let currentTurn = "player";
let canPlay = true;

// Ecouteur du bouton de la page d'accueil, pour afficher les options, et récupération du pseudo
// pour plus tard, affichage d'une zone avec le pseudo/avatar du joueur 
inputValider.addEventListener('click', ()=> {
    containerAccueil.classList.add('hidden');
    containerDifficulty.classList.remove('hidden');
    let pseudo = inputPseudo.value;
    document.getElementById('welcome').innerHTML = "Bienvenue Capitaine "+pseudo+" !";
    document.getElementById('pseudoCapitaine').innerHTML = "Capitaine "+pseudo;
    document.getElementById('userCapitaine').classList.remove('hidden');
});

// Ecouteurs sur les deux options de jeu, et affichage de la difficulté de l'ordinateur si besoin
playerMode1.addEventListener('click', ()=> {
    computerDifficultyBox.classList.remove('hidden');   
});
playerMode2.addEventListener('click', ()=> {
    computerDifficultyBox.classList.add('hidden');    
});

// Validation du mode de jeu et des options, établissement et affichage des deux grilles de jeu
inputValiderDifficulty.addEventListener('click', ()=> {
    containerDifficulty.classList.add('hidden');
    containerGameGrid.classList.remove('hidden');

    // Mode un joueur, donc, avec ordinateur. Les fonctions appellant l'ordinateur et son IA
    // seront en grande partie ici.
    if (playerMode1.checked) {
        computerGrid.classList.remove('hidden');
        player2Grid.classList.add('hidden');
        shipPlacement.classList.remove('hidden');
        generateGrid (playerGrid, playerSpots, 0); 
        generateGrid (computerGrid, computerSpots, 200);
        shipBoxGrid();

        // Crée les vaisseaux du joueur. La difficulté peut être implantée ici.
        //spawnPlayerShips ();
       
        // Détermine quels vaisseaux de la liste des vaisseaux disponibles sont affichés
        // il est donc possible de moduler en fonction de la difficulté ici.
        randomComputerShip(shipTypes[0]);
        randomComputerShip(shipTypes[1]);
        randomComputerShip(shipTypes[2]);
        randomComputerShip(shipTypes[3]);
        randomComputerShip(shipTypes[4]);

    // Mode deux joueurs. A rendre "indisponible" si pas le temps, sinon, les fonctions
    // pour faire fonctionner ce mode seront ici!
    } else if (playerMode2.checked) {
        computerGrid.classList.add('hidden');
        player2Grid.classList.remove('hidden'); 
        shipPlacement.classList.remove('hidden');
        generateGrid (playerGrid, playerSpots, 0); 
        generateGrid (player2Grid, player2Spots, 200);  
        shipBoxGrid(); 
    }
});

// Fonction qui va générer les grilles de jeu et implanter 10 lignes de 10 cases, et attribuer
// un id unique à chacune des cases pour les utiliser plus tard
function generateGrid (grid, array, index) {
    for (i=index; i<index+(gridWidth*gridWidth);i++) {
        let spot = document.createElement('div');
        spot.dataset.id = i;
        spot.classList.add('gridBox');
        if (document.body.style.color == "rgb(0, 255, 0)") {
            spot.classList.add('gridGreen');
        } else if (document.body.style.color == "rgb(255, 0, 0)") {
            spot.classList.add('gridRed');
        } else if (document.body.style.color == "rgb(186, 85, 211)") {
            spot.classList.add('gridPurple');
        } else if (document.body.style.color == "rgb(0, 0, 205)") {
            spot.classList.add('gridBlue');
        } else if (document.body.style.color == "rgb(255, 140, 0)") {
            spot.classList.add('gridOrange');
        } else if (document.body.style.color == "rgb(253, 108, 158)") {
            spot.classList.add('gridPink');
        }
        grid.appendChild(spot);
        array.push(spot);
    }
}

// Fonction pour afficher la boite qui contient les vaisseaux du joueur à placer
function shipBoxGrid () {
    
    if (playerDifficulty.value == "Facile") {
        shipPlaceBoxEasy.classList.remove('hidden'); 
    }   else if (playerDifficulty.value == "Normal") {
        shipPlaceBoxNormal.classList.remove('hidden'); 
    } else if (playerDifficulty.value == "Difficile") {
        shipPlaceBoxHard.classList.remove('hidden'); 
    }
}

// Définition des différent type de vaisseaux, noms/classes et leur longueurs (deux types de placements)
let shipTypes = [
    {
        name: 'Corvette',
        directions: [
            [0, 1],
            [0, gridWidth]
        ]
    },
    {
        name: 'Frégate',
        directions: [
            [0, 1, 2],
            [0, gridWidth, gridWidth*2]
        ]
    },
    {
        name: 'Navette',
        directions: [
            [0, 1, 2],
            [0, gridWidth, gridWidth*2]
        ]
    },
    {
        name: 'Croiseur',
        directions: [
            [0, 1, 2, 3],
            [0, gridWidth, gridWidth*2, gridWidth*3]
        ]
    },
    {
        name: 'Vaisseau_de_Commandement',
        directions: [
        [0, 1, 2, 3, 4],
        [0, gridWidth, gridWidth*2, gridWidth*3, gridWidth*4]
    ]
    },
]

// Randomnisation des vaisseaux de l'ordinateur (éventuellement bouton pour le joueur?)
function randomComputerShip (ship) {

// Définition d'un sens de placement, vertical ou horizontal, aléatoirement 
let randomVerticalOrHorizontal = Math.floor(Math.random()*ship.directions.length);
let actualDirection = ship.directions[randomVerticalOrHorizontal];
   
if (randomVerticalOrHorizontal === 0) {
    direction = 1;
} else if (randomVerticalOrHorizontal === 1) {
    direction = 10;
}

// Détermine une case de "départ" pour le positionnement du vaisseau.
let placementStart = Math.abs(Math.floor(Math.random()*computerSpots.length-(ship.directions[0].length*direction)));

// Vérification que la case n'est pas déjà occupée par un autre vaisseau et est bien vide
let alreadyTakken = actualDirection.some(index => computerSpots[placementStart + index].classList.contains('spotTaken'));

// Vérification que l'on ne se trouve pas sur les bords de l'écran, pour ne pas que les vaisseaux
// "débordent" lors de leur placement.
let rightBorder = actualDirection.some(index => (placementStart + index) % gridWidth === gridWidth - 1);
let leftBorder = actualDirection.some(index => (placementStart + index) % gridWidth === 0);

    // Si les conditions (case vide, et DANS la grille) sont respectées, alors, un vaisseau est placé
    // SINON, la fonction se relance jusqu'à que cela soit le cas et que tous les vaiseaux le soient
    if (!alreadyTakken && !rightBorder && !leftBorder) {
        actualDirection.forEach(index => computerSpots[placementStart + index].classList.add('spotTaken','spotHidden', ship.name));
    } else {
        randomComputerShip(ship);
    }
}

// Fonction pour faire pivoter les vaisseaux à placer par le joueur.
function rotation () {
    if (posHorizontal == true) {
        containerCorvette.forEach(ship => ship.classList.toggle('containerCorvetteVertical'));
        containerFrégate.forEach(ship => ship.classList.toggle('containerFrégateVertical'));
        containerNavette.forEach(ship => ship.classList.toggle('containerNavetteVertical'));
        containerCargo.forEach(ship => ship.classList.toggle('containerCargoVertical'));
        containerCuirassé.forEach(ship => ship.classList.toggle('containerCuirasséVertical'));
        containerCroiseur.forEach(ship => ship.classList.toggle('containerCroiseurVertical'));
        containerCommandement.forEach(ship => ship.classList.toggle('containerVaisseau_de_CommandementVertical'));
        posHorizontal = false;
    } else {
        containerCorvette.forEach(ship => ship.classList.toggle('containerCorvetteVertical'));
        containerFrégate.forEach(ship => ship.classList.toggle('containerFrégateVertical'));
        containerNavette.forEach(ship => ship.classList.toggle('containerNavetteVertical'));
        containerCargo.forEach(ship => ship.classList.toggle('containerCargoVertical'));
        containerCuirassé.forEach(ship => ship.classList.toggle('containerCuirasséVertical'));
        containerCroiseur.forEach(ship => ship.classList.toggle('containerCroiseurVertical'));
        containerCommandement.forEach(ship => ship.classList.toggle('containerVaisseau_de_CommandementVertical'));
        posHorizontal = true;

    }
}

// Ecouteur sur le bouton pour pivoter les vaiseaux
shipPlacement.addEventListener('click', ()=> {
    rotation();
})

// Ecouteur sur la liste des vaisseaux du joueur à placer.
containerShip.forEach(ship => ship.addEventListener('dragstart', dragStart));


let actualShipAndIndex;
let dragShip;
let dragShipLength;

containerShip.forEach(ship => ship.addEventListener('mousedown', (e) => {
    // Index (emplacement) du vaisseau cliqué et drag'
    actualShipAndIndex = e.target.id;

    // Ecouteurs du Drag and drop qui nécessitent d'écouter l'array contenant les cases du joueur.
    playerSpots.forEach(spot => spot.addEventListener('dragstart', dragStart));
    playerSpots.forEach(spot => spot.addEventListener('dragover', dragOver));
    playerSpots.forEach(spot => spot.addEventListener('dragenter', dragEnter));
    playerSpots.forEach(spot => spot.addEventListener('drop', dragDrop));

}));

function dragStart () {
    // Sélection de l'élément contenant les "morceaux" du vaisseau que l'on veux bouger.
    dragShip = this;
    // On récupère la taille du vaisseau ici.
    dragShipLength = this.children.length;
}

function dragOver (e) {
    
    e.preventDefault();
}

function dragEnter (e) {
    e.preventDefault();
}


function dragDrop () {
    // On cherche à récupérer le nom et l'id du DERNIER element du vaisseau ici.
    let shipNameAndId = dragShip.lastElementChild.id;
    // Coupe l'id pour récupérer le "nom" (classe) du vaisseau uniquement pour plus tard
    let shipClass = shipNameAndId.slice(0,-2);

    // Récupère le dernier index du vaisseau et converti le résultat en chiffre a utiliser
    let shipLastIndex = parseInt(shipNameAndId.substr(-1));
    
    // Calcule le dernier index du vaisseau pour son placement futur
    let lastShipId;
    if (posHorizontal) {
        lastShipId = shipLastIndex + parseInt(this.dataset.id);
    } else {
        lastShipId = parseInt(this.dataset.id)+(dragShipLength-1)*gridWidth;
    }

    // Cases où le placement du bateau n'est pas possible.
    const notPossibleHorizontal = [0,10,20,30,40,50,60,70,80,90,1,11,21,31,41,51,61,71,81,91,2,12,22,32,42,52,62,72,82,92,3,13,23,33,43,53,63,73,83,93];
    const notPossibleVertical = [100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139];
    // [99,98,97,96,95,94,93,92,91,90,89,88,87,86,85,84,83,82,81,80,79,78,77,76,75,74,73,72,71,70,69,68,67,66,65,64,63,62,61,60];
  
    // Vérifie combien de case dépasserais le vaisseau sur las cases non authorisées.
    let newNotPossibleHorizontal = notPossibleHorizontal.splice(0, shipLastIndex*10);
    let newNotPossibleVertical = notPossibleVertical.splice(0, shipLastIndex*10);

    // Case actuellement drag'n'dropped
    let actualShipIndex = parseInt(actualShipAndIndex.substr(-1));

    // Index de la grille sur lequel le dernier morceau (index) du vaisseau tombera, en fonction de la position choisie
    if (posHorizontal) {
        lastShipId = lastShipId - actualShipIndex;
    } else {
        lastShipId = lastShipId - actualShipIndex*gridWidth;
    }

    // Vérification des cases déjà occupées dans l'emplacement choisi par la fonction
    if (posHorizontal && !newNotPossibleHorizontal.includes(lastShipId)) {
        for (i=0;i<dragShipLength;i++) {
            
            if (playerSpots[parseInt(this.dataset.id) -actualShipIndex +i].classList.contains('spotTaken')) {
                return;
            }
        
        }
    } else if (!posHorizontal && !newNotPossibleVertical.includes(lastShipId)) {
        for (i=0;i<dragShipLength;i++) {
           
            if (playerSpots[parseInt(this.dataset.id) -actualShipIndex*10 +i*10].classList.contains('spotTaken')) {
                return;
            } 
            
        }
    } else return; // afficher un message d'erreur de placement dans la console.


    // affichage du vaisseau drag'n'droped
    if (posHorizontal) {
 
        // Boucle pour chaque morceau du vaisseau jusqu'à sa taille complète
        for (i=0;i<dragShipLength;i++) {
            // Attribue la classe récupérée plus tôt aux divs du vaisseau, et celle de l'emplacement
            // déjà pris. Change aussi l'index de départ en fonction de là où l'on drag le vaisseau  
            playerSpots[parseInt(this.dataset.id) -actualShipIndex +i].classList.add(shipClass, 'spotTaken');
        }
    } else {
        for (i=0;i<dragShipLength;i++) {
            // Vertical, on utilise donc la width de la grille ici.
            playerSpots[parseInt(this.dataset.id) -actualShipIndex*10 +i*10].classList.add(shipClass, 'spotTaken');
        }
    }

    // Effacement du vaisseau de la boite des "a placer"
    if (playerDifficulty.value == "Facile") {
        shipPlaceBoxEasy.removeChild(dragShip); 
    } else if (playerDifficulty.value == "Normal") {
        shipPlaceBoxNormal.removeChild(dragShip);
    } else if (playerDifficulty.value == "Difficile") {
        shipPlaceBoxHard.removeChild(dragShip);
    }  

    
    // cache la boite de placement une fois tous les vaisseaux placés, et fait apparaitre le bouton pour jouer.
     if (shipPlaceBoxNormal.childElementCount == 0) {
        shipPlaceBoxNormal.classList.add('hidden'); 
        shipPlacement.classList.add('hidden');
        playInput.classList.remove('hidden'); 
    }
}

function game() {

    if (gameOverStatus || !canPlay) {
        return
    }
    
    if (currentTurn == 'player') {
        turnInfo.innerHTML = "A vous de jouer Capitaine "+inputPseudo.value+"!";
        console.log(computerSpots);
        
        
        
    } else if (currentTurn == 'computer') {
        turnInfo.innerHTML = "Au tour de votre adversaire!";
        canPlay = false;
        window.setTimeout(computerTurn, 1000);
        
    }
}

let corvetteCounter = 0;
let frégateCounter = 0;
let navetteCounter = 0;
let croiseurCounter = 0;
let commandementCounter = 0;

function showSpot (spot) {
    if (gameOverStatus || !canPlay) {
        return;
    }
    if (!spot.classList.contains('spotHit')) {
        if (spot.classList.contains('Corvette')) {
         corvetteCounter++;
        } if (spot.classList.contains('Frégate')) {
            frégateCounter++;
        } if (spot.classList.contains('Navette')) {
            navetteCounter++;
        } if (spot.classList.contains('Croiseur')) {
            croiseurCounter++;
        } if (spot.classList.contains('Vaisseau_de_Commandement')) {
            commandementCounter++;
        } 
    }
    if (spot.classList.contains('spotTaken')) {
        spot.classList.add('spotHit');
    } else {
        spot.classList.add('spotMiss');
    }
    currentTurn = 'computer';
    winConditions ();
    
    game();
}


let corvetteComputerCounter = 0;
let frégateComputerCounter = 0;
let navetteComputerCounter = 0;
let cuirasséComputerCounter = 0;
let cargoComputerCounter = 0;
let croiseurComputerCounter = 0;
let commandementComputerCounter = 0;

function computerTurn () {

    let computerRandomHit = Math.floor(Math.random() * playerSpots.length);

    if (!playerSpots[computerRandomHit].classList.contains('spotHit')) {

        playerSpots[computerRandomHit].classList.add('spotHit');

        if (playerSpots[computerRandomHit].classList.contains('Corvette')) {
            corvetteComputerCounter++;
        } if (playerSpots[computerRandomHit].classList.contains('Frégate')) {
           frégateComputerCounter++;
        } if (playerSpots[computerRandomHit].classList.contains('Navette')) {
           navetteComputerCounter++;
        } if (playerSpots[computerRandomHit].classList.contains('Cuirassé')) {
            cuirasséComputerCounter++;
        } if (playerSpots[computerRandomHit].classList.contains('Cargo')) {
            cargoComputerCounter++;
        } if (playerSpots[computerRandomHit].classList.contains('Croiseur')) {
           croiseurComputerCounter++;
        } if (playerSpots[computerRandomHit].classList.contains('Vaisseau_de_Commandement')) {
           commandementComputerCounter++;
        } 
        winConditions ();
    } else {
        computerTurn();
    }

    currentTurn = 'player';
    turnInfo.innerHTML = "A vous de jouer Capitaine "+inputPseudo.value+"!";
    canPlay = true;
}

function winConditions () {
    if (corvetteCounter == 2) {
       userInfo.innerHTML = "Vous avez détruit la Corvette de votre adversaire!"; 
       corvetteCounter = 10;
    } if (frégateCounter == 3) {
        userInfo.innerHTML = "Vous avez détruit la Frégate de votre adversaire!"; 
        frégateCounter = 10;
    } if (navetteCounter == 3) {
        userInfo.innerHTML = "Vous avez détruit la Navette de votre adversaire!"; 
        navetteCounter = 10;
    } if (croiseurCounter == 4) {
        userInfo.innerHTML = "Vous avez détruit le Croiseur de votre adversaire!"; 
        croiseurCounter = 10;
    } if (commandementCounter == 5) {
        userInfo.innerHTML = "Vous avez détruit le Vaisseau de Commandement de votre adversaire!";
        commandementCounter = 10;
   
    

    } if (corvetteComputerCounter == 2) {
        userInfo.innerHTML = "Votre Corvette a été détruite!"; 
        corvetteComputerCounter = 10;
     } if (frégateComputerCounter == 3) {
         userInfo.innerHTML = "Votre Frégate a été détruite!"; 
         frégateComputerCounter = 10;
     } if (navetteComputerCounter == 3) {
         userInfo.innerHTML = "Votre Navette a été détruite!"; 
         navetteComputerCounter = 10;
     } if (croiseurComputerCounter == 4) {
         userInfo.innerHTML = "Votre Croiseur a été détruit!";
         croiseurComputerCounter = 10; 
     } if (commandementComputerCounter == 5) {
         userInfo.innerHTML = "Votre Vaisseau de Commandement a été détruit!";
         commandementComputerCounter = 10; 
    

    } if (corvetteCounter+frégateCounter+navetteCounter+croiseurCounter+commandementCounter == 50) {
        userInfo.innerHTML = "Vous avez gagné!";
        gameOver();
    } if (corvetteComputerCounter+frégateComputerCounter+navetteComputerCounter+croiseurComputerCounter+commandementComputerCounter == 50) {
        userInfo.innerHTML = "Votre adversaire a gagné!";
        gameOver();
    }    
}

function gameOver () {
    gameOverStatus = true;
}

playInput.addEventListener('click', ()=>{
    game();

    computerSpots.forEach(spot => spot.addEventListener('click', ()=> {
        showSpot(spot);
    }))    
})

// Ecouteurs sur les boutons de thèmes à couleur
themeColorGreen.addEventListener('click', ()=> {
    changecolor ('Green');
    document.body.style.color = "#00ff00";   
})

themeColorRed.addEventListener('click', ()=> {
    changecolor ('Red');
    document.body.style.color = "#ff0000";  
})
themeColorPurple.addEventListener('click', ()=> {
    changecolor ('Purple');
    document.body.style.color = "#ba55d3"; 
})
themeColorOrange.addEventListener('click', ()=> {
    changecolor ('Orange');
    document.body.style.color = "#ff8c00";  
})
themeColorBlue.addEventListener('click', ()=> {
    changecolor ('Blue');
    document.body.style.color = "#0000CD";  
})

themeColorPink.addEventListener('click', ()=> {
    changecolor ('Pink');
    document.body.style.color = "#fd6c9e";  
})

function changecolor (color) {
    inputValider.classList.remove('colorPink', 'colorRed', 'colorPurple', 'colorOrange', 'colorBlue', 'colorGreen');
    inputValider.classList.add('color'+color);
    inputValiderDifficulty.classList.remove('colorPink', 'colorRed', 'colorPurple', 'colorOrange', 'colorBlue', 'colorGreen');
    inputValiderDifficulty.classList.add('color'+color);
    shipPlacement.classList.remove('colorPink', 'colorRed', 'colorPurple', 'colorOrange', 'colorBlue', 'colorGreen');
    shipPlacement.classList.add('color'+color);
    inputPseudo.classList.remove('borderPink', 'borderRed', 'borderPurple', 'borderOrange', 'borderBlue', 'borderGreen');
    inputPseudo.classList.add('border'+color);    
}

// Easters Eggs.... Et... PONEYS!!!
jupiter.addEventListener('click', ()=> {
    ponyJoke.classList.remove('hidden');
    window.setTimeout(() => {
        ponyJoke.classList.add('hidden');
      }, 50);
})

mars.addEventListener('click', ()=> {
    let ponySound = new Audio('Sounds/pony.mp3');
    ponySound.play();
})

mercure.addEventListener('click', ()=> {
    imgMercure.classList.add('hidden');
    window.setTimeout(() => {
        imgMercure.classList.remove('hidden');
      }, 5000);
    let poofSound = new Audio('Sounds/poof.mp3');
    poofSound.play();
})

uranus.addEventListener('click', ()=> {
    if (uranus.classList.contains('uranusPos1')) {
        uranus.classList.remove('uranusPos1');
        uranus.classList.add('uranusPos2');    
    } else if (uranus.classList.contains('uranusPos2')) {
        uranus.classList.remove('uranusPos2');
        uranus.classList.add('uranusPos3');  
    } else {
        uranus.classList.remove('uranusPos3');
        uranus.classList.add('uranusPos1');   
    }
})
