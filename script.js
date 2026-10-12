
const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 3000;

const server = http.createServer((req, res) => {
  // Send product data to the website
  if (req.url === "/api/products" && req.method === "GET") {
    fs.readFile(path.join(__dirname, "db.json"), "utf8", (err, data) => {
      if (err) {
        res.writeHead(500, {
          "Content-Type": "application/json"
        });
        res.end(JSON.stringify({ error: "Could not load products" }));
        return;
      }

      res.writeHead(200, {
        "Content-Type": "application/json"
      });
      res.end(data);
    });
    return;
  }

  // Serve the website
  if (req.url === "/" && req.method === "GET") {
    fs.readFile(path.join(__dirname, "index.html"), (err, data) => {
      if (err) {
        res.writeHead(500, {
          "Content-Type": "text/plain"
        });
        res.end("Could not load index.html");
        return;
      }

      res.writeHead(200, {
        "Content-Type": "text/html"
      });
      res.end(data);
    });
    return;
  }

  res.writeHead(404, {
    "Content-Type": "text/plain"
  });
  res.end("Page not found");
});

server.listen(PORT, () => {
  console.log("Product Store is running!");
  console.log("Open http://localhost:3000");
});
