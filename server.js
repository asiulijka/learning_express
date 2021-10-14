const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');
const multer  = require('multer');
const upload = multer({ dest: 'uploads/' })

const app = express();
app.engine('.hbs', hbs());
app.set('view engine', '.hbs');

app.use(express.static(path.join(__dirname, '/public')));

// aby umożliwić obsługę formularzy x-www-form-urlencoded na Postman
app.use(express.urlencoded({ extended: false }));

// aby odbierać dane w formacie JSON
// app.use(express.json());

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

app.get('/info', (req, res) => {
  res.render('info');
});

app.get('/history', (req, res) => {
  res.render('history');
});

app.get('/hello/:name', (req, res) => {
  res.render('hello', { name: req.params.name });
});

app.post('/contact/send-message', upload.single('file'), (req, res, next) => {

  const { author, sender, title, message } = req.body;

  console.log(req.file, req.body);
  console.log('AAAAAAAAAAAAAA');


  // // image verification
  // if (file.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
  //   {file: true};
  // }




  if(author && sender && title && message && req.file) {
    res.render('contact', { isSent: true, filename: req.file['originalname'] });
  }
  else {
    res.render('contact', { isError: true });
  }
});

app.use((req, res) => {
  res.status(404).send('404 not found...');
})

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});