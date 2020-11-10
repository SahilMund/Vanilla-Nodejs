const http = require("http");
const products = require("./data/products.json");
const {
  getProducts,
  getSingleProduct,
  createProducts,
  updateProduct,
  deleteProductById
} = require("./controller/prodController");


const server = http.createServer((req, res) => {
  // get all products
  if (req.url === "/api/products" && req.method === "GET") {
    getProducts(req, res);
  }
  // get products by id
  else if (req.url.match(/\/api\/products\/\w+/) && req.method === "GET") {
    const id = req.url.split("/")[3];
    getSingleProduct(req, res, id);
  }
  // adding products
  else if (req.url === "/api/products" && req.method === "POST") {
    createProducts(req, res);
  } 
  
  // update products by id
  else if (req.url.match(/\/api\/products\/\w+/) && req.method === "PUT") {
    const id = req.url.split("/")[3];
   updateProduct(req, res, id);
  }
//   delete by id
else if(req.url.match(/\/api\/products\/delete\/\w+/) && req.method === 'DELETE') {
    const id = req.url.split('/')[4]
    deleteProductById(req, res, id)
}
  else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ Errror_message: "Route Not Found" }));
  }
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}...`));
