// saber donde se va ejecutar
document.addEventListener("DOMContentLoaded", function () {
    // llama esta funcion
    iniciarApp();
});
// para que se vea bien el codigo
function iniciarApp() {
    // llama otra funcion
    crearGaleria();
    scrollNav();
    navegacionFija();
}

function navegacionFija() {
    // selecionamos  la barra que queremos que se muestre
    const barra = document.querySelector('.header');
    // para solucionar como que se traba la barra
    const body = document.querySelector('body');
    // desde donde se mostrara la barra
    const sobreFestival = document.querySelector('.sobre-festival');
    // para saber si ya estoy en esa parte
    window.addEventListener('scroll', function () {
        // top es la posicion del elemento
        if (sobreFestival.getBoundingClientRect().top < 0) {
            barra.classList.add('fijo');
            body.classList.add('body-scroll');
        }else {
            barra.classList.remove('fijo');
            body.classList.remove('body-scroll');
        }
    })
}

function scrollNav() {
    const enlaces = document.querySelectorAll(".navegacion-principal");
    // literamos a cada uno de ellos
    enlaces.forEach( enlaces =>{
        // debes que hacer uno por uno el addEventListener
        // por que tienes un querySelectorAll
        enlaces.addEventListener('click', function (e) {
            // este lo que hace es prevenir que se ejecute el comportamiento por defecto
            // necesario para que funcione el scroll
            e.preventDefault();
            // usar el id del a
            // el primero es el target se puede decir que todo
            // attributes es para todo lo que puedes hacer
            // seleccionamos href
            // ultimo leemos el valor de href
            const seccionScroll = e.target.attributes.href.value
            const seccion = document.querySelector(seccionScroll);
            // para hacer la animacion de scroll
            // {behavior: 'smooth'} necesitamos esto para que funcione
            seccion.scrollIntoView( {behavior: 'smooth'});
        });
    });
}

function crearGaleria() {
    // selecionar la clase del html
    const galeria = document.querySelector(".galeria-imagenes");
    // for para mostrar todas las fotos
    for (let i = 1; i <= 12; i++) {
        // crea un elemento en este caso una etiqueta picture
        const imagen = document.createElement("picture");
        // ${} para usar variables
        // insentar en el html
        // codigo html en ``
        imagen.innerHTML = `
                <source srcset="build/img/thumb/${i}.avif" type="image/avif">
                <source srcset="build/img/thumb/${i}.webp" type="image/webp">
                <img loading="lazy" width="200" height="300" src="build/img/thumb/${i}.jpg"
                    alt="imagen galería">
        `;
        // para saber que imagen de anda haciendo click
        imagen.onclick = function () {
            mostrarImagen(i);
        }
        // se usa galería es donde se usara imagen
        galeria.appendChild(imagen);
    }
}

function mostrarImagen(id) {
    // crea etiqueta html
    const imagen = document.createElement("picture");
        // ${} para usar variables
        // código html
        imagen.innerHTML = `
                <source srcset="build/img/grande/${id}.avif" type="image/avif">
                <source srcset="build/img/grande/${id}.webp" type="image/webp">
                <img loading="lazy" width="200" height="300" src="build/img/grande/${id}.jpg"
                    alt="imagen galería">
        `;
        // crear overlay con la imagen
        // crean un div se usara en el body
        const overlay =  document.createElement('DIV');
        overlay.appendChild(imagen);
        overlay.classList.add('overlay');
        overlay.onclick = function () {
            const body = document.querySelector('body');
            body.classList.remove('fijar-body');
            overlay.remove();
        }
        // boton para cerrar el modal (es una vetana asi se llama)
        const cerrarModal = document.createElement('P');
        cerrarModal.textContent = 'X';
        cerrarModal.classList.add('btn-cerrar');
        // en este parte lo que hace es tener un evento y
        // una funcion lo que se hara es remover el overlay con remove()
        cerrarModal.onclick = function (){
            // como esta en una funcion las no son globales las
            // variables
            // lo que hace es lo mismo pero ahora remueve la clase
            const body = document.querySelector('body');
            body.classList.remove('fijar-body');
            overlay.remove();
        }
        overlay.appendChild(cerrarModal);
        // anadir al html
        const body = document.querySelector('body');
        body.appendChild(overlay);
        body.classList.add('fijar-body');
}