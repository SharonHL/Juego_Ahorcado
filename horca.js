/***********VARIABLES GLOBALES************/
let palabras = ["ALURA", "ORACLE", "ONE", "JAVASCRIPT", "HTML", "CSS", "WEB", "DESARROLLO", "TECNOLOGIA", "LENGUAJE", "COMPUTADORA", "TABLET", "MOUSE", "AGENDA"];
/****************GENERALES****************/
function mostrarPanel(panel) {
    document.getElementById("principal").style = 'display:none';
    document.getElementById("agregar-palabra").style = 'display:none';
    document.getElementById("juego").style = 'display:none';
    switch (panel) {
        case 1: {
            document.getElementById("principal").removeAttribute('style');
            break;
        }
        case 2: {
            document.getElementById("agregar-palabra").removeAttribute('style');
            break;
        }
        case 3: {
            document.getElementById("juego").removeAttribute('style');
            break;
        }
        default: {
            document.getElementById("principal").removeAttribute('style');
            break;
        }
    }
}
/*************AGREGAR PALABRA*************/
var btn_agregar = document.getElementById("agregar");
var input_texto = document.getElementById("input-texto");
var btn_guardar = document.getElementById("guardar");
var btn_cancelar = document.getElementById("cancelar");

btn_agregar.onclick = function () {
    mostrarPanel(2);
    input_texto.focus();
}
input_texto.onkeydown = function (e) {
    var charCode = e.keyCode;
    if ((charCode > 64 && charCode < 91) || charCode == 8)
        return true;
    else
        return false;
}
btn_guardar.onclick = function () {
    let palabra = input_texto.value;
    var error=false;
    var mensaje='';
    if (palabra == "") {
        mensaje="Debe ingresar una palabra"
        error=true;
    }
    palabra = palabra.toUpperCase();
    if (palabras.indexOf(palabra) >= 0) {
        mensaje="La palabra ya existe"
        error=true;
    }
    if(error){
        swal({
            title: "Error",
            text:mensaje,
            icon: "error",
            closeOnClickOutside: false,
            buttons: {
                cancel: "OK",
                defeat: false,
            }
        }).then((value) => {
            switch (value) {
                default: {
                    input_texto.focus();
                }

            }
        });
        return;
    }
    palabras.push(palabra);
    input_texto.value = '';
    iniciarJuego();
}
btn_cancelar.onclick = function () {
    input_texto.value = '';
    mostrarPanel(1);
}
/******************JUEGO******************/
var btn_iniciar = document.getElementById("iniciar");
var btn_nuevojuego = document.getElementById("nuevojuego");
var btn_desistir = document.getElementById("desistir");
let tablero = document.getElementById("ahorcado").getContext("2d");
//Selectores
let palabraSecreta = "";
let letras_error = [];
let errores = 0;
let intentos = 8;
let letrasEncontradas = [];
let palabraEncontrada=[];
let isPlaying=false;

btn_iniciar.onclick = function () {
    iniciarJuego();
}
btn_nuevojuego.onclick = function () {
    iniciarJuego();
}
btn_desistir.onclick = function () {
    mostrarPanel(1);
    isPlaying=false;
}
function iniciarJuego() {
    limpiar();
    mostrarPanel(3);
    escogerPalabraSecreta();
    dibujarCanvas()
    dibujarLineaLetra()

    isPlaying=true;

    document.onkeyup = function (e) {
        if(!isPlaying){
            return;
        }

        let letra = e.key.toUpperCase();

        var charCode = e.keyCode;

        if (charCode < 64 || charCode > 91) {
            return;
        }

        if (palabraSecreta.includes(letra)) {
           
            if (letrasEncontradas.indexOf(letra) < 0) {
                letrasEncontradas.push(letra);
                for (let i = 0; i < palabraSecreta.length; i++) {
                    if (palabraSecreta[i] == letra) {
                        escribirLetraCorrecta(i);
                        palabraEncontrada[i]=letra;
                    }
                }
            }

        }
        else {

            if (letras_error.indexOf(letra) < 0) {
                errores++;
                letras_error.push(letra);
                escribirLetraIncorrecta(letra);
                dibujarAhorcado(errores);
            }
        }
        console.log(palabraEncontrada.join(''));
        if (palabraEncontrada.join('') == palabraSecreta) {
            isPlaying=false;
            swal({
                title: "FELICIDADES",
                text: "Encontraste la palabra oculta",
                icon: "success",
                closeOnClickOutside: false,
                buttons: {
                    nuevo: {
                        text: "Nuevo juego",
                        value: "nuevo",
                        className: "btn_confirm",
                    },
                    cancel: "Salir",
                    defeat: false,
                }
            }).then((value) => {
                switch (value) {
                    case "nuevo": {
                        iniciarJuego();
                        break;
                    }
                    default: {
                        mostrarPanel(1);
                    }

                }
            });
        }
        if (errores >= intentos) {
            isPlaying=false;
            swal({
                title: "GAME OVER",
                text: "Llegaste a los 8 intentos permitidos",
                icon: "error",
                closeOnClickOutside: false,
                buttons: {
                    nuevo: {
                        text: "Nuevo juego",
                        value: "nuevo",
                        className: "btn_confirm",
                    },
                    cancel: "Salir",
                    
                    defeat: false,
                }
            }).then((value) => {
                switch (value) {
                    case "nuevo": {
                        iniciarJuego();
                        break;
                    }
                    default: {
                        mostrarPanel(1);
                    }

                }
            });
        }
    }
}
function escogerPalabraSecreta() {
    let palabra = palabras[Math.floor(Math.random() * palabras.length)]
    palabraSecreta = palabra
}
function escribirLetraIncorrecta(letra) {
    var letras_error = document.getElementById("letras-error");
    letras_error.innerHTML += letra + ' '
}
function limpiar() {
    errores = 0;
    var letra_error = document.getElementById("letras-error");
    letra_error.innerHTML = '';
    palabraSecreta = '';
    letras_error = [];
    palabraEncontrada=[];
    letrasEncontradas=[];
}