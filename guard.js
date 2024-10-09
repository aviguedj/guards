const port = 4720;


const express = require('express');
const app = express();
app.use(express.json());
const cors = require('cors');

app.use(cors());

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));










app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
