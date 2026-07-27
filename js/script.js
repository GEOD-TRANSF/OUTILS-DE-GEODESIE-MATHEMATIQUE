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
                    X: parseFloat(valeurs[1]),
                    Y: parseFloat(valeurs[2]),
                    Z: parseFloat(valeurs[3])

                });

            }

        });


        if(type === "calage"){

            pointsCalage = points;
            console.log("Points de calage :", pointsCalage);

        }


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
