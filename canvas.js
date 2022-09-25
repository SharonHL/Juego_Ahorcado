function dibujarCanvas() {
    tablero.lineWidth = 8;
    tablero.lineCap = "round";
    tablero.lineJoin = "round";
    tablero.fillStyle = "#e5e5e5";
    tablero.strokeStyle = "#0A3871";
    tablero.fillRect(0, 0, 1200, 700);
    tablero.beginPath();
    tablero.moveTo(120, 380);
    tablero.lineTo(480, 380);
    tablero.stroke();
    tablero.closePath();
}
function dibujarLineaLetra() {
    tablero.lineWidth = 6;
    tablero.lineCap = "round";
    tablero.lineJoin = "round";
    tablero.fillStyle = "#F3F5F6";
    tablero.strokeStyle = "#0A3871";
    tablero.beginPath();
    let anchura = 600 / palabraSecreta.length;
    let mitad = anchura / 2;
    for (let i = 0; i < palabraSecreta.length; i++) {
        tablero.moveTo((anchura * i) + mitad - 25, 500)
        tablero.lineTo((anchura * i) + mitad + 25, 500)
    }
    tablero.stroke();
    tablero.closePath();
}
function escribirLetraCorrecta(index) {
    tablero.font = 'bold 52px Inter';
    tablero.lineWidth = 6;
    tablero.lineCap = "round";
    tablero.lineJoin = "round";
    tablero.fillStyle = "#0A3871";
    tablero.strokeStyle = "#0A3871";
    let anchura = 600 / palabraSecreta.length
    let mitad = anchura / 2;
    tablero.fillText(palabraSecreta[index], (anchura * index) + mitad - 25, 490)
    tablero.stroke()
}
function dibujarAhorcado(index) {
    switch (index) {
        case 1: {
            dibujarLinea(200, 380, 200, 50);
            break;
        }
        case 2: {
            dibujarLinea(200, 50, 350, 50);
            dibujarLinea(350, 50, 350, 90);
            break;
        }
        case 3: {
            dibujarCirculo(350, 130, 40);            
            break;
        }
        case 4: {
            dibujarLinea(350, 170, 310, 230);
            break;
        }
        case 5: {
            dibujarLinea(350, 170, 390, 230);
            break;
        }
        case 6: {
            dibujarLinea(350, 170, 350, 250);
            break;
        }
        case 7: {
            dibujarLinea(350, 250, 310, 310);
            break;
        }
        case 8: {
            dibujarLinea(350, 250, 390, 310);
            break;
        }
    }
}
function dibujarLinea(startX, startY, endX, endY) {
    tablero.lineWidth = 8;
    tablero.lineCap = "round";
    tablero.lineJoin = "round";
    tablero.fillStyle = "#e5e5e5";
    tablero.strokeStyle = "#0A3871";
    tablero.beginPath();
    tablero.moveTo(startX, startY);
    tablero.lineTo(endX, endY);
    tablero.stroke();
    tablero.closePath();
}
function dibujarCirculo(x, y,radius) {
    tablero.lineWidth = 8;
    tablero.lineCap = "round";
    tablero.lineJoin = "round";
    tablero.fillStyle = "#e5e5e5";
    tablero.strokeStyle = "#0A3871";
    tablero.beginPath();
    tablero.arc(x, y, radius, 0, Math.PI*2, false);
    tablero.stroke();
    tablero.closePath();
}
