const productsData = require("../data/products.json");
const { v4: uuidv4 } = require("uuid");

const { writeDataToFile } = require("../utils");

function findAllData() {
  return new Promise((resolve, reject) => {
    resolve(productsData);
  });
}

function findDataById(id) {
  return new Promise((resolve, reject) => {
    const product = productsData.find((prod) => prod.id === id);
    resolve(product);
  });
}

function createNewData(newProduct) {
  return new Promise((resolve, reject) => {
    const addData = { id: uuidv4(), ...newProduct };
    productsData.push(addData);
    writeDataToFile("./data/products.json", productsData);
    resolve(addData);
  });
}

function updateById(id, productValue) {
  return new Promise((resolve, reject) => {
    const index = productsData.findIndex((p) => p.id === id);
    productsData[index] = { id, ...productValue };

    writeDataToFile("./data/products.json", productsData);
    resolve(productsData[index]);
  });
}


function removeById(id) {
    return new Promise((resolve, reject) => {
        product = productsData.filter((p) => p.id !== id)
        writeDataToFile('./data/products.json', product);
        resolve()
    })
}

module.exports = {
  findAllData,
  findDataById,
  createNewData,
  updateById,
  removeById
};
