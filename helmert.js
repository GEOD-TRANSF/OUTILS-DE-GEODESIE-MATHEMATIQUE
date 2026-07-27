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
