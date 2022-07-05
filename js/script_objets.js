///////// Objets /////////
class productos {
    /**
     * Clase de los productos
     * @param {*} _name Nombre del producto
     * @param {*} _price Precio del producto
     * @param {*} _description Descripción del producto
     * @param {*} _id ID del producto
     */
    constructor(_name, _price, _description, _id) {
        this._name = _name;
        this._price = parseInt(_price);
        this._description = _description;
        this._id = _id;
    }
    /**
     * Mostrar producto
     * @returns Devuelve la info completa del producto
     */
    show_product() {
        return (this._name + "\n$" + this._price + "\nDescripción: " + this._description);
    }
}