/*****************************************************************
 GEO_TRANS
 Calcul Helmert 7 paramètres
 Version 1.0
******************************************************************/

//------------------------------------------------------------
// Lecture d'un fichier texte
//------------------------------------------------------------

function lireFichier(event){

const fichier = event.target.files[0];

if(!fichier) return;

const reader = new FileReader();

reader.onload=function(e){

const lignes=e.target.result.trim().split(/\r?\n/);

let source=[];
let cible=[];

for(let i=0;i<lignes.length;i++){

let c=lignes[i].trim().split(/[\s,;]+/);

if(c.length<6) continue;

source.push([
parseFloat(c[0]),
parseFloat(c[1]),
parseFloat(c[2])
]);

cible.push([
parseFloat(c[3]),
parseFloat(c[4]),
parseFloat(c[5])
]);

}

calculHelmert(source,cible);

};

reader.readAsText(fichier);

}
//------------------------------------------------------------

function centroide(tab){

let x=0;
let y=0;
let z=0;

for(let p of tab){

x+=p[0];
y+=p[1];
z+=p[2];

}

return[
x/tab.length,
y/tab.length,
z/tab.length
];

}
//------------------------------------------------------------

function calculTranslation(Cs,Ct){

return{

Tx:Ct[0]-Cs[0],
Ty:Ct[1]-Cs[1],
Tz:Ct[2]-Cs[2]

};

}
//------------------------------------------------------------

function calculHelmert(source,cible){

let Cs=centroide(source);
let Ct=centroide(cible);

let T=calculTranslation(Cs,Ct);

document.getElementById("tx").innerHTML=T.Tx.toFixed(4);

document.getElementById("ty").innerHTML=T.Ty.toFixed(4);

document.getElementById("tz").innerHTML=T.Tz.toFixed(4);

console.log(T);

}
