const express = require('express');
const fileUpload = require('express-fileupload');

const app = express();
app.use(fileUpload());

app.get('/', (req, res) => {
    res.send('Testserver is running.');
});

app.post('/upload', function (req, res) {
    console.log(req.files); // the uploaded file object
    res.send('File uploaded!');
});

app.listen(3000, () => console.log('Example app is listening on port 3000.'));