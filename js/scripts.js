import Anuncio_Mascota from "./anuncioMascota.js";
import { createEntity, updateEntity, deleteEntity } from "./crud.js";
import { createTable, updateTable } from "./tablaDinamica.js";
import { agregarSpinner, eliminarSpinner } from "./spinner.js";
import { formData, updateForm, showButtons, hideButtons } from "./form.js";
import { getLocalStorageData } from "./localStorage.js";

let localData;
const $formulario = document.forms[0];

window.addEventListener("load", () => {
    localData = getLocalStorageData(Anuncio_Mascota.getLocalStorage());

    updateTable(localData);

    console.log("Data desde el load", localData);
});

window.addEventListener("click", (e) => {
    if (e.target.matches("td")) {
        showButtons();
        updateForm(e.target.parentElement, $formulario.elements);
    }
    if (e.target.matches("#btnCancelar")) {
        hideButtons();
    }
    if (e.target.matches("#btnEliminar")) {
        let id = $formulario.elements.formId.value;
        deleteEntity(id);
        agregarSpinner();

        localData = getLocalStorageData(Anuncio_Mascota.getLocalStorage());

        setTimeout(() => {
            updateTable(localData);
            hideButtons();
            eliminarSpinner();
        },
            3000);

        $formulario.reset();
    }
});

$formulario.addEventListener("submit", (e) => {

    e.preventDefault();

    const formAnuncio = formData($formulario.elements);

    formAnuncio.id === '' ? createEntity(formAnuncio) : updateEntity(formAnuncio);
    agregarSpinner();

    localData = getLocalStorageData(Anuncio_Mascota.getLocalStorage());

    setTimeout(() => {
        updateTable(localData);
        eliminarSpinner();
    }, 3000);

    hideButtons();
    $formulario.reset();

});

