
const express = require('express');
const app = express();
app.use(express.json());
const listRoutes = require('./routes/listRoutes');
app.use('/api/lists',listRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT,() => {
console.log("listening on port" + PORT);
});