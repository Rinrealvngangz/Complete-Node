//4) Start server
const port = 3000;
const app = require('./app');
app.listen(port, () => {
  console.log(`App running on port ${port}....`);
});
