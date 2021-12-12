const fs = require('fs');

class Contenedor {
    constructor(fileName) {
        this.fileName = fileName;
    }

    async save(obj) {
        const all = await this.getAll();
        const newId = all.length === 0 ? 1 : all[all.length - 1].id + 1;
        all.push({ ...obj, id: newId });
        try {
            await fs.promises.writeFile(
                this.fileName,
                JSON.stringify(all, null, 2)
            );
            return newId;
        } catch (error) {
            console.error('Error saving new item', error);
            return null;
        }
    }

    async getById(id) {
        const all = await this.getAll();
        return all.find((p) => p.id === id) || null;
    }

    async getAll() {
        try {
            const all = await fs.promises.readFile(this.fileName, 'utf8');
            return JSON.parse(all);
        } catch (error) {
            return [];
        }
    }

    async deleteById(id) {
        const all = await this.getAll();
        const index = all.findIndex((p) => p.id === id);
        if (index > -1) {
            all.splice(index, 1);
            try {
                await fs.promises.writeFile(
                    this.fileName,
                    JSON.stringify(all, null, 2)
                );
            } catch (error) {
                console.error('Error deleting item', error);
            }
        }
    }

    async deleteAll() {
        try {
            await fs.promises.writeFile(
                this.fileName,
                JSON.stringify([], null, 2)
            );
        } catch (error) {
            console.error('Error deleting all items', error);
        }
    }
}

module.exports = Contenedor;
