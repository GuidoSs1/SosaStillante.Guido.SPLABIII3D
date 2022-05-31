import Anuncio_Mascota from "./anuncioMascota.js";
import { getLocalStorageData, setLocalStorageData } from "./localStorage.js";

export function createEntity(newEntity) {
    console.log("createEntity", newEntity);
    let auxArray = getLocalStorageData(Anuncio_Mascota.getLocalStorage());
    console.log("aurarray", auxArray);
    auxArray !== null ? newEntity.id = (auxArray.length + 1) : newEntity.id = 0;
    auxArray.push(newEntity);
    setLocalStorageData(Anuncio_Mascota.getLocalStorage(), auxArray);
}

export function updateEntity(editedEntity) {
    console.log("edited", editedEntity);
    let actualData = getLocalStorageData(Anuncio_Mascota.getLocalStorage());
    let index = actualData.findIndex(x => x.id == editedEntity.id);
    actualData[index] = editedEntity;
    setLocalStorageData(Anuncio_Mascota.getLocalStorage(), actualData);
}

export function deleteEntity(id) {
    let actualData = getLocalStorageData(Anuncio_Mascota.getLocalStorage());
    let index = actualData.findIndex(x => x.id == id);
    actualData.splice(index, 1);
    setLocalStorageData(Anuncio_Mascota.getLocalStorage(), actualData);
}
