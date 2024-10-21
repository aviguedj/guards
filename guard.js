const port = 4720;


const express = require('express');
const app = express();
app.use(express.json());
const cors = require('cors');

app.use(cors());

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));

let guardPoints = [];


app.post('/add-point', (req, res) => {
    const { pointName, location } = req.body;
    const newPoint = { id: guardPoints.length + 1, pointName, location };
    guardPoints.push(newPoint);
    res.json({ point: newPoint });
});

app.get('/get-points', (req, res) => {
    res.json({ points: guardPoints });
});

app.post('/mark-arrival', (req, res) => {
    const { pointId, arrivalTime } = req.body;


    const point = guardPoints.find(p => p.id === pointId);
    if (point) {
        point.arrivalTime = arrivalTime;
        res.json({ success: true });
    } else {
        res.status(404).json({ error: "Point not found" });
    }
});





app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
