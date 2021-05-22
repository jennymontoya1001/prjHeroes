
const items = document.getElementById('items');
const templateCard = document.getElementById('template-card').content;
const fragment = document.createDocumentFragment();
let like = { }; // objeto vacío

/*https://getbootstrap.com/docs/5.0/getting-started/introduction/
https://jsonplaceholder.typicode.com/
https://bluuweb.github.io/javascript/02-dom/#practica-template
 */


document.addEventListener('DOMContentLoaded', () => {
    fetchData();
})

//consumimos nuestra data
const fetchData = async () => {
    try {
        const res = await fetch('./data/heroes.json');
        const data = await res.json();
        //console.log(data);
        pintarCard(data);
    } catch (error) {
        console.log(error);
    }
}

//Dentro del forEach los elementos que necesitamos repetir n cntidad de veces
const pintarCard = data => {
    data.forEach(heroe => {
       const {id,superhero,publisher,image} = heroe; //destructuración
        templateCard.querySelector('h5').textContent  = superhero;
        templateCard.querySelector('p').textContent  = publisher;
        templateCard.querySelector('img').setAttribute('src',image);
        templateCard.querySelector('.btn-dark').dataset.id = id;
        const clone = templateCard.cloneNode(true);
        fragment.appendChild(clone); // permite clonar un nodo
    })
    // appendChild agrega un nodo al final de la lista
   items.appendChild(fragment);
}

items.addEventListener('click', e =>{
     addLike(e);
})

//adicionar y asignar like al target

const addLike = e => {

      if(e.target.classList.contains('btn-dark')){
        setLike(e.target.parentElement);
     }
    // e.stopPropagation();
}

const setLike = objeto =>{
  const boton = {
       id: objeto.querySelector('.btn-dark').dataset.id,
       cantidad: 1
  }

  //asignación de cantidad de like al label
     if(like.hasOwnProperty(boton.id)){
        boton.cantidad = like[boton.id].cantidad + 1;
        objeto.querySelector('#like').textContent = boton.cantidad;
     }

     //...spread operator
    like[boton.id] = {...boton};
    

 // console.log(boton.cantidad);
}



