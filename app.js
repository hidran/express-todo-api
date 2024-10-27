
const express = require('express');
const app = express();
app.use(express.json());
app.get('/', function (req, resp) {
    resp.send('<h1>Hello world3</h1>')
});
app.get('/lists', function (req, resp) {
    resp.json({id:1,name:'my list'});
});
const PORT = process.env.PORT || 4000;

app.listen(PORT,() => {
console.log("listening on port" + PORT);
});