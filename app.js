
const express = require('express');
const app = express();
app.use(express.json());
const listRoutes = require('./routes/listRoutes');
const todoRoutes = require('./routes/todoRoutes');
const authRoutes = require('./routes/authRoutes');
app.use('/api/lists', listRoutes);
app.use('/api/todos', todoRoutes);
app.use('/api/auth', authRoutes);
const PORT = process.env.PORT || 4000;

app.listen(PORT,() => {
console.log("listening on port" + PORT);
});