let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let port = process.env.PORT || 3000;
let methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
let router = express.Router();

console.log('——————————- Run on port ' + port);

app.use(express.static(__dirname + '/dist')); // Static (public) folder

app.use(bodyParser.urlencoded({ extended: true }));// get information from html forms
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride());
app.use('/api', router);

//routes are basically controllers
let cc_route = require('./routes/cc');
let bank_route = require('./routes/bank');
let expense_route = require('./routes/expense');
let goal_route = require('./routes/goal');

app.use(expense_route, bank_route, cc_route, goal_route);


app.get('/*', function (req, res) {
    res.sendFile(__dirname + '/dist/index.html')
    });

 // app.use('/parent', router); call all from localhost:port/parent/*

//catch all routes and send to index.html




app.listen(port);
