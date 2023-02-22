const express = require('express');
const fileUpload = require('express-fileupload');

const app = express();
app.use(fileUpload());

const PORT = 3000;

// test server
app.get('/', (req, res) => {
  res.send('Testserver is running.');
});

// upload images
// FormData field = "file"
app.post('/upload', async function (req, res) {
  console.log(req.files); // the uploaded file object
  const blob = req.files['file'];
  // get file ending from blob type
  const fileEnding = '.' + blob.mimetype.split('/')[1];
  const newSubPath = '/static/' + blob.name + fileEnding;
  blob.mv(__dirname + newSubPath, function (err) {
    if (err) {
      console.log(err);
    }
    res.send({ url: `http://localhost:${PORT}${newSubPath}` });
  });
});

// serve images
app.use('/static', express.static(__dirname + '/static'));

// start server
app.listen(PORT, () =>
  console.log(`Example app is listening on port ${PORT}.`),
);
