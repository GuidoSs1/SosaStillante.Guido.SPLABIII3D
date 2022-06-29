import Anuncio_Mascota from "./anuncioMascota.js";
import { createEntity, updateEntity, deleteEntity } from "./crud.js";
import { createTable, updateTable } from "./tablaDinamica.js";
import { agregarSpinner, eliminarSpinner } from "./spinner.js";
import { formData, updateForm, showButtons, hideButtons } from "./form.js";
import { getLocalStorageData } from "./localStorage.js";
import { getAnunciosFetchAsync, deleteAnunciosFetchAsync } from "./fetchAsync.js";
import { postAnuncioFetch, updateAnunciosFetch } from "./fetchPromises.js";

let localData;
const sAnimal = document.getElementById('sAnimal');
const cxBoxs = document.querySelectorAll('.cBox');
const txtFiltro = document.getElementById('txtFiltro');
const $formulario = document.forms[0];

window.addEventListener("load", loadPageHandler());

async function loadPageHandler() {
    try {
        agregarSpinner();
        localData = await getAnunciosFetchAsync();    
    }
    catch (err) {
        console.error(err);
    }
    finally {
        eliminarSpinner();
    }

    document.addEventListener("click", handlerClick);

    if (localData.length > 0) {
        updateTable(localData);
    }

    $formulario.addEventListener("submit", handlerSubmit);

    switch(sAnimal.value){
        case 'Todos':
            try {
                agregarSpinner();
                filtroTodos(await getAnunciosFetchAsync());
            } catch (err) {
                console.log(err);
            }
            finally {
                eliminarSpinner();
            }
            break;
        case 'Perro':
            try {
                agregarSpinner();
                filtroPerro(await getAnunciosFetchAsync());
            } catch (err) {
                console.log(err);
            }
            finally {
                eliminarSpinner();
            }
            break;
        case 'Gato':
            try {
                agregarSpinner();
                filtroGato(await getAnunciosFetchAsync());
            } catch (err) {
                console.log(err);
            }
            finally {
                eliminarSpinner();
            }
            break;
    }

    cxBoxs.forEach(el => { mapearTabla(el, localData); });

}

//Manejo el evento click dentro de TODA la pagina
async function handlerClick(e) {
    if (e.target.matches("td")) {
        showButtons();
        updateForm(e.target.parentElement, $formulario.elements);
    }
    if (e.target.matches("#btnCancelar")) {
        hideButtons();
    }
    if (e.target.matches("#btnEliminar")) {
        let id = $formulario.elements.formId.value;
        try {
            agregarSpinner();
            await deleteAnunciosFetchAsync(id);
            localData = await getAnunciosFetchAsync();
            updateTable(localData);
        } catch (err) {
            console.error(err);
        }
        finally {
            hideButtons();
            eliminarSpinner();
            $formulario.reset();
        }
    }
};

async function handlerSubmit(e) {

    e.preventDefault();

    try {
        const formAnuncio = formData($formulario.elements);
        formAnuncio.id === '' ? await postAnuncioFetch(formAnuncio) : await updateAnunciosFetch(formAnuncio);
        agregarSpinner();
        localData = await getAnunciosFetchAsync();
        updateTable(localData);
    } catch (err) {
        console.log(err);
    }
    finally {
        hideButtons();
        eliminarSpinner();
        $formulario.reset();
    }
}


function filtroTodos(listAux) {  
    txtFiltro.value = "N/A";
    cxBoxs.forEach( el  =>  { mapearTabla( el, listAux ); });
    updateTable(listAux);    
}
  
function filtroPerro(listAux) {
    cxBoxs.forEach(el => { el.checked = true; });
    const anunciosPerro = listAux.filter(an => an.animal === 'Perro');
    const precios = anunciosPerro.map(an => parseInt(an.precio));
    const totalPrecios = precios.reduce((acc, an) => acc + an, 0);

    const resultado = Math.round(totalPrecios / precios.length);

    txtFiltro.value = resultado;

    cxBoxs.forEach(el => { mapearTabla(el, anunciosPerro); });
    updateTable(anunciosPerro);
}
  
function filtroGato(listAux) {
    cxBoxs.forEach(el => { el.checked = true; });
    const anunciosGatos = listAux.filter( an => an.animal === 'Gato' );
    const precios = anunciosGatos.map( an => parseInt( an.precio ));
    const totalPrecios = precios.reduce( ( acum, val ) => acum + val, 0);
    const resultado = Math.round (totalPrecios / precios.length);
  
    txtFiltro.value = resultado;
  
    cxBoxs.forEach( el  =>  { mapearTabla( el, anunciosGatos ); });
    
    updateTable(anunciosGatos);
  
}
  
async function mapearTabla(cbox, anunciosAux) {
    
    cbox.addEventListener( 'click', async() => { 
        
        let listAux = anunciosAux.map( anuncio => {
            let auxObj = {};  
            for (const key in anuncio) {
                if (document.querySelector('.form-check-input').checked){
                  auxObj[key] = anuncio[key];
                }
            }
            
            return auxObj;
        })
        updateTable(listAux);
    });
};

