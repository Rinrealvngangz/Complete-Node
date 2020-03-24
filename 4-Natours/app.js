const fs = require('fs');
const express = require('express');
const app = express();
const morgan = require('morgan');
const port = 3000;
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
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

//2) Routes Handles
const getallTour = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: 'success',
    results: tours.length,
    requestAt: req.requestTime,
    data: {
      tours: tours
    }
  });
};
const getTour = (req, res) => {
  console.log(req.params);
  const id = req.params.id * 1;
  const tour = tours.find(el => el.id === id);
  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID'
    });
  }
  res.status(200).json({
    status: 'success',
    data: {
      tour
    }
  });
};
const createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTours = Object.assign({ id: newId }, req.body);

  tours.push(newTours);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    err => {
      res.status(201).json({
        status: 'success',
        data: {
          tours: newTours
        }
      });
    }
  );
};
const UpdateTour = (req, res) => {
  if (req.params.id > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID'
    });
  }
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour here...>'
    }
  });
};
const deleteTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID'
    });
  }
  res.status(204).json({
    status: 'success',
    data: {
      tour: null
    }
  });
};
// app.get('/api/v1/tours', getallTour);
// app.get('/api/v1/tours/:id',getTour );
// app.post('/api/v1/tours',createTour );
// app.patch('/api/v1/tours/:id',UpdateTour );
// app.delete('/api/v1/tours/:id',deleteTour);

//3) Routes
app
  .route('/api/v1/tours')
  .get(getallTour)
  .post(createTour);

app
  .route('/api/v1/tours/:id')
  .get(getTour)
  .patch(UpdateTour)
  .delete(deleteTour);

  //4) Start server
app.listen(port, () => {
  console.log(`App running on port ${port}....`);
});
