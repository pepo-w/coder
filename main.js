const Contenedor = require('./Contenedor');

const fileName = './products.txt';
const item1 = { title: 'product 1', price: 99.99, thumbnail: '/url1' };
const item2 = { title: 'product 2', price: 10.5, thumbnail: '/url2' };

(async function () {
    const contenedor = new Contenedor(fileName);

    let all = await contenedor.getAll();
    console.assert(all.length === 0, 'array is empty after creation');

    const id1 = await contenedor.save(item1);
    console.assert(id1 === 1, 'first item has id = 1');

    const id2 = await contenedor.save(item2);
    console.assert(id2 === 2, 'second item has id = 2');

    all = await contenedor.getAll();
    console.assert(all.length === 2, 'array has two items');
    console.log('array with 2 items\n', all);

    let itemById = await contenedor.getById(id1);
    console.assert(itemById.title === item1.title);
    console.log('first item\n', itemById);

    itemById = await contenedor.getById(id2);
    console.assert(itemById.title === item2.title);
    console.log('last item\n', itemById);

    itemById = await contenedor.getById(5);
    console.assert(itemById === null, 'non-existent item is null');

    await contenedor.deleteById(8);
    all = await contenedor.getAll();
    console.assert(all.length === 2, 'delete non-existent item has no effect');

    await contenedor.deleteById(id1);
    all = await contenedor.getAll();
    itemById = await contenedor.getById(id1);
    console.assert(all.length === 1 && itemById === null, 'first item deleted');
    console.log('array after deleting first item\n', all);

    await contenedor.save(item1);
    const lastId = await contenedor.save(item1);
    all = await contenedor.getAll();
    console.assert(all.length === 3, 'array has 3 items');
    console.assert(lastId === 4, 'last item has id = 4');
    console.log('array with 3 items\n', all);

    await contenedor.deleteAll();
    all = await contenedor.getAll();
    console.assert(all.length === 0, 'deleted all items');
    console.log('array after deleting all items\n', all);
})();
