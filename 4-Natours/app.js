const fs = require('fs');
const express = require('express');
const app = express();
const port = 3000;
app.use(express.json());

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);
const getallTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
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

app
  .route('/api/v1/tours')
  .get(getallTour)
  .post(createTour);
app
  .route('/api/v1/tours/:id')
  .get(getTour)
  .patch(UpdateTour)
  .delete(deleteTour);

app.listen(port, () => {
  console.log(`App running on port ${port}....`);
});
