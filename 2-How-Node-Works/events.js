const EventEmitter = require("events");
const http = require("http");
class sales extends EventEmitter {
  constructor() {
    super();
  }
}
const myEmitter = new sales();

myEmitter.on("newSale", () => {
  console.log("There was a new sale");
});

myEmitter.on("newSale", () => {
  console.log("Costumer name:rin");
});

myEmitter.on("newSale", stock => {
  console.log(`There are now ${stock} items left in stock.`);
});

myEmitter.emit("newSale", 9);

//////
const server = http.createServer();

server.on("request", (req, res) => {
  console.log("Request received");
  console.log(req.url);
  res.end("Request received");
});

server.on("request", (req, res) => {
  console.log("Another received");
});

server.on("close", (req, res) => {
  res.end("Server close");
});

server.listen(8000, "192.168.1.248", () => {
  console.log("Waitting for request....");
});
