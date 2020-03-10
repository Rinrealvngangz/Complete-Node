const fs = require("fs");

const server = require("http").createServer();

server.on("request", (req, res) => {
  //Solution 1
  //   fs.readFile("test.txt", (err, data) => {
  //     if (err) console.log(err);
  //     res.end(data);
  //   });
  //Solution 2:stream
  const readable = fs.createReadStream("test.txt");

  readable.on("data", chuck => {
    res.write(chuck);
  });
  readable.on("end", () => {
    res.end();
    console.log("end");
  });
  readable.on("error", err => {
    console.log(err);
    res.statusCode = 500;
    res.end("File not found");
  });
  //Solution 3
  //const readable = fs.createReadStream("test.txt");
  //readable.pipe(res);
  //readablesource =pipe(WriteableDest)
});

server.listen(7000, "192.168.1.248", () => {
  console.log("listening....");
});
