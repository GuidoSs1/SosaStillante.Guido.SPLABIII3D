import Anuncio_Mascota from "./anuncioMascota.js";
import { getAnunciosFetchAsync } from "./fetchAsync.js";
import { getLocalStorageData } from "./localStorage.js";

var localData;
let article;

const URL = "http://localhost:3000/anuncios";

const getDatosAjax = (callback) => {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4) {
            if (xhr.status >= 200 && xhr.status < 299) {
                const datos = JSON.parse(xhr.responseText);
                callback(datos);
            } else {
                const statusText = xhr.statusText || "Ocurrio un error";
                console.error(`Error: ${xhr.status} : ${statusText}`);
            }
        }
    };
    xhr.open("GET", URL);
    xhr.send();
};

window.addEventListener("load", loadPageHandler());

async function loadPageHandler() {
    try {           
         getDatosAjax((datos)=>{
            localData = datos;            
            console.log('cargando anuncios', localData);            
            localData.forEach(item => {
                createDivs(item);
            });
          });        
    } catch (err) {
        console.error(err);
    }

    article = document.querySelector("#articles");    
    article.classList.add("row");
    article.classList.add("row-cols-1");
    article.classList.add("row-cols-md-4");
    article.classList.add("g-4");
    article.style.margin = "0.5rem";

}

function createDivs(item) {
    const article = document.querySelector("#articles");
    const div = document.createElement("div");
    div.className = "article";

    const title = document.createElement("h2");
    const description = document.createElement("p");
    
    const price = document.createElement("p");
    price.id = "price";

    const raza = document.createElement("p");
    raza.style.display = "inline";

    const fecha_nacimiento = document.createElement("p");
    fecha_nacimiento.style.display = "inline";
    
    const vacuna = document.createElement("p");
    vacuna.style.display = "inline";    

    const razaIcon = document.createElement("img");
    razaIcon.src = "../imgs/dogpawprint_89239.png";
    razaIcon.style.margin = "5px";

    const fechaIcon = document.createElement("img");
    fechaIcon.src = "../imgs/baby_bottle_outline_icon_139937.png";
    fechaIcon.style.margin = "5px";

    const vacunaIcon = document.createElement("img");
    vacunaIcon.src = "../imgs/health_healthcare_medic_medical_medicine_syringe_vaccine_icon_127255.png";
    vacunaIcon.style.margin = "5px";

    const boton = document.createElement("button");
    boton.id = "btnCancelar";
    boton.className = "formButtons";        
    boton.innerHTML = "Ver Mascota";


    title.innerHTML = item.titulo;
    description.innerHTML = item.descripcion;
    price.innerHTML = "$" + item.precio;
    raza.innerHTML = item.raza;
    fecha_nacimiento.innerHTML = item.fecha_nacimiento;
    vacuna.innerHTML = item.vacuna;
    div.appendChild(title);
    div.appendChild(description);
    div.appendChild(price);
    div.appendChild(razaIcon);
    div.appendChild(raza);
    div.appendChild(fechaIcon);
    div.appendChild(fecha_nacimiento);
    div.appendChild(vacunaIcon);
    div.appendChild(vacuna);
    div.appendChild(boton);


    article.appendChild(div);
}
