// VARIABLES
let tablaInfo = document.querySelector('.tabla-standings');

// Variables para controlar el dropdown menu.
let mqDropdown = window.matchMedia('(max-width: 1024px)');
let menu = document.querySelector('.menu li:nth-child(2)');
let submenu = document.querySelector('.menu .submenu');

// Flechas para el player history de la interfaz de standings.
let desplazar = 0;

// Botones de XBOX y PS4 para la interfaz de rankings.
let btnRanking = document.querySelector('.btn-ranking');

// Slide para la interfaz de rankings
let slide = document.querySelector('.slide');
let tabla = document.querySelectorAll('.tabla-rank');

// Main de rounds.
let cards = document.querySelectorAll('.border-card .card');


// EVENTS LISTENERS

cargarEventListeners();

function cargarEventListeners(){
    
    if(tablaInfo) {
        tablaInfo.addEventListener('click', mostrarPartidos);
        tablaInfo.addEventListener('click', siguiente);
        tablaInfo.addEventListener('click', anterior);
        window.addEventListener('load', acortarNombresTabla);
    }

    if(cards) {
        window.addEventListener('load', acortarNombresCards);
    }

    if(mqDropdown.matches){
        menu.addEventListener('mouseover', dropdownMenu);
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

// Función que cierra un historial al abrir otro.

if(tablaInfo) {
    function cerrarHistorial(){
        let filas = document.querySelectorAll('.tabla-standings tbody .player-info');
        filas.forEach( fila => {
            fila.classList.remove('mostrar');
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


// Función que permite mover las cards en el slider.
function siguiente(e) {
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
    e.preventDefault();
    if(e.target.classList.contains('fa-chevron-down')) {
        submenu.style.maxHeight = '1000px';
        submenu.style.overflow = 'visible';
        submenu.style.zIndex = '10';
        
        e.target.style.display = 'none';
        e.target.parentElement.parentElement.classList.add('dropdown');
        document.querySelector('.fa-chevron-up').style.display = 'grid';
        document.querySelector('.fa-chevron-up').style.width = '100%';
        document.querySelector('.fa-chevron-up').style.height = '100%';
        document.querySelector('.fa-chevron-up').style.alignItems = 'center';
    } else if(e.target.classList.contains('fa-chevron-up')) {
        submenu.style.maxHeight = '0';
        submenu.style.overflow = 'hidden';
        submenu.style.zIndex = '-1';
        
        e.target.style.display = 'none';
        e.target.parentElement.parentElement.classList.remove('dropdown');
        document.querySelector('.fa-chevron-down').style.display = 'grid';
        document.querySelector('.fa-chevron-down').style.width = '100%';
        document.querySelector('.fa-chevron-down').style.height = '100%';
        document.querySelector('.fa-chevron-down').style.alignItems = 'center';
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
        }
    } );

    nombresTeam.forEach( nombreTeam => {
        nombreTeam.childNodes[0].data = nombreTeam.childNodes[0].data.trim();
        if(nombreTeam.childNodes[0].data.length >= 15) {
            nombreTeam.childNodes[0].data = nombreTeam.childNodes[0].data.substr(0, 17) + '...';
        }
    } );
}