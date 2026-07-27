// =======================================================
// GEO_TRANS
// Module : Transformation de Helmert à 7 paramètres
// Lecture des fichiers de points
// =======================================================


let pointsCalage = [];
let pointsTransformation = [];


// Lecture d'un fichier texte
function lireFichier(file, type) {

    let lecteur = new FileReader();

    lecteur.onload = function(e){

        let contenu = e.target.result;

        let lignes = contenu.trim().split("\n");

        let points = [];

        lignes.forEach(ligne => {

            let valeurs = ligne.trim().split(/\s+/);

            if(valeurs.length >= 4){

points.push({

    id: valeurs[0],

    // Système source
    X: parseFloat(valeurs[1]),
    Y: parseFloat(valeurs[2]),
    Z: parseFloat(valeurs[3]),

    // Système cible
    Xc: parseFloat(valeurs[4]),
    Yc: parseFloat(valeurs[5]),
    Zc: parseFloat(valeurs[6])

});
            }

        });


        if(type === "calage"){

            pointsCalage = points;
            console.log("Points de calage :", pointsCalage);

        }
alert(
"Chargement réussi : "
+ pointsCalage.length
+ " points communs"
);

        if(type === "transformation"){

            pointsTransformation = points;
            console.log("Points à transformer :", pointsTransformation);

        }


    };


    lecteur.readAsText(file);

}


// Connexion avec les boutons fichiers

document.getElementById("pts_calage")
.addEventListener("change", function(){

    lireFichier(this.files[0],"calage");

});


document.getElementById("pts_transfo")
.addEventListener("change", function(){

    lireFichier(this.files[0],"transformation");

});
// =======================================================
// Calcul Transformation Helmert 7 paramètres
// Méthode : Moindres carrés
// =======================================================


document.getElementById("calculerHelmert")
.addEventListener("click", function(){

    if(pointsCalage.length < 3){

        alert("Il faut au minimum 3 points communs !");
        return;

    }


    let A = [];
    let L = [];


    pointsCalage.forEach(p => {


        /*
        Modèle linéaire :

        X2 = Tx + X1 + (-rz)Y1 + ry Z1 + m X1

        Y2 = Ty + rz X1 + Y1 + (-rx)Z1 + m Y1

        Z2 = Tz + (-ry)X1 + rx Y1 + Z1 + m Z1

        */


        let X = p.X;
        let Y = p.Y;
        let Z = p.Z;


        let Xc = p.Xc;
        let Yc = p.Yc;
        let Zc = p.Zc;



        A.push([
            1,0,0,
            0,Z,-Y,
            X
        ]);

        L.push(Xc-X);



        A.push([
            0,1,0,
            -Z,0,X,
            Y
        ]);

        L.push(Yc-Y);



        A.push([
            0,0,1,
            Y,-X,0,
            Z
        ]);

        L.push(Zc-Z);



    });



    let N = math.multiply(
        math.transpose(A),
        A
    );


    let B = math.multiply(
        math.transpose(A),
        L
    );


    let X = math.lusolve(N,B);



    afficherParametres(X);


});



// Affichage des paramètres

function afficherParametres(P){


document.getElementById("Tx").innerHTML =
P[0][0].toFixed(4);


document.getElementById("Ty").innerHTML =
P[1][0].toFixed(4);


document.getElementById("Tz").innerHTML =
P[2][0].toFixed(4);


document.getElementById("Rx").innerHTML =
(P[3][0]*206264.806)
.toFixed(5);


document.getElementById("Ry").innerHTML =
(P[4][0]*206264.806)
.toFixed(5);


document.getElementById("Rz").innerHTML =
(P[5][0]*206264.806)
.toFixed(5);


document.getElementById("Scale").innerHTML =
(P[6][0]*1000000)
.toFixed(4);

console.log("Paramètres Helmert :");

console.log("Tx =",P[0][0]);
console.log("Ty =",P[1][0]);
console.log("Tz =",P[2][0]);

console.log("Rx =",P[3][0]*206264.806);
console.log("Ry =",P[4][0]*206264.806);
console.log("Rz =",P[5][0]*206264.806);

console.log("Echelle ppm =",P[6][0]*1000000);

}
