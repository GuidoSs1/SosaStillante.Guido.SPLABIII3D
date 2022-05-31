import Anuncio from "./anuncio.js";

export default class Anuncio_Mascota extends Anuncio {

    static getLocalStorage() {
        return "mascota";
    }

    constructor(id, titulo, descripcion, precio, animal, raza, fecha_nacimiento, vacuna) {
        super(id, titulo, descripcion, precio);
        this.animal = animal;
        this.raza = raza;
        this.fecha_nacimiento = fecha_nacimiento;
        this.vacuna = vacuna;
    };

}