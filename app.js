
const express = require('express');
const app = express();
app.use(express.json());
app.get('/', function (req, resp) {
    resp.send('<h1>Hello world3</h1>')
});
app.get('/lists', function (req, resp) {
    resp.json({id:1,name:'my list'});
});
const pool = require('./config/db');
app.get('/test-db', async (req,res) =>{
  try{
    const [rows] =  await pool.query('SELECT 1 +1 AS RESULT');
      res.json({ message: 'Database connected successfully!', result: rows[0].RESULT });
  }
  catch(error){
    console.error(error);
      res.status(500).json({ message: 'Database connection failed', error: error.message });
  }
});
const PORT = process.env.PORT || 4000;

app.listen(PORT,() => {
console.log("listening on port" + PORT);
});