// VARIABLES
let tablaInfo = document.querySelector('.tabla-standings');
let mqDropdown = window.matchMedia('(max-width: 1024px)');
let menu = document.querySelector('.menu li:nth-child(2)');
let submenu = document.querySelector('.menu .submenu');

// EVENTS LISTENERS

cargarEventListeners();

function cargarEventListeners(){
    if(tablaInfo) {
        tablaInfo.addEventListener('click', mostrarPartidos);
        tablaInfo.addEventListener('click', siguiente);
        tablaInfo.addEventListener('click', anterior);
    }
    if(mqDropdown.matches){
        menu.addEventListener('mouseover', dropdownMenu)
    }
}




/* FUNCIONES. */

// Función que muestra el historial del player.
function mostrarPartidos(e){
	if(e.target.classList.contains('oculto')){
        let btnInfo = e.target.parentElement;
        let playerInfo = e.target.parentElement.parentElement.parentElement;
        let playerHistory = e.target.parentElement.parentElement.parentElement.childNodes[17];
        let siguiente = e.target.parentElement.parentElement.parentElement.childNodes[17].childNodes[15];

		e.target.style.transform = 'rotate(-225deg)';
        btnInfo.classList.add('open');
        e.target.classList.add('mostrando');
        playerInfo.classList.add('mostrar');
        e.target.classList.remove('oculto');
        setTimeout(function(){
            playerHistory.classList.add('mostrar');
            siguiente.style.display = 'grid';
        }, 300);
    } else if (e.target.classList.contains('mostrando')){
        let btnInfo = e.target.parentElement;
        let playerInfo = e.target.parentElement.parentElement.parentElement;
        let playerHistory = e.target.parentElement.parentElement.parentElement.childNodes[17];
        let siguiente = e.target.parentElement.parentElement.parentElement.childNodes[17].childNodes[15];
        
		e.target.style.transform = 'rotate(0)';
        e.target.classList.add('oculto');
        btnInfo.classList.remove('open');
        e.target.classList.remove('mostrar');
        playerHistory.classList.remove('mostrar');
        setTimeout(function(){
            siguiente.style.display = 'none';
            playerInfo.classList.remove('mostrar');
        }, 300);
    }
}


// Función que permite mover las cards en el slider.

function siguiente(e){
    if(e.target.classList.contains('fa-chevron-right')){
        let contenedorSlide = e.target.parentElement.parentElement;

        contenedorSlide.scrollLeft += 340;
        e.target.parentElement.nextSibling.nextSibling.style.display = 'grid';
    }   
}

function anterior(e){
    if(e.target.classList.contains('fa-chevron-left')){
        let contenedorSlide = e.target.parentElement.parentElement;
        contenedorSlide.scrollLeft = contenedorSlide.scrollLeft - 340;
        if(contenedorSlide.scrollLeft <= 0) {
            e.target.parentElement.style.display = 'none';
        }
    }   
}

function dropdownMenu(e) {
    if(e.target.classList.contains('fa-chevron-down')) {
        submenu.style.maxHeight = '1000px';
        submenu.style.overflow = 'visible';
        e.target.style.display = 'none';
        document.querySelector('.fa-chevron-up').style.display = 'block';
    } else if(e.target.classList.contains('fa-chevron-up')) {
        submenu.style.maxHeight = '0';
        submenu.style.overflow = 'hidden';
        e.target.style.display = 'none';
        document.querySelector('.fa-chevron-down').style.display = 'block';
    }
}