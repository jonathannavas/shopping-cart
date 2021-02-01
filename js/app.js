const carrito = document.querySelector('#carrito');
const listaCursos = document.querySelector('#lista-cursos');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const btnVaciarCarrito = document.querySelector('#vaciar-carrito');
let articulosCarrito = [];

cargarEventListeners();

function cargarEventListeners(){
    
    //Agregar curso al carrito
    listaCursos.addEventListener('click',agregarCurso);

    //eliminar cursos del carrito
    carrito.addEventListener('click', eliminarCurso);

    //muestra los cursos del storage
    document.addEventListener('DOMContentLoaded',()=>{
        articulosCarrito = JSON.parse(localStorage.getItem('carrito'))||[];
        carritoHTML();
    });

    //vaciar el carrito
    btnVaciarCarrito.addEventListener('click',()=>{
        articulosCarrito = [];
        limpiarHTML();
    });

}

//funciones

function agregarCurso(e){
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')){
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }
}

function eliminarCurso(e){

    if(e.target.classList.contains('borrar-curso')){

        const cursoId = e.target.getAttribute('data-id');
        // elimina del arreglo de articulosCarrito por el data-id
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);

        carritoHTML();
    }
}

//leer el contenido html de donde se dio click y se extrae la info del curso
function leerDatosCurso(curso){

    //crear un objeto con el contenido del curso actual
    const infoCurso = {

       id: curso.querySelector('a').getAttribute('data-id'),
       imagen: curso.querySelector('img').src,
       titulo: curso.querySelector('h4').textContent,
       precio: curso.querySelector('.precio span').textContent,
       cantidad: 1

    }

    //revisa si un elemento ya existe en el carrito

    const existe = articulosCarrito.some(curso=> curso.id === infoCurso.id);
    
    if(existe){
        const cursos = articulosCarrito.map(curso => {
            if(curso.id === infoCurso.id){
                curso.cantidad ++;
                return curso;
            }else{
                return curso;
            }
        });
        articulosCarrito = [...cursos];
    }else{
        articulosCarrito = [...articulosCarrito, infoCurso];
    }

    //agrega elementos al arreglo de carrito
   
    carritoHTML();
}


//muestra el carrito de compras en el html
function carritoHTML(){
    //limpiar el html
    limpiarHTML();
    //recorre el carrito y genera el html
    articulosCarrito.forEach( curso => {

        const {imagen, titulo, precio, cantidad, id} = curso;

        const row = document.createElement('tr');

        row.innerHTML = `
            <td>
                <img src="${imagen}" style="width:60px" />
            </td>
            <td>
                ${titulo}
            </td>
            <td>
                ${precio}
            </td>
            <td>
                ${cantidad}
            </td>
            <td>
                <a href="#" class="borrar-curso" data-id="${id}">X</a>
            </td>
        `;

        //agrega el html del carrito en el tdody

        contenedorCarrito.appendChild(row);
    });

    //agregar el carrito de compras al storage
    sincronizarStorage();
}

function sincronizarStorage(){
    localStorage.setItem('carrito',JSON.stringify(articulosCarrito));  
}
// elimina los cursos del tbdody
function limpiarHTML(){
    //forma lenta
    // contenedorCarrito.innerHTML = '';
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}