const ProductModel = require("../models/ProdModel");
const { getPostData } = require("../utils");

// get all products --api/products(GET)
async function getProducts(req, res) {
  try {
    const products = await ProductModel.findAllData();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.write(JSON.stringify(products));
    res.end();
  } catch (error) {
    console.log(error);
  }
}

// get product by id  --api/products/:id (GET)
async function getSingleProduct(req, res, id) {
  try {
    const product = await ProductModel.findDataById(id);

    if (!product) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Product Not Found" }));
    } else {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(product));
    }
  } catch (error) {
    console.log(error);
  }
}

// adding products --api/products/ (POST)
async function createProducts(req, res) {
  try {
    const body = await getPostData(req);
    const { title, description, price } = JSON.parse(body);

    const product = {
      title,
      description,
      price,
    };

    const newProduct = await ProductModel.createNewData(product);
    res.writeHead(201, { "Content-Type": "application/json" });
    return res.end(JSON.stringify(newProduct));
  } catch (error) {
    console.log(error);
  }
}

// updating products by id --api/products/:id (PUT)
async function updateProduct(req, res, id) {
  try {
    const product = await ProductModel.findDataById(id);

    if (!product) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Product Not Found" }));
    } else {
      const body = await getPostData(req);
      const { title, description, price } = JSON.parse(body);

      const productValue = {
        title: title || product.title,
        description: description || product.description,
        price: price || product.price
      };

      const updProduct = await ProductModel.updateById(id,productValue);
      res.writeHead(200, { "Content-Type": "application/json" });
      return res.end(JSON.stringify(updProduct));
    }
  } catch (error) {
    console.log(error);
  }
}

// delete product by id -- /api/product/delete/:id (DELETE)
async function deleteProductById(req, res, id) {
    try {
        const product = await ProductModel.findDataById(id)

        if(!product) {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: 'Product Not Found' }))
        } else {
            await ProductModel.removeById(id)
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: `Product having ${id} is removed` }))
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
  getProducts,
  getSingleProduct,
  createProducts,
  updateProduct,
  deleteProductById
};
