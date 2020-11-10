const fs = require("fs");

// changing the content of products.json during adding new items
function writeDataToFile(filename, content) {
  fs.writeFileSync(filename, JSON.stringify(content), "utf8", (err) => {
    if (err) {
      console.log(err);
    }
  });
}

// creating a snippet for adding or changing datas in products.json
function getPostData(req) {
  return new Promise((resolve, reject) => {
    try {
      let body = "";

      req.on("data", (chunk) => {
        body += chunk.toString();
      });

      req.on("end", () => {
        resolve(body);
      });
    } catch (error) {
      reject(err);
    }
  });
}

module.exports = {
  writeDataToFile,
  getPostData,
};
