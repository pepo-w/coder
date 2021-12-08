const fs = require('fs');

class Contenedor {
    static nextId = 0;
    constructor(fileName) {
        this.fileName = `./${fileName}`;
    }

    // save obj on file and return new unique id
    async save(obj) {
        try {
            const newObject = { id: ++Contenedor.nextId, ...obj };
            const formattedNewObject = JSON.stringify(newObject, null, 2);
            await fs.promises.appendFile(this.fileName, formattedNewObject);
            return newObject.id;
        } catch (error) {
            console.error('cant write file: ', error);
            return null;
        }
    }

    getById(id) {
        // return object with id from file or null
    }

    getAll() {
        // return all objects from file
        // JSON.parse(myObjStr)
    }

    deleteById(id) {
        // delete object with id from file
    }

    deleteAll() {
        // delete all object from file
    }
}

const container = new Contenedor('testFile');
container
    .save({
        title: 'product1',
        price: 99.99,
        thumbnail: 'url',
    })
    .then((newId) => console.log('new id:', newId));
