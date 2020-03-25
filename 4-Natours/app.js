const express = require('express');
const app = express();
const morgan = require('morgan');
const port = 3000;
const toursRouter = require('./routes/toursRoutes');
const usersRouter = require('./routes/usersRoutes');
app.use(express.json());
app.use(morgan('dev'));
//1) Midleware
app.use((req, res, next) => {
  console.log('Hello from the middleware');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});
app.use('/api/v1/tours', toursRouter);
app.use('/api/v1/users', usersRouter);
//4) Start server
app.listen(port, () => {
  console.log(`App running on port ${port}....`);
});
