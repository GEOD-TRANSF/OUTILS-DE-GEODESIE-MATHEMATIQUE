// ==========================================
// GEO_TRANS - Module Helmert 7 paramètres
// ==========================================

function helmert7(X,Y,Z,TX,TY,TZ,RX,RY,RZ,m){

    // Conversion secondes d'arc → radians
    let secToRad = Math.PI/(180*3600);

    let rx = RX * secToRad;
    let ry = RY * secToRad;
    let rz = RZ * secToRad;

    // facteur d'échelle
    let k = 1 + m*1e-6;

    // Matrice de rotation (petits angles)
    let X2 = TX + k*(X - rz*Y + ry*Z);
    let Y2 = TY + k*(rz*X + Y - rx*Z);
    let Z2 = TZ + k*(-ry*X + rx*Y + Z);

    return [X2,Y2,Z2];
}
// =============================================
// GEO_TRANS - Calcul Helmert 7 paramètres
// Méthode des moindres carrés
// =============================================

function calculHelmert(points){

let A = [];
let L = [];


points.forEach(p => {

let X = p.X1;
let Y = p.Y1;
let Z = p.Z1;

let dX = p.X2 - p.X1;
let dY = p.Y2 - p.Y1;
let dZ = p.Z2 - p.Z1;


// Equation X
A.push([
1,0,0,
0,Z,-Y,
X
]);

L.push(dX);


// Equation Y
A.push([
0,1,0,
-Z,0,X,
Y
]);

L.push(dY);


// Equation Z
A.push([
0,0,1,
Y,-X,0,
Z
]);

L.push(dZ);

});


// Calcul AT*A
let N = math.multiply(
math.transpose(A),
A
);


// Calcul AT*L
let C = math.multiply(
math.transpose(A),
L
);


// Résolution
let param = math.multiply(
math.inv(N),
C
);


// Conversion rotations radian → seconde d'arc

let sec = 180*3600/Math.PI;


return {

TX:param[0],
TY:param[1],
TZ:param[2],

RX:param[3]*sec,
RY:param[4]*sec,
RZ:param[5]*sec,

m:param[6]*1000000

};

}
