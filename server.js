const express = require('express');
const path = require('path');

const app = express();

app.use((req, res, next) => {
  res.show = (name) => {
    res.sendFile(path.join(__dirname, `/views/${name}`));
  };
  next();
});

app.use(express.static(path.join(__dirname, '/public')));

// app.use('/user', (req, res, next) => {
//   res.show('user.html');
//   next();
// });

app.get('/user', (req, res) => {
  res.show('user.html');
});

app.get('/', (req, res) => {
  res.show('index.html');
});

app.get('/home', (req, res) => {
  res.show('index.html');
});

app.get('/about', (req, res) => {
  res.show('about.html');
});

// app.get('/user/settings', (req, res) => {
//   res.show('user.html');
// });

// app.get('/user/panel', (req, res) => {
//   res.show('user.html');
// });

// app.get('/history', (req, res) => {
//   res.show('history.html');
// });

app.use((req, res) => {
  res.status(404).show('error.html');
})

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});