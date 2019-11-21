// VARIABLES
let tablaInfo = document.querySelector('.tabla-standings');

// Variables para controlar el dropdown menu.
let mqDropdown = window.matchMedia('(max-width: 1023px)');
let menu = document.querySelector('.menu li:nth-child(2)');

// Flechas para el player history de la interfaz de standings.
let desplazar = 0;
let contador = 0;

// Botones de XBOX y PS4 para la interfaz de rankings.
let btnRanking = document.querySelector('.btn-ranking');

// Slide para la interfaz de rankings
let slide = document.querySelector('.slide');
let tabla = document.querySelectorAll('.tabla-rank');

// Main de rounds.
let cards = document.querySelectorAll('.border-card .card');

// Contenedor de brackets.
let contenedorBrackets = document.querySelector('.main.brackets .cards-container .round-matchs');
let menuMobile = document.querySelector('.round-title-mobile');
let contadorToques = 0;
let inicioX;

// EVENTS LISTENERS

cargarEventListeners();

function cargarEventListeners(){
    
    if(tablaInfo) {
        tablaInfo.addEventListener('click', mostrarPartidos);
        tablaInfo.addEventListener('click', mostrarPartidosFila);
        tablaInfo.addEventListener('click', mostrarPartidosTd);
        tablaInfo.addEventListener('click', mostrarPartidosTdChild);
        tablaInfo.addEventListener('click', siguiente);
        tablaInfo.addEventListener('click', anterior);
        window.addEventListener('load', acortarNombresTabla);
        window.addEventListener('resize', cerrarHistorial);
    }
    
    if(contenedorBrackets){
        contenedorBrackets.addEventListener('touchstart', iniciarToque);
        contenedorBrackets.addEventListener('touchmove', movimientoToque);
        contenedorBrackets.addEventListener('touchend', finalizarToque);
    }

    if(menuMobile) {
        menuMobile.addEventListener('touchstart', desplazamientoMenu);
        window.addEventListener('resize', tamanioBarra);
    }

    if(cards) {
        window.addEventListener('load', acortarNombresCards);
    }

    if(mqDropdown.matches){
        menu.addEventListener('click', dropdownMenu);
    }

    if (btnRanking) {
        btnRanking.addEventListener('click', tablaRank);
    }

    if (slide) {
        slide.addEventListener('click', desplazarFilas);
    }

    if(tabla) {
        window.addEventListener('resize', restaurarTabla);
        window.addEventListener('load', acortarNombresRank);
    }
}




/* FUNCIONES. */

/* MOBILE TOUCH EN INTERFAZ DE BRACKETS */


/* MENU */

/* Función para adaptar el tamaño de la barra si hay un cambio en el tamaño o rotación de pantalla. */
function tamanioBarra() {
    let botones = document.querySelectorAll('.round-title-mobile > a');
    let barra = document.querySelector('.round-title-mobile span.barra');

    botones.forEach( boton => {
        if(boton.classList.contains('active')){
            let pixeles = boton.offsetLeft;
            let ancho = boton.offsetWidth;

            barra.style.left = pixeles + 'px';
            barra.style.width = ancho + 'px';
        }
    });

}


/* Función que permite desplazarse por las diferentes rondas de brackets usando el menú. */
function desplazamientoMenu(e){
    e.preventDefault();
    let botones = document.querySelectorAll('.round-title-mobile > a');
    let barra = document.querySelector('.round-title-mobile span.barra');
    
    if(e.target.classList.contains('round-16')) {
        let pixeles = e.target.offsetLeft;
        let ancho = e.target.offsetWidth;
        contadorToques = 0;

        botones.forEach( boton => {
            boton.classList.remove('active');
        })

        contenedorBrackets.style.left = 0;
        barra.style.left = pixeles + 'px';
        barra.style.width = ancho + 'px';
        e.target.classList.add('active');
    } else if(e.target.classList.contains('q-final') ) {
        let pixeles = e.target.offsetLeft;
        let ancho = e.target.offsetWidth;
        let pantalla = window.screen.width;
        let margen = (317 * 2) - pantalla;
        contadorToques = 1;

        if(margen < 0) {
            margen = ((margen) * -1);
        }

        contenedorBrackets.style.left = '-' + (margen) + 'px';
        barra.style.left = pixeles + 'px';
        barra.style.width = ancho + 'px';
        botones.forEach( boton => {
            boton.classList.remove('active');
        })
        e.target.classList.add('active');
    } else if(e.target.classList.contains('s-final')) {
        let pixeles = e.target.offsetLeft;
        let ancho = e.target.offsetWidth;
        let pantalla = window.screen.width;
        let margen = (317 * 2) - pantalla;
        contadorToques = 2;

        if(margen < 0) {
            margen = ((margen) * -1);
        }

        contenedorBrackets.style.left = '-' + (margen + 317) + 'px';
        barra.style.left = pixeles + 'px';
        barra.style.width = ancho + 'px';
        botones.forEach( boton => {
            boton.classList.remove('active');
        })
        e.target.classList.add('active');
    } else if(e.target.classList.contains('final')) {
        let pixeles = e.target.offsetLeft;
        let ancho = e.target.offsetWidth;
        let pantalla = window.screen.width;
        let margen = (317 * 2) - pantalla;
        contadorToques = 3;

        if(margen < 0) {
            margen = ((margen) * -1);
        }

        contenedorBrackets.style.left = '-' + (margen + 634) + 'px';
        barra.style.left = pixeles + 'px';
        barra.style.width = ancho + 'px';
        botones.forEach( boton => {
            boton.classList.remove('active');
        })
        e.target.classList.add('active');
    }

}


   
/* TÁCTIL */

function iniciarToque(e) {
    inicioX = e.touches[0].clientX;
}

function movimientoToque(e) {

    toque = e.touches[0];
    deslizamiento = inicioX - toque.clientX;

    if(deslizamiento < -50) {
        return;
    }

}

function finalizarToque(e) {
    let deslizamiento = inicioX - e.changedTouches[0].clientX;
    let pantalla = window.screen.width;
    let botones = document.querySelectorAll('.round-title-mobile > a');
    let barra = document.querySelector('.round-title-mobile span.barra');

    if( window.screen.width > 1023){
        return;
    }

    if(deslizamiento < -50) {
            if(contadorToques === 3){
                let ancho = botones[2].offsetWidth;
                let pixeles = botones[2].offsetLeft;
                let pantalla = window.screen.width;
                let margen = (317 * 2) - pantalla;
    
                if(margen < 0) {
                    margen = ((margen) * -1);
                }
                
                contenedorBrackets.style.left = '-' + (margen + 317) + 'px';
    
                
    
                botones.forEach( boton => {
                    boton.classList.remove('active');
                })
    
                botones[2].classList.add('active');
                barra.style.left = pixeles + 'px';
                barra.style.width = ancho + 'px';
    
                contadorToques = 2;
            } else if(contadorToques === 2){
                let ancho = botones[1].offsetWidth;
                let pixeles = botones[1].offsetLeft;
                let pantalla = window.screen.width;
                let margen = (317 * 2) - pantalla;
    
                if(margen < 0) {
                    margen = ((margen) * -1);
                }
    
                contenedorBrackets.style.left = '-' + (margen) + 'px';
    
                botones.forEach( boton => {
                    boton.classList.remove('active');
                })
                
                botones[1].classList.add('active');
                barra.style.left = pixeles + 'px';
                barra.style.width = ancho + 'px';
    
                contadorToques = 1;
            } else if(contadorToques === 1){
                let ancho = botones[0].offsetWidth;
                let pixeles = botones[0].offsetLeft;
    
                contenedorBrackets.style.left = 0;
    
                botones.forEach( boton => {
                    boton.classList.remove('active');
                })
    
                botones[0].classList.add('active');
                barra.style.left = pixeles + 'px';
                barra.style.width = ancho + 'px';
                contadorToques = 0;
            } else if(contadorToques === 0){
                return;
            }
    
    } else if(deslizamiento > 50){
            if(contadorToques === 0){
                let ancho = botones[1].offsetWidth;
                let pixeles = botones[1].offsetLeft;
                let pantalla = window.screen.width;
                let margen = (317 * 2) - pantalla;
    
                if(margen < 0) {
                    margen = ((margen) * -1);
                }
    
                contenedorBrackets.style.left = '-' + (margen) + 'px';
    
                botones.forEach( boton => {
                    boton.classList.remove('active');
                })
                
                botones[1].classList.add('active');
                barra.style.left = pixeles + 'px';
                barra.style.width = ancho + 'px';
    
                contadorToques = 1;
            } else if(contadorToques === 1){
                let ancho = botones[2].offsetWidth;
                let pixeles = botones[2].offsetLeft;
                let pantalla = window.screen.width;
                let margen = (317 * 2) - pantalla;
    
                if(margen < 0) {
                    margen = ((margen) * -1);
                }
                
                contenedorBrackets.style.left = '-' + (margen + 317) + 'px';
    
                
    
                botones.forEach( boton => {
                    boton.classList.remove('active');
                })
    
                botones[2].classList.add('active');
                barra.style.left = pixeles + 'px';
                barra.style.width = ancho + 'px';
    
                contadorToques = 2;
            } else if(contadorToques === 2){
                let ancho = botones[3].offsetWidth;
                let pixeles = botones[3].offsetLeft;
                let pantalla = window.screen.width;
                let margen = (317 * 2) - pantalla;
    
                if(margen < 0) {
                    margen = ((margen) * -1);
                }
                
                contenedorBrackets.style.left = '-' + (margen + 634) + 'px';
    
                botones.forEach( boton => {
                    boton.classList.remove('active');
                })
    
                botones[3].classList.add('active');
                barra.style.left = pixeles + 'px';
                barra.style.width = ancho + 'px';
    
                contadorToques = 3;
            } else if(contadorToques === 3){
                return;
            }
    
    
    }

}

// Función que cierra un historial al abrir otro.

if(tablaInfo) {
    function cerrarHistorial(){
        let filas = document.querySelectorAll('.tabla-standings tbody .player-info');
        filas.forEach( fila => {
            desplazar = 0;
            fila.classList.remove('mostrar');
            fila.classList.add('ocultar');
            fila.lastElementChild.previousElementSibling.lastElementChild.classList.remove('open');
            fila.lastElementChild.previousElementSibling.lastElementChild.lastElementChild.classList.remove('mostrando'); 
            fila.lastElementChild.previousElementSibling.lastElementChild.lastElementChild.classList.add('oculto');
            fila.lastElementChild.scrollLeft = '0';
            fila.lastElementChild.classList.remove('mostrar')
            fila.lastElementChild.lastElementChild.classList.remove('active');
            fila.lastElementChild.lastElementChild.previousElementSibling.classList.remove('active');
        });
    }
}

// Función que muestra el historial del player.
function mostrarPartidos(e) {

	if(e.target.classList.contains('oculto')){
        cerrarHistorial();
        desplazar = 0;
        let btnInfo = e.target.parentElement;
        let playerInfo = e.target.parentElement.parentElement.parentElement;
        let playerHistory = e.target.parentElement.parentElement.parentElement.childNodes[17];
        let siguiente = e.target.parentElement.parentElement.parentElement.childNodes[17].childNodes[15];

        btnInfo.classList.add('open');
        e.target.classList.add('mostrando');
        playerInfo.classList.add('mostrar');
        playerInfo.classList.remove('ocultar');
        e.target.classList.remove('oculto');
        setTimeout(function(){
            playerHistory.classList.add('mostrar');
            siguiente.classList.add('active');
        }, 300);
    } else if (e.target.classList.contains('mostrando')){
        let btnInfo = e.target.parentElement;
        let playerInfo = e.target.parentElement.parentElement.parentElement;
        let playerHistory = e.target.parentElement.parentElement.parentElement.childNodes[17];
        let siguiente = e.target.parentElement.parentElement.parentElement.childNodes[17].childNodes[15];
        
        e.target.classList.add('oculto');
        btnInfo.classList.remove('open');
        e.target.classList.remove('mostrar');
        playerHistory.classList.remove('mostrar');
        setTimeout(function(){
            siguiente.classList.remove('active');
            playerInfo.classList.remove('mostrar');
            playerInfo.classList.add('ocultar');
        }, 300);
    }
}


// Funciones que permiten abrir la fila al clickear en cualquier lugar de la misma o en una celda de la fila.

function mostrarPartidosFila(e) {

    if(e.target.classList.contains('ocultar')){
        cerrarHistorial();

        e.target.lastElementChild.previousElementSibling.lastElementChild.classList.add('open');
        e.target.lastElementChild.previousElementSibling.lastElementChild.lastElementChild.classList.remove('oculto');
        e.target.lastElementChild.previousElementSibling.lastElementChild.lastElementChild.classList.add('mostrando'); 
        e.target.lastElementChild.lastElementChild.classList.remove('active');
        setTimeout(function(){
            e.target.lastElementChild.classList.add('mostrar');
            e.target.lastElementChild.lastElementChild.previousElementSibling.classList.add('active');
        }, 300);
        e.target.classList.remove('ocultar');
        e.target.classList.add('mostrar');
    } else if (e.target.classList.contains('mostrar')) {
        
        e.target.lastElementChild.previousElementSibling.lastElementChild.classList.remove('open');
        e.target.lastElementChild.previousElementSibling.lastElementChild.lastElementChild.classList.remove('mostrando'); 
        e.target.lastElementChild.previousElementSibling.lastElementChild.lastElementChild.classList.remove('oculto');
        e.target.lastElementChild.classList.remove('mostrar');
        setTimeout(function(){
            e.target.lastElementChild.lastElementChild.classList.remove('active');
            e.target.lastElementChild.lastElementChild.previousElementSibling.classList.remove('active');
            e.target.classList.remove('mostrar');
            e.target.classList.add('ocultar');
        }, 300);
        
    }

}

function mostrarPartidosTd(e) {

    if(e.target.parentElement.classList.contains('ocultar')){
        cerrarHistorial();

        e.target.parentElement.lastElementChild.previousElementSibling.lastElementChild.classList.add('open');
        e.target.parentElement.lastElementChild.previousElementSibling.lastElementChild.lastElementChild.classList.remove('oculto');
        e.target.parentElement.lastElementChild.previousElementSibling.lastElementChild.lastElementChild.classList.add('mostrando'); 
        e.target.parentElement.lastElementChild.lastElementChild.classList.remove('active');
        setTimeout(function(){
            e.target.parentElement.lastElementChild.classList.add('mostrar');
            e.target.parentElement.lastElementChild.lastElementChild.previousElementSibling.classList.add('active');
        }, 300);
        e.target.parentElement.classList.remove('ocultar');
        e.target.parentElement.classList.add('mostrar');
    } else if (e.target.parentElement.classList.contains('mostrar')) {
        
        e.target.parentElement.lastElementChild.previousElementSibling.lastElementChild.classList.remove('open');
        e.target.parentElement.lastElementChild.previousElementSibling.lastElementChild.lastElementChild.classList.remove('mostrando'); 
        e.target.parentElement.lastElementChild.previousElementSibling.lastElementChild.lastElementChild.classList.remove('oculto');
        e.target.parentElement.lastElementChild.classList.remove('mostrar');
        setTimeout(function(){
            e.target.parentElement.lastElementChild.lastElementChild.classList.remove('active');
            e.target.parentElement.lastElementChild.lastElementChild.previousElementSibling.classList.remove('active');
            e.target.parentElement.classList.remove('mostrar');
            e.target.parentElement.classList.add('ocultar');
        }, 300);
        
    }

}

function mostrarPartidosTdChild(e) {

    if(e.target.parentElement.parentElement.classList.contains('ocultar')){
        cerrarHistorial();

        e.target.parentElement.parentElement.lastElementChild.previousElementSibling.lastElementChild.classList.add('open');
        e.target.parentElement.parentElement.lastElementChild.previousElementSibling.lastElementChild.lastElementChild.classList.remove('oculto');
        e.target.parentElement.parentElement.lastElementChild.previousElementSibling.lastElementChild.lastElementChild.classList.add('mostrando'); 
        e.target.parentElement.parentElement.lastElementChild.lastElementChild.classList.remove('active');
        setTimeout(function(){
            e.target.parentElement.parentElement.lastElementChild.classList.add('mostrar');
            e.target.parentElement.parentElement.lastElementChild.lastElementChild.previousElementSibling.classList.add('active');
        }, 300);
        e.target.parentElement.parentElement.classList.remove('ocultar');
        e.target.parentElement.parentElement.classList.add('mostrar');
    } else if (e.target.parentElement.parentElement.classList.contains('mostrar')) {
        
        e.target.parentElement.parentElement.lastElementChild.previousElementSibling.lastElementChild.classList.remove('open');
        e.target.parentElement.parentElement.lastElementChild.previousElementSibling.lastElementChild.lastElementChild.classList.remove('mostrando'); 
        e.target.parentElement.parentElement.lastElementChild.previousElementSibling.lastElementChild.lastElementChild.classList.remove('oculto');
        e.target.parentElement.parentElement.lastElementChild.classList.remove('mostrar');
        setTimeout(function(){
            e.target.parentElement.parentElement.lastElementChild.lastElementChild.classList.remove('active');
            e.target.parentElement.parentElement.lastElementChild.lastElementChild.previousElementSibling.classList.remove('active');
            e.target.parentElement.parentElement.classList.remove('mostrar');
            e.target.parentElement.parentElement.classList.add('ocultar');
        }, 300);
        
    }

}


// Función que permite mover las cards en el slider.
function siguiente(e) {
    let filas = document.querySelectorAll('.player-info');
    if(e.target.classList.contains('fa-chevron-right')){
        desplazar += 1; 
        let contenedorSlide = e.target.parentElement.parentElement;

        contenedorSlide.scrollLeft += 340;
        if(desplazar >= 1) {
            e.target.parentElement.nextSibling.nextSibling.classList.add('active');
        }

        if(window.matchMedia('(max-width: 1499px)').matches){
            if(desplazar >= 4) {
                e.target.parentElement.classList.remove('active');
            }
        } else {
            if(desplazar >= 3) {
                e.target.parentElement.classList.remove('active');
            }
        }
    }   
}

function anterior(e) {
    if(e.target.classList.contains('fa-chevron-left')){
        desplazar = desplazar - 1; 
        e.target.parentElement.previousSibling.previousSibling.classList.add('active');
        let contenedorSlide = e.target.parentElement.parentElement;

        contenedorSlide.scrollLeft = contenedorSlide.scrollLeft - 340;
        if(desplazar <= 0) {
            e.target.parentElement.classList.remove('active');
        }
    }   
}


// Función para el dropdown mobile.
function dropdownMenu(e) {

    if(e.target.classList.contains('dropdown-off')) {
        
        e.target.classList.add('dropdown-on');
        e.target.classList.remove('dropdown-off');
        
        
    } else if(e.target.classList.contains('dropdown-on')) {
        e.target.classList.add('dropdown-off');
        e.target.classList.remove('dropdown-on');
    } else if(e.target.parentElement.classList.contains('dropdown-off')) {
        
        e.target.parentElement.classList.add('dropdown-on');
        e.target.parentElement.classList.remove('dropdown-off');
        
    } else if(e.target.parentElement.classList.contains('dropdown-on')) {
        e.target.parentElement.classList.add('dropdown-off');
        e.target.parentElement.classList.remove('dropdown-on');
    } else if(e.target.parentElement.parentElement.classList.contains('dropdown-off')) {
        
        e.target.parentElement.parentElement.classList.add('dropdown-on');
        e.target.parentElement.parentElement.classList.remove('dropdown-off');
        
    } else if(e.target.parentElement.parentElement.classList.contains('dropdown-on')) {
        e.target.parentElement.parentElement.classList.add('dropdown-off');
        e.target.parentElement.parentElement.classList.remove('dropdown-on');
    }
}

// Función para el menu de ranking.
function tablaRank(e) {
    const tablaXbox = document.querySelector('.tabla-rank.xbox');
    const tablaPs4 = document.querySelector('.tabla-rank.ps4');
    const rankXbox = document.querySelector('.rank-consola.xbox');
    const rankPs4 = document.querySelector('.rank-consola.ps4');
    const filas = document.querySelectorAll('.player-info');

    if(e.target.classList.contains('btn-ps4') ) {        
        filas.forEach( (fila) => {
            fila.classList.remove('derecha');
            fila.classList.remove('izquierda');
            document.querySelector('.slide .izquierda').classList.remove('active');
            document.querySelector('.slide .derecha').classList.add('active');
        });

        e.target.classList.add('active');
        e.target.parentElement.lastChild.previousSibling.classList.remove('active');
        
        rankXbox.classList.remove('active');
        tablaXbox.classList.remove('active');
        rankXbox.classList.add('inactive');
        tablaXbox.classList.add('inactive');
        tablaPs4.classList.remove('inactive');
        tablaPs4.classList.add('active');
        rankPs4.classList.add('active');

    } else if(e.target.classList.contains('btn-xbox') ) {        
        filas.forEach( (fila) => {
            fila.classList.remove('derecha');
            fila.classList.remove('izquierda');
            document.querySelector('.slide .izquierda').classList.remove('active');
            document.querySelector('.slide .derecha').classList.add('active');
        });

        e.target.classList.add('active');
        e.target.parentElement.firstChild.nextSibling.classList.remove('active');
        
        rankPs4.classList.remove('active');
        tablaPs4.classList.remove('active');
        rankPs4.classList.add('inactive');
        tablaPs4.classList.add('inactive');
        tablaXbox.classList.remove('inactive');
        tablaXbox.classList.add('active');
        rankXbox.classList.add('active');
    }
}



// Función para las filas de la tabla
function desplazarFilas(e) {

    const filas = document.querySelectorAll('.player-info');

    if(e.target.classList.contains('izquierda')) {
        filas.forEach( (fila) => {
            fila.classList.remove('derecha');
            fila.classList.add('izquierda');
            e.target.parentElement.firstChild.nextSibling.classList.remove('active');
            e.target.classList.add('active');
        });
    } else if(e.target.classList.contains('derecha')) {
        filas.forEach( (fila) => {
            fila.classList.remove('izquierda');
            fila.classList.add('derecha');
            e.target.parentElement.lastChild.previousSibling.classList.remove('active');
            e.target.classList.add('active');
        });
    }
}



// Función para que la tabla vuelva sus valores a la normalidad al cambiar el tamaño de la pantalla.
function restaurarTabla() {
    let filas = document.querySelectorAll('.player-info');
    let pantalla = window.matchMedia('(min-width: 680px)');
    if(pantalla.matches) {
        filas.forEach( (fila) => {
            fila.classList.remove('derecha');
            fila.classList.remove('izquierda');
            document.querySelector('.slide .izquierda').classList.remove('active');
            document.querySelector('.slide .derecha').classList.add('active');
        });
    }
}

/* Funciones para recortar los nombres de los jugadores. */

// En la tabla de ranking.
function acortarNombresRank() {

    const nombres = document.querySelectorAll('.player-info td .player span'); 
    nombres.forEach( nombre => {
        if(nombre.childNodes[0].data.length >= 15) {
            nombre.childNodes[0].data = nombre.childNodes[0].data.substr(0, 12) + '...';
        }
    } );

}


// En la tabla de standings.
function acortarNombresTabla(){

    const nombres = document.querySelectorAll('.player-info td:first-child span.NimbusSanCon-Bol');
    nombres.forEach( nombre => {
        nombre.childNodes[0].data = nombre.childNodes[0].data.trim();
        if(nombre.childNodes[0].data.length >= 15) {
            nombre.childNodes[0].data = nombre.childNodes[0].data.substr(0, 12) + '...';
        }
    } );

}


// En las cards en general.
function acortarNombresCards() {
    
    const nombresCards = document.querySelectorAll('.border-card .card .nation-nick .nick p');
    const nombresTeam = document.querySelectorAll('.border-card .card .players-info-games .player .team');

    nombresCards.forEach( nombreCard => {
        nombreCard.childNodes[0].data = nombreCard.childNodes[0].data.trim();
        if(nombreCard.childNodes[0].data.length >= 15) {
            nombreCard.childNodes[0].data = nombreCard.childNodes[0].data.substr(0, 12) + '...';
            console.log("Acortados");
        }
    } );

    nombresTeam.forEach( nombreTeam => {
        nombreTeam.childNodes[0].data = nombreTeam.childNodes[0].data.trim();
        if(nombreTeam.childNodes[0].data.length >= 20) {
            nombreTeam.childNodes[0].data = nombreTeam.childNodes[0].data.substr(0, 17) + '...';
        }
    } );
}